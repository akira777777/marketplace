import React from 'react';
import { POPULAR_GAMES, PRODUCTS } from '../data';
import { Page, Product } from '../types';

interface HomeProps {
  onNavigate: (page: Page) => void;
  onSelectProduct: (product: Product) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onSelectProduct }) => {
  return (
    <main className="max-w-[1440px] mx-auto px-6 lg:px-20 py-8 space-y-12 animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-xl bg-[#182b34]">
        <div 
          className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-start justify-center px-10 relative z-10" 
          style={{ backgroundImage: 'linear-gradient(90deg, rgba(16, 29, 35, 0.9) 0%, rgba(16, 29, 35, 0.4) 50%, rgba(16, 29, 35, 0) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuARnC6TGma6Y07OKwTwMV-3XUqIW-AX-3u5XiIDqa_LHooQcMa-J2gWT4KSt9r7JAZEIoC0V6YbZhkWyjFmQMx8X6GI9Hw1bfBJldtjLIGEjpd4Na-GQYs-EMMKyy4efT8ta9u6ViePH4Wy0Q6-zpjpyW0uFAGPu9Wl-pIAAHc6rSGU0AjXU8ScyccoxaqJufmXqytDilJuka5iDcxATmdcnb73nI-jQ02Z3QoYXkrdS-veGYtUnMvWmKkOKyUSEHEYWJnrlcNU_cM")' }}
        >
          <div className="flex flex-col gap-4 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-primary/30 w-fit">
              <span className="material-symbols-outlined text-sm">bolt</span> New Arrival
            </div>
            <h1 className="text-white text-5xl md:text-6xl font-black leading-[1.1] tracking-tight">
              Legendary Skins & <br/><span className="text-primary">Cyber Assets</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-md">
              The ultimate marketplace for elite gamers. Buy, sell, and trade verified digital assets with instant delivery and secure payments.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <button 
                onClick={() => onNavigate(Page.CATALOG)}
                className="flex items-center justify-center rounded-lg h-12 px-8 bg-primary text-white font-bold hover:brightness-110 shadow-[0_0_20px_rgba(13,166,242,0.4)] transition-all"
              >
                Shop Now
              </button>
              <button 
                onClick={() => onNavigate(Page.CATALOG)}
                className="flex items-center justify-center rounded-lg h-12 px-8 bg-[#223c49] text-white font-bold hover:bg-[#2d4e5f] border border-white/10 transition-all">
                View All Items
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none"></div>
      </section>

      {/* Popular Games Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-2xl font-bold tracking-tight">Popular Universes</h2>
          <a href="#" className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline">
            See All Games <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {POPULAR_GAMES.map((game, idx) => (
            <div key={idx} className="group flex flex-col items-center gap-3 rounded-xl border border-[#315668] bg-[#182b34] p-5 cursor-pointer hover:border-primary/50 transition-all hover:translate-y-[-4px]">
              <div className="size-16 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all shadow-lg">
                <img className="w-full h-full object-cover" src={game.image} alt={game.name} />
              </div>
              <h3 className="text-white text-sm font-bold text-center">{game.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Items Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-white text-2xl font-bold tracking-tight">Trending Assets</h2>
            <span className="bg-red-500/10 text-red-500 text-[10px] font-black px-2 py-0.5 rounded border border-red-500/20 uppercase tracking-tighter">Live</span>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg bg-[#223c49] text-white/50 hover:text-white hover:bg-primary transition-all">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="p-2 rounded-lg bg-[#223c49] text-white/50 hover:text-white hover:bg-primary transition-all">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        
        <div className="flex overflow-x-auto gap-5 pb-6 custom-scrollbar">
          {PRODUCTS.map((product) => (
            <div 
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="min-w-[280px] bg-[#182b34] border border-[#315668] rounded-xl overflow-hidden hover:border-primary transition-all group cursor-pointer"
            >
              <div className="relative h-48 bg-black/40 p-4 flex items-center justify-center">
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`bg-opacity-20 text-opacity-100 ${product.rarityColor.replace('text-', 'bg-')} ${product.rarityColor} text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider`}>
                    {product.rarity}
                  </span>
                </div>
                <img 
                  className={`max-h-full max-w-full drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-500`}
                  src={product.image} 
                  alt={product.name} 
                />
              </div>
              <div className="p-5">
                <p className="text-white/50 text-xs font-medium uppercase tracking-widest mb-1">{product.game} • {product.type}</p>
                <h4 className="text-white text-lg font-bold truncate mb-3">{product.name}</h4>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-white/40 text-[10px] uppercase font-bold tracking-tighter">Current Price</span>
                    <span className="text-primary text-xl font-black">${product.price.toFixed(2)}</span>
                  </div>
                  <button className="bg-primary/10 hover:bg-primary text-primary hover:text-white size-10 rounded-lg transition-all flex items-center justify-center">
                    <span className="material-symbols-outlined">shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Bar */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-[#223c49]">
        {[
          { icon: 'verified_user', title: 'Verified Sellers', desc: 'Every trader is manually vetted' },
          { icon: 'electric_bolt', title: 'Instant Delivery', desc: 'Automated systems for fast delivery' },
          { icon: 'support_agent', title: '24/7 Support', desc: 'Human support whenever you need' },
        ].map((feature, idx) => (
          <div key={idx} className="flex items-center gap-4 p-6 rounded-xl bg-[#182b34]/40 border border-[#223c49]/50">
            <div className="size-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
            </div>
            <div>
              <h5 className="text-white font-bold">{feature.title}</h5>
              <p className="text-white/50 text-sm">{feature.desc}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};