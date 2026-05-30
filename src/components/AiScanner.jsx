import { useState, useRef } from "react";
import { GoogleGenAI } from "@google/genai";

export default function AiScanner({ onClose }) {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Hardcoded key as requested
  const apiKey = "AIzaSyBFnUpSqHLymTVgScM5CcS8K_95eQG37cg";

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
    const scanCount = parseInt(sessionStorage.getItem("ai_scan_count") || "0", 10);
    if (scanCount >= 2) {
      alert("You have reached the maximum limit of 2 scans per visit.");
      return;
    }

    if (!image) {
      alert("Please upload an image first.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      sessionStorage.setItem("ai_scan_count", (scanCount + 1).toString());
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
          <div className="flex gap-2 mb-2">
            <button 
              onClick={() => fileInputRef.current.click()}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white text-sm py-2 rounded-lg transition-colors border border-white/10"
            >
              Upload Photo
            </button>
            <button 
              onClick={() => cameraInputRef.current.click()}
              className="flex-1 bg-[#4edea3]/20 hover:bg-[#4edea3]/30 text-[#4edea3] text-sm py-2 rounded-lg transition-colors border border-[#4edea3]/30"
            >
              Use Camera
            </button>
          </div>
          <div>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
              ref={fileInputRef}
              className="hidden"
            />
            <input 
              type="file" 
              accept="image/*" 
              capture="environment"
              onChange={handleImageChange}
              ref={cameraInputRef}
              className="hidden"
            />
            <div 
              className="w-full h-48 border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center overflow-hidden relative"
            >
              {image ? (
                <img src={image} alt="Upload preview" className="w-full h-full object-contain" />
              ) : (
                <div className="text-center text-gray-500 flex flex-col items-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <span>No image selected</span>
                </div>
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
