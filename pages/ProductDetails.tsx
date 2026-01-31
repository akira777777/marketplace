import React, { useState } from 'react';
import { Product, Page } from '../types';
import { Rating } from '../components/Rating';
import { ReviewComponent } from '../components/Review';
import { ReviewForm } from '../components/ReviewForm';
import { Image } from '../components/Image';

interface ProductDetailsProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onAddToCart, onBack }) => {
  return (
    <main className="max-w-[1440px] mx-auto px-6 lg:px-20 py-8 animate-fade-in">
      <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/40 mb-8">
        <button onClick={onBack} className="hover:text-primary">Marketplace</button>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <button className="hover:text-primary">{product.game}</button>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-white/60">{product.type}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Images */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative bg-card-dark rounded-2xl border border-border-dark p-12 aspect-square flex items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent"></div>
            <Image 
              alt={product.name} 
              className="relative z-10 w-full max-h-[80%] object-contain drop-shadow-[0_20px_50px_rgba(13,166,242,0.2)] group-hover:scale-110 transition-transform duration-700" 
              src={product.image} 
            />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-20">
              <button className="size-12 rounded-full bg-border-dark/80 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <span className="material-symbols-outlined">3d_rotation</span>
              </button>
              <button className="size-12 rounded-full bg-border-dark/80 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <span className="material-symbols-outlined">zoom_in</span>
              </button>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-2">
            {[1, 2, 3, 4].map((i) => (
              <button key={i} className={`min-w-[120px] aspect-square bg-card-dark rounded-xl border ${i === 1 ? 'border-2 border-primary' : 'border-border-dark hover:border-primary/50'} p-4 flex items-center justify-center transition-all`}>
                <Image className={`w-full h-full object-contain ${i !== 1 && 'opacity-60'}`} src={product.image} alt="Thumbnail" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-primary/20 text-primary text-xs font-black px-3 py-1 rounded uppercase tracking-widest border border-primary/30">{product.rarity}</span>
              <span className="text-white/40 text-sm font-medium uppercase tracking-widest">{product.game} • {product.type}</span>
            </div>
            <h1 className="text-white text-5xl font-black tracking-tight leading-tight">{product.name}</h1>
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-black text-primary">${product.price.toFixed(2)}</span>
              {product.originalPrice && <span className="text-white/30 text-lg line-through">${product.originalPrice.toFixed(2)}</span>}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button 
                onClick={() => onAddToCart(product)}
                className="w-full h-14 bg-primary hover:brightness-110 text-white font-bold text-lg rounded-xl shadow-[0_0_25px_rgba(13,166,242,0.4)] transition-all flex items-center justify-center gap-3"
            >
              <span className="material-symbols-outlined">payments</span> Buy Now
            </button>
            <button 
                onClick={() => onAddToCart(product)}
                className="w-full h-14 bg-card-dark border border-border-dark hover:bg-border-dark text-white font-bold text-lg rounded-xl transition-all flex items-center justify-center gap-3"
            >
              <span className="material-symbols-outlined">shopping_cart</span> Add to Cart
            </button>
          </div>

          <div className="bg-card-dark rounded-2xl border border-border-dark p-6 space-y-6">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">analytics</span> Item Specs
            </h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div className="space-y-1">
                <p className="text-white/40 text-[10px] uppercase font-bold tracking-tighter">Float Value</p>
                <p className="text-white font-bold">{product.float || 'N/A'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-white/40 text-[10px] uppercase font-bold tracking-tighter">Pattern Template</p>
                <p className="text-white font-bold">{product.pattern || 'N/A'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-white/40 text-[10px] uppercase font-bold tracking-tighter">Finish Catalog</p>
                <p className="text-white font-bold">344</p>
              </div>
              <div className="space-y-1">
                <p className="text-white/40 text-[10px] uppercase font-bold tracking-tighter">Wear Range</p>
                <p className="text-white font-bold">Factory New</p>
              </div>
            </div>
            
            <div className="space-y-2 pt-2">
               <div className="flex justify-between text-[10px] uppercase font-bold text-white/40">
                 <span>FN</span><span>MW</span><span>FT</span><span>WW</span><span>BS</span>
               </div>
               <div className="h-2 w-full bg-border-dark rounded-full overflow-hidden relative">
                 <div className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 w-full opacity-50"></div>
                 <div className="absolute top-0 left-[2%] w-1 h-full bg-white shadow-[0_0_8px_white]"></div>
               </div>
            </div>
          </div>

          <div className="bg-card-dark rounded-2xl border border-border-dark p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="size-14 rounded-xl border border-primary/30 overflow-hidden">
                  <img alt="Seller Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJPqMN-AedWqx3VkDoqMLnVWxACEo_S5I2z_MFD72FCgK_srOlqmsQ1S_u2SfKBhr_0uhdBxzTa1-2QX67XG-PY23b-LlRHjB2WLqvGZ0Hg2yk_odv63GVtv-4JjWqiQtPxmiT-_gDiQTJy0fTscco_Tlf74y2WoSD7qi8NmKESn3TwCnuIiuzwnwPj9zVXnzi-LHFXykbVPwIRvYfFnvR5DpBOx53aZq_iUIi1k0a9Y7WjkhK72W16L7A_xNoUKV4PzQt_p9TLas" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-white font-bold">EliteTrader_99</h4>
                    <span className="material-symbols-outlined text-primary text-lg material-symbols-filled">verified</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[1,2,3,4,5].map(s => <span key={s} className="material-symbols-outlined text-sm material-symbols-filled">star</span>)}
                    <span className="text-white/60 text-[10px] font-bold ml-1">(1,248)</span>
                  </div>
                </div>
              </div>
              <button className="bg-border-dark hover:bg-white hover:text-background-dark px-4 py-2 rounded-lg text-sm font-bold transition-all">
                View Profile
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-dark/50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">schedule</span>
                <span className="text-xs text-white/60 font-medium">Avg. delivery: 5 min</span>
              </div>
               <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">handshake</span>
                <span className="text-xs text-white/60 font-medium">10k+ Trades</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-20 border-t border-border-dark pt-12">
        <div className="flex gap-12 border-b border-border-dark mb-8">
            <button className="pb-4 text-primary font-bold border-b-2 border-primary text-lg">Description</button>
            <button className="pb-4 text-white/50 hover:text-white font-bold transition-colors text-lg">Price History</button>
            <button className="pb-4 text-white/50 hover:text-white font-bold transition-colors text-lg flex items-center gap-2">
              Reviews 
              <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                {product.totalReviews || 0}
              </span>
            </button>
        </div>
        <div className="max-w-3xl space-y-6">
            <p className="text-white/70 leading-relaxed">
                {product.description || `The ${product.name} is a highly sought after item in ${product.game}.`}
            </p>
             <ul className="space-y-3">
               <li className="flex items-center gap-3 text-white/60">
                 <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                 <span>Full ownership transfer upon purchase</span>
               </li>
               <li className="flex items-center gap-3 text-white/60">
                 <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                 <span>Trade-locked: None (Instant Delivery)</span>
               </li>
               <li className="flex items-center gap-3 text-white/60">
                 <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                 <span>Market security guarantee included</span>
               </li>
             </ul>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="mt-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-white text-2xl font-bold mb-2">Customer Reviews</h2>
            <div className="flex items-center gap-4">
              <Rating rating={product.averageRating || 0} totalReviews={product.totalReviews} size="lg" />
            </div>
          </div>
          <button 
            onClick={() => {}}
            className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
          >
            Write a Review
          </button>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map(review => (
              <ReviewComponent key={review.id} review={review} />
            ))
          ) : (
            <div className="text-center py-12 bg-[#182b34] rounded-2xl border border-[#315668]">
              <span className="material-symbols-outlined text-6xl text-white/30 mb-4">chat</span>
              <h3 className="text-white text-xl font-bold mb-2">No reviews yet</h3>
              <p className="text-white/60">Be the first to review this item!</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};