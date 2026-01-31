import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

export const Generator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Since window.aistudio might not be typed in standard TS, we access it via window
  const aistudio = (window as any).aistudio;

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setError(null);

    try {
      // API Key Selection Logic for Veo/Imagen 3 Pro
      if (aistudio && aistudio.hasSelectedApiKey) {
        const hasKey = await aistudio.hasSelectedApiKey();
        if (!hasKey) {
            if (aistudio.openSelectKey) {
                await aistudio.openSelectKey();
                // Assume success after dialog, but wrap in try/catch if needed or check again
            } else {
                throw new Error("API Key selection not available.");
            }
        }
      }

      // Initialize AI client with injected key
      // We must create a new instance to ensure it picks up the key if it was just selected
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const model = 'gemini-3-pro-image-preview';
      
      const response = await ai.models.generateContent({
        model: model,
        contents: {
            parts: [{ text: prompt }]
        },
        config: {
          imageConfig: {
            imageSize: size,
            aspectRatio: "1:1"
          }
        },
      });

      // Parse response to find image
      if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
          const parts = response.candidates[0].content.parts;
          const imagePart = parts.find((part: any) => part.inlineData);
          if (imagePart && imagePart.inlineData) {
             const base64String = imagePart.inlineData.data;
             const mimeType = imagePart.inlineData.mimeType || 'image/png';
             setGeneratedImage(`data:${mimeType};base64,${base64String}`);
          } else {
             throw new Error("No image generated.");
          }
      }

    } catch (e: any) {
      console.error(e);
      // Reset key selection if entity not found
      if (e.message && e.message.includes("Requested entity was not found")) {
          if (aistudio && aistudio.openSelectKey) {
              await aistudio.openSelectKey();
          }
      }
      setError(e.message || "Failed to generate image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 grid-bg animate-fade-in bg-bg-green-dark p-6 lg:p-12 items-center justify-center">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Controls */}
        <div className="space-y-8">
            <div>
               <div className="flex items-center gap-3 mb-2">
                 <div className="size-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined">auto_awesome</span>
                 </div>
                 <h1 className="text-3xl font-bold text-white tracking-tight">Nano Banana Forge</h1>
               </div>
               <p className="text-secondary/60">Generate unique, one-of-a-kind gaming assets using the power of Gemini 3.</p>
            </div>

            <div className="bg-[#183418]/80 backdrop-blur-sm border border-secondary/20 rounded-2xl p-6 shadow-xl space-y-6">
               <div className="space-y-2">
                  <label className="text-secondary/80 text-xs font-bold uppercase tracking-widest">Asset Description</label>
                  <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your item... e.g., A glowing neon cyber-katana with dragon scales" 
                    className="w-full h-32 bg-bg-green-dark border border-secondary/20 rounded-xl p-4 text-white placeholder:text-secondary/20 focus:ring-1 focus:ring-secondary focus:border-secondary outline-none resize-none"
                  />
               </div>

               <div className="space-y-2">
                  <label className="text-secondary/80 text-xs font-bold uppercase tracking-widest">Resolution Quality</label>
                  <div className="grid grid-cols-3 gap-3">
                     {['1K', '2K', '4K'].map((s) => (
                       <button 
                         key={s}
                         onClick={() => setSize(s as any)}
                         className={`py-3 rounded-lg border text-sm font-bold transition-all ${size === s ? 'bg-secondary text-bg-green-dark border-secondary' : 'bg-transparent text-secondary border-secondary/30 hover:bg-secondary/10'}`}
                       >
                         {s}
                       </button>
                     ))}
                  </div>
               </div>

               {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg text-sm">
                    {error}
                  </div>
               )}

               <button 
                 onClick={handleGenerate}
                 disabled={loading || !prompt}
                 className="w-full py-4 bg-secondary text-bg-green-dark font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(13,242,13,0.3)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
               >
                 {loading ? (
                   <>
                     <span className="size-5 border-2 border-bg-green-dark border-t-transparent rounded-full animate-spin"></span>
                     Forging Asset...
                   </>
                 ) : (
                   <>
                     <span className="material-symbols-outlined">token</span>
                     Generate Asset
                   </>
                 )}
               </button>
               
               <div className="text-center">
                 <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-[10px] text-secondary/40 underline hover:text-secondary">
                    Pricing & Billing Information
                 </a>
               </div>
            </div>
        </div>

        {/* Preview */}
        <div className="relative aspect-square bg-surface-green rounded-2xl border-2 border-secondary/10 flex items-center justify-center overflow-hidden">
           <div className="absolute inset-0 grid-bg opacity-30"></div>
           
           {generatedImage ? (
             <img src={generatedImage} alt="Generated Asset" className="relative z-10 w-full h-full object-contain animate-fade-in" />
           ) : (
             <div className="text-center text-secondary/20 relative z-10">
                <span className="material-symbols-outlined text-6xl mb-4">image</span>
                <p className="font-bold text-lg">Asset Preview</p>
                <p className="text-sm">Generated items will appear here</p>
             </div>
           )}

           {generatedImage && (
              <div className="absolute bottom-6 flex gap-4 z-20">
                 <button className="px-6 py-3 bg-secondary text-bg-green-dark font-bold rounded-lg shadow-lg hover:brightness-110 transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined">add_circle</span> Mint to Inventory
                 </button>
                 <button className="px-6 py-3 bg-black/50 text-white font-bold rounded-lg backdrop-blur hover:bg-black/70 transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined">download</span> Download
                 </button>
              </div>
           )}
        </div>

      </div>
    </div>
  );
};