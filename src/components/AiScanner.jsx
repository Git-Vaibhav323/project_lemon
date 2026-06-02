import { useState, useRef, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";

export default function AiScanner({ onClose }) {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Hardcoded key as requested
  const apiKey = import.meta.env.VITE_AI_API_KEY || "AIzaSyBFnUpSqHLymTVgScM5CcS8K_95eQG37cg";

  useEffect(() => {
    startCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        stopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      setImage(null);
      setResult("");
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (err) {
      console.error("Camera error:", err);
      alert("Unable to access camera. Please allow permissions or try uploading a photo.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg");
      setImage(dataUrl);
      stopCamera();
    }
  };

  const handleClose = () => {
    stopCamera();
    onClose();
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
      <div className="bg-white border border-brand-moss/30 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-brand-dark"
        >
          ✕
        </button>
        
        <h2 className="text-2xl font-semibold text-brand-moss mb-4">AI Plant Scanner</h2>
        
        <div className="space-y-4">
          <div className="flex gap-2 mb-2">
            <button 
              onClick={() => fileInputRef.current.click()}
              className="flex-1 bg-brand-sand/70 hover:bg-white/20 text-brand-dark text-sm py-2 rounded-lg transition-colors border border-brand-bark/12"
            >
              Upload Photo
            </button>
            <button 
              onClick={startCamera}
              className="flex-1 bg-brand-moss/20 hover:bg-brand-moss/30 text-brand-moss text-sm py-2 rounded-lg transition-colors border border-brand-moss/30"
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
            <div 
              className="w-full h-48 border-2 border-dashed border-gray-600 rounded-xl flex flex-col items-center justify-center overflow-hidden relative bg-black/50"
            >
              {isCameraActive ? (
                <>
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover"
                  />
                  <button 
                    onClick={capturePhoto}
                    className="absolute bottom-4 bg-white text-black px-4 py-2 rounded-full font-bold text-sm shadow-lg hover:scale-105 transition-transform"
                  >
                    Take Photo
                  </button>
                </>
              ) : image ? (
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
            className="w-full bg-brand-moss text-white font-bold py-3 rounded-xl disabled:opacity-50"
          >
            {loading ? "Scanning..." : "Identify Plant"}
          </button>

          {result && (
            <div className="mt-4 p-4 bg-brand-sand border border-brand-bark/20 rounded-xl text-sm text-brand-dark/70 max-h-48 overflow-y-auto">
              <div dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, '<br />') }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
