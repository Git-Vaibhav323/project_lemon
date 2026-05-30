import { useState, useRef } from "react";
import { GoogleGenAI } from "@google/genai";

export default function AiScanner({ onClose }) {
  const [apiKey, setApiKey] = useState("");
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = async () => {
    if (!apiKey) {
      alert("Please enter a Gemini API Key (hidden for security).");
      return;
    }
    if (!image) {
      alert("Please upload an image first.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const ai = new GoogleGenAI({ apiKey });
      const base64Image = image.split(",")[1];
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              { text: "Identify this plant and provide a short description and care instructions." },
              {
                inlineData: {
                  data: base64Image,
                  mimeType: "image/jpeg" // works for most common images uploaded
                }
              }
            ]
          }
        ]
      });

      setResult(response.text);
    } catch (err) {
      console.error(err);
      setResult("Error identifying plant: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="bg-[#14221e] border border-[#4edea3]/30 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>
        
        <h2 className="text-2xl font-semibold text-[#4edea3] mb-4">AI Plant Scanner</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Gemini API Key</label>
            <input 
              type="password" 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter API Key"
              className="w-full bg-[#081612] border border-gray-600 rounded px-3 py-2 text-white focus:border-[#4edea3] focus:outline-none"
            />
            <p className="text-[10px] text-gray-500 mt-1">Stored locally in this session.</p>
          </div>

          <div>
            <label className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Plant Image</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              ref={fileInputRef}
              className="hidden"
            />
            <div 
              onClick={() => fileInputRef.current.click()}
              className="w-full h-40 border-2 border-dashed border-gray-600 hover:border-[#4edea3] rounded-xl flex items-center justify-center cursor-pointer overflow-hidden relative"
            >
              {image ? (
                <img src={image} alt="Upload preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400">Click to upload photo</span>
              )}
            </div>
          </div>

          <button 
            onClick={handleScan}
            disabled={loading}
            className="w-full bg-[#4edea3] text-[#003824] font-bold py-3 rounded-xl disabled:opacity-50"
          >
            {loading ? "Scanning..." : "Identify Plant"}
          </button>

          {result && (
            <div className="mt-4 p-4 bg-[#081612] border border-gray-700 rounded-xl text-sm text-gray-300 max-h-48 overflow-y-auto">
              <div dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, '<br />') }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
