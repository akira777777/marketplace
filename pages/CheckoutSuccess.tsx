import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Page } from '../types';

interface CheckoutSuccessProps {
  onNavigate: (page: Page) => void;
}

export const CheckoutSuccess: React.FC<CheckoutSuccessProps> = ({ onNavigate }) => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden bg-bg-green-dark" style={{ background: 'radial-gradient(circle at center, rgba(13, 242, 13, 0.1) 0%, rgba(16, 34, 16, 0) 70%)'}}>
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
         {/* Simple SVG background simulation */}
         <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
             <circle cx="20%" cy="30%" r="2" fill="#0df20d" />
             <circle cx="80%" cy="20%" r="3" fill="#0df20d" />
             <circle cx="50%" cy="80%" r="2" fill="#0df20d" />
         </svg>
      </div>

      <div className="flex flex-col max-w-[800px] w-full z-10 animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <div className="size-24 bg-secondary/20 rounded-full flex items-center justify-center mb-6 ring-4 ring-secondary/10 shadow-[0_0_15px_rgba(13,242,13,0.4)]">
             <span className="material-symbols-outlined text-secondary text-6xl">emoji_events</span>
          </div>
          <div className="text-center p-4">
             <h1 className="text-secondary tracking-widest text-4xl md:text-5xl font-bold leading-tight mb-2 uppercase italic">TRANSACTION SUCCESSFUL!</h1>
             <p className="text-white/80 text-lg font-medium">Your account has been updated and your item is ready.</p>
          </div>
        </div>

        <div className="p-4 w-full">
           <div className="flex flex-col md:flex-row items-stretch justify-between gap-6 rounded-xl bg-[#183418]/80 backdrop-blur-sm p-6 border border-secondary/20 shadow-2xl">
              <div className="flex flex-[2_2_0px] flex-col justify-between gap-4">
                 <div className="flex flex-col gap-2">
                    <span className="text-secondary text-xs font-bold tracking-widest uppercase">New Inventory Added</span>
                    <h3 className="text-white text-3xl font-bold leading-tight">Shadowfire Obsidian Blade</h3>
                    <div className="flex items-center gap-2 mt-1">
                       <span className="bg-secondary text-bg-green-dark text-[10px] font-bold px-2 py-0.5 rounded uppercase">Legendary</span>
                       <p className="text-[#90cb90] text-sm font-mono leading-normal">ID: #GVM-99283-XQ</p>
                    </div>
                 </div>
                 <div className="flex flex-col gap-4">
                    <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                       This item has been securely transferred to your global inventory. You can equip it immediately in-game or trade it on the marketplace.
                    </p>
                    <button className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#224922] hover:bg-[#2c5c2c] text-white gap-2 text-sm font-semibold transition-all w-fit">
                       <span className="material-symbols-outlined text-sm">info</span>
                       <span>View Metadata</span>
                    </button>
                 </div>
              </div>
              <div 
                 className="w-full md:w-1/3 bg-center bg-no-repeat aspect-square bg-cover rounded-lg border-2 border-secondary/40 shadow-inner" 
                 style={{backgroundImage: 'linear-gradient(45deg, rgba(0,0,0,0.6), transparent), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDSOkXbAiq0IHplNgb9wC2QAeYR7khhaCBwMDlCpjuZcirBp25EPXafshet31n9mUjjXtuhQTqAha4_-ablhCsJPqCNzeWW3iP4gKsem9zIpnWLCWqesvGKO-_02-NIHlRP-b9Sd1lbeZ3VufE55AHo1JvWgQOFQZr1gD_GShkcCKNnkJXIjI43NRKd3Gzg57AxEri0GT-wPdMJD4NtAL32sI5ZDuBDvx_0gwL5l7My40sxXN38e7-hMGKgQ6Ozexe-ZlbR1OZPuhQ")'}}
              ></div>
           </div>
        </div>

        <div className="flex justify-center mt-8">
           <div className="flex flex-col sm:flex-row gap-4 px-4 py-3 w-full max-w-[600px] justify-center">
              <button onClick={() => onNavigate(Page.INVENTORY)} className="flex-1 flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-6 bg-secondary text-[#102310] text-lg font-bold tracking-tight shadow-[0_0_15px_rgba(13,242,13,0.4)] hover:scale-105 active:scale-95 transition-all">
                 <span className="material-symbols-outlined mr-2">inventory_2</span>
                 <span className="truncate">View in Inventory</span>
              </button>
              <button onClick={() => onNavigate(Page.HOME)} className="flex-1 flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-6 bg-transparent border-2 border-[#224922] text-white hover:bg-[#224922]/30 text-lg font-bold tracking-tight transition-all">
                 <span className="material-symbols-outlined mr-2">storefront</span>
                 <span className="truncate">Return to Marketplace</span>
              </button>
           </div>
        </div>
        
        <p className="text-center text-[#90cb90]/50 text-xs mt-12 mb-4">
            Need help? <a href="#" className="text-[#90cb90] underline hover:text-secondary">Contact Support</a> or check the <a href="#" className="text-[#90cb90] underline hover:text-secondary">FAQ</a>
        </p>
      </div>
    </main>
  );
};