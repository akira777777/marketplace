import React from 'react';
import { useCart } from '../context/CartContext';
import { Page } from '../types';

interface CartProps {
  onNavigate: (page: Page) => void;
}

export const Cart: React.FC<CartProps> = ({ onNavigate }) => {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  return (
    <main className="max-w-[1440px] mx-auto px-6 lg:px-20 py-10 animate-fade-in">
      <nav className="flex items-center gap-2 text-white/50 text-sm mb-8">
        <button onClick={() => onNavigate(Page.HOME)} className="hover:text-primary transition-colors">Marketplace</button>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-white">Shopping Cart</span>
      </nav>
      
      <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <span className="material-symbols-outlined text-3xl text-primary">shopping_cart</span>
        Your Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-4">
          {items.length === 0 ? (
            <div className="text-white/50 text-center py-20 bg-card-dark rounded-xl border border-border-dark">
                Your cart is empty.
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="bg-card-dark border border-border-dark rounded-xl p-5 flex items-center gap-6 group hover:border-primary/40 transition-all">
                <div className="size-24 rounded-lg bg-black/40 flex-shrink-0 flex items-center justify-center p-2 relative">
                  <img className="max-h-full max-w-full drop-shadow-[0_0_10px_rgba(13,166,242,0.3)]" src={item.image} alt={item.name} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className={`${item.rarityColor} text-[10px] font-bold uppercase tracking-widest mb-1`}>{item.game} • {item.rarity}</p>
                      <h3 className="text-white text-lg font-bold">{item.name}</h3>
                      <p className="text-white/40 text-xs mt-1">Float: 0.0012 | Factory New</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-xl font-bold">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3 bg-black/30 rounded-lg p-1 border border-border-dark">
                      <button onClick={() => updateQuantity(item.id, -1)} className="size-7 flex items-center justify-center hover:bg-border-dark rounded text-white transition-colors">
                        <span className="material-symbols-outlined text-sm">remove</span>
                      </button>
                      <span className="text-white font-bold text-sm w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="size-7 flex items-center justify-center hover:bg-border-dark rounded text-white transition-colors">
                         <span className="material-symbols-outlined text-sm">add</span>
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500/60 hover:text-red-500 flex items-center gap-1 text-sm font-medium transition-colors">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          <div className="pt-4">
            <button onClick={() => onNavigate(Page.HOME)} className="text-primary hover:text-white flex items-center gap-2 text-sm font-bold transition-all group">
              <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
              Continue Shopping
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-card-dark border border-border-dark rounded-xl p-6 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-white/70">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Platform Fee</span>
                <span>$12.50</span>
              </div>
              <div className="flex justify-between text-green-400">
                <span>Discount</span>
                <span>-$0.00</span>
              </div>
              <div className="border-t border-border-dark pt-4 flex justify-between items-end">
                <span className="text-white font-medium">Total</span>
                <span className="text-3xl font-black text-primary">${(total + 12.50).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mb-6">
               <label className="block text-white/50 text-xs font-bold uppercase tracking-widest mb-2">Promo Code</label>
               <div className="flex gap-2">
                 <input className="flex-1 bg-black/30 border border-border-dark rounded-lg text-white text-sm focus:ring-primary focus:border-primary px-4 py-2 placeholder:text-white/20" placeholder="Enter code" type="text" />
                 <button className="bg-border-dark hover:bg-[#2d4e5f] text-white px-4 py-2 rounded-lg text-sm font-bold transition-all border border-transparent">
                    Apply
                 </button>
               </div>
            </div>

            <button 
              onClick={() => onNavigate(Page.CHECKOUT_SUCCESS)}
              disabled={items.length === 0}
              className="w-full bg-primary hover:brightness-110 text-white font-black py-4 rounded-lg transition-all flex items-center justify-center gap-3 mb-6 shadow-[0_0_15px_rgba(13,166,242,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
               PROCEED TO CHECKOUT
               <span className="material-symbols-outlined">payments</span>
            </button>

            <div className="space-y-4">
              <p className="text-center text-white/40 text-[10px] font-bold uppercase tracking-widest">Secure Payments Via</p>
              <div className="flex items-center justify-center gap-6 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                 <div className="flex flex-col items-center gap-1">
                   <span className="material-symbols-outlined text-3xl">credit_card</span>
                   <span className="text-[8px] font-bold uppercase">Card</span>
                 </div>
                 <div className="flex flex-col items-center gap-1">
                   <span className="material-symbols-outlined text-3xl">currency_bitcoin</span>
                   <span className="text-[8px] font-bold uppercase">Crypto</span>
                 </div>
                 <div className="flex flex-col items-center gap-1">
                   <span className="material-symbols-outlined text-3xl">account_balance</span>
                   <span className="text-[8px] font-bold uppercase">PayPal</span>
                 </div>
              </div>
            </div>
          </div>
          
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-4">
             <div className="text-primary mt-1">
               <span className="material-symbols-outlined">verified_user</span>
             </div>
             <div>
               <h4 className="text-white text-sm font-bold">Buyer Protection</h4>
               <p className="text-white/50 text-xs leading-relaxed">Your funds are held in escrow until you confirm delivery of your digital assets.</p>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
};