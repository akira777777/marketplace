import React from 'react';

interface FooterProps {
  theme?: 'blue' | 'green';
}

export const Footer: React.FC<FooterProps> = ({ theme = 'blue' }) => {
  const isGreen = theme === 'green';
  const primaryClass = isGreen ? 'text-secondary hover:text-secondary' : 'text-primary hover:text-primary';
  const bgClass = isGreen ? 'bg-[#102210] border-[#224922]' : 'bg-[#0a1216] border-[#223c49]';
  const textHoverClass = isGreen ? 'hover:text-secondary' : 'hover:text-primary';

  return (
    <footer className={`mt-auto ${bgClass} border-t py-12 px-6 lg:px-20`}>
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        <div className="max-w-xs">
          <div className={`flex items-center gap-3 ${isGreen ? 'text-secondary' : 'text-primary'} mb-4`}>
            <div className="size-6">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                {isGreen ? (
                   <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path>
                ) : (
                  <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
                )}
                {isGreen && <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>}
              </svg>
            </div>
            <h2 class="text-white text-lg font-bold tracking-tight">{isGreen ? 'GameVault' : 'GameMarket'}</h2>
          </div>
          <p class="text-white/40 text-sm leading-relaxed">
            The world's most trusted gaming marketplace. Level up your gaming experience with premium assets.
          </p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-16">
          <div class="flex flex-col gap-3">
            <h6 class="text-white font-bold text-sm">Marketplace</h6>
            <a href="#" className={`text-white/50 text-xs ${textHoverClass} transition-colors`}>All Games</a>
            <a href="#" className={`text-white/50 text-xs ${textHoverClass} transition-colors`}>Accounts</a>
            <a href="#" className={`text-white/50 text-xs ${textHoverClass} transition-colors`}>Skins</a>
          </div>
          <div class="flex flex-col gap-3">
            <h6 class="text-white font-bold text-sm">Resources</h6>
            <a href="#" className={`text-white/50 text-xs ${textHoverClass} transition-colors`}>How it Works</a>
            <a href="#" className={`text-white/50 text-xs ${textHoverClass} transition-colors`}>Selling Guide</a>
            {!isGreen && <a href="#" className={`text-white/50 text-xs ${textHoverClass} transition-colors`}>Price Index</a>}
          </div>
          <div class="flex flex-col gap-3">
            <h6 class="text-white font-bold text-sm">Company</h6>
            <a href="#" className={`text-white/50 text-xs ${textHoverClass} transition-colors`}>About Us</a>
            <a href="#" className={`text-white/50 text-xs ${textHoverClass} transition-colors`}>Careers</a>
            {!isGreen && <a href="#" className={`text-white/50 text-xs ${textHoverClass} transition-colors`}>Press</a>}
          </div>
        </div>
      </div>
      <div className={`max-w-[1440px] mx-auto mt-12 pt-6 border-t ${isGreen ? 'border-[#224922]' : 'border-[#223c49]'} flex flex-col md:flex-row justify-between items-center gap-4`}>
        <p class="text-white/30 text-[10px] uppercase font-bold tracking-widest text-center md:text-left">© 2024 {isGreen ? 'GameVault Marketplace' : 'GameMarket Industries'}. No rights reserved (Demo).</p>
        <div class="flex gap-4">
          <span className={`text-white/30 cursor-pointer transition-colors material-symbols-outlined text-[18px] ${primaryClass}`}>public</span>
          <span className={`text-white/30 cursor-pointer transition-colors material-symbols-outlined text-[18px] ${primaryClass}`}>shield</span>
          <span className={`text-white/30 cursor-pointer transition-colors material-symbols-outlined text-[18px] ${primaryClass}`}>payments</span>
        </div>
      </div>
    </footer>
  );
};