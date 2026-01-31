import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  sources?: { uri: string; title: string }[];
}

export const MarketIntel: React.FC = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am your Market Intelligence Assistant. Ask me about current gaming trends, item prices, or recent eSports events to help inform your trading decisions.' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: query,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });

      const text = response.text || "I couldn't find any information on that.";
      
      // Extract grounding metadata
      let sources: { uri: string; title: string }[] = [];
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      
      if (groundingChunks) {
        sources = groundingChunks
          .map((chunk: any) => chunk.web)
          .filter((web: any) => web)
          .map((web: any) => ({ uri: web.uri, title: web.title }));
      }

      setMessages(prev => [...prev, { role: 'model', text, sources }]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error fetching market data." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-8 animate-fade-in flex flex-col h-[calc(100vh-80px)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">travel_explore</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Market Intelligence</h1>
          <p className="text-white/50 text-sm">Powered by Google Search Grounding</p>
        </div>
      </div>

      <div className="flex-1 bg-card-dark border border-border-dark rounded-xl overflow-hidden flex flex-col">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
               <div className={`size-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-white/10' : 'bg-primary/20 text-primary'}`}>
                  <span className="material-symbols-outlined text-sm">{msg.role === 'user' ? 'person' : 'smart_toy'}</span>
               </div>
               <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-[#223c49] text-white/90'}`}>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-white/10">
                      <p className="text-[10px] uppercase font-bold tracking-widest opacity-60 mb-2">Sources</p>
                      <div className="flex flex-wrap gap-2">
                        {msg.sources.map((source, i) => (
                          <a key={i} href={source.uri} target="_blank" rel="noreferrer" className="flex items-center gap-1 bg-black/20 hover:bg-black/40 px-2 py-1 rounded text-xs transition-colors truncate max-w-[200px]">
                            <span className="material-symbols-outlined text-[10px]">link</span>
                            <span className="truncate">{source.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
               </div>
            </div>
          ))}
          {loading && (
             <div className="flex gap-4">
               <div className="size-8 rounded-full flex-shrink-0 bg-primary/20 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm">smart_toy</span>
               </div>
               <div className="bg-[#223c49] rounded-2xl p-4 flex items-center gap-2">
                  <span className="size-2 bg-white/50 rounded-full animate-bounce"></span>
                  <span className="size-2 bg-white/50 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="size-2 bg-white/50 rounded-full animate-bounce [animation-delay:0.4s]"></span>
               </div>
             </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[#101c22] border-t border-border-dark">
           <div className="relative">
             <input 
               type="text" 
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
               placeholder="Ask about skin prices, game updates, or market trends..." 
               className="w-full bg-[#182b34] border border-border-dark rounded-xl py-4 pl-4 pr-14 text-white placeholder:text-white/20 focus:ring-1 focus:ring-primary focus:border-primary outline-none"
             />
             <button 
               onClick={handleSearch}
               disabled={!query.trim() || loading}
               className="absolute right-2 top-1/2 -translate-y-1/2 size-10 bg-primary text-white rounded-lg flex items-center justify-center hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
             >
               <span className="material-symbols-outlined">send</span>
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};