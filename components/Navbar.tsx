import React from 'react';
import { Page } from '../types';

interface NavbarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate, cartCount }) => {
  const isGreenTheme = [Page.CHECKOUT_SUCCESS, Page.INVENTORY, Page.GENERATOR].includes(activePage);
  const logoText = isGreenTheme ? 'GameVault' : 'GameMarket';
  const primaryColor = isGreenTheme ? 'text-secondary' : 'text-primary';
  const borderColor = isGreenTheme ? 'border-[#224922]' : 'border-[#223c49]';
  const bgClass = isGreenTheme ? 'bg-[#102210]/80' : 'bg-background-light/80 dark:bg-background-dark/80';
  const inputBg = isGreenTheme ? 'bg-[#224922]' : 'bg-[#223c49]';
  const placeholderColor = isGreenTheme ? 'text-[#90cb90]' : 'text-[#90b7cb]';

  return (
    <header className={`sticky top-0 z-50 w-full border-b border-solid ${borderColor} ${bgClass} backdrop-blur-md px-6 lg:px-20 py-3 transition-colors duration-300`}>
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-8">
        {/* Logo & Search */}
        <div className="flex items-center gap-8 flex-1">
          <div className={`flex items-center gap-3 ${primaryColor} cursor-pointer`} onClick={() => onNavigate(Page.HOME)}>
            <div className="size-8">
             <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                {isGreenTheme ? (
                   <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path>
                ) : (
                  <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
                )}
                {isGreenTheme && <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>}
              </svg>
            </div>
            <h2 className="text-white text-xl font-bold tracking-tight">{logoText}</h2>
          </div>
          <label className="hidden md:flex flex-col min-w-40 h-10 max-w-md flex-1">
            <div className={`flex w-full flex-1 items-stretch rounded-lg h-full ${inputBg}`}>
              <div className={`${placeholderColor} flex items-center justify-center pl-4`}>
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input 
                className={`w-full border-none bg-transparent text-white focus:ring-0 placeholder:${placeholderColor} px-3 text-sm font-normal`} 
                placeholder="Search skins, accounts, items..." 
              />
            </div>
          </label>
        </div>

        {/* Links & Profile */}
        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-6">
            <button className="text-white/80 hover:text-white text-sm font-medium transition-colors" onClick={() => onNavigate(Page.HOME)}>Browse</button>
            <button className="text-white/80 hover:text-white text-sm font-medium transition-colors" onClick={() => onNavigate(Page.CATALOG)}>Catalog</button>
            <button className="text-white/80 hover:text-white text-sm font-medium transition-colors" onClick={() => onNavigate(Page.INVENTORY)}>Inventory</button>
            <button className="text-white/80 hover:text-white text-sm font-medium transition-colors flex items-center gap-1" onClick={() => onNavigate(Page.GENERATOR)}>
               <span className="material-symbols-outlined text-sm">auto_awesome</span> Create
            </button>
            <button className="text-white/80 hover:text-white text-sm font-medium transition-colors flex items-center gap-1" onClick={() => onNavigate(Page.MARKET_INTEL)}>
               <span className="material-symbols-outlined text-sm">trending_up</span> Insights
            </button>
          </nav>
          
          <div className="flex items-center gap-3">
            {!isGreenTheme && (
              <button 
                onClick={() => onNavigate(Page.CART)}
                className={`flex items-center gap-2 ${inputBg} hover:brightness-110 text-white px-4 py-2 rounded-lg transition-all border border-transparent hover:border-primary/50 relative`}
              >
                <span className={`material-symbols-outlined text-[18px] ${primaryColor}`}>shopping_cart</span>
                {cartCount > 0 && (
                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full size-4 flex items-center justify-center">
                     {cartCount}
                   </span>
                )}
                <span className="text-sm font-bold hidden sm:inline">$1,240.50</span>
              </button>
            )}
            {isGreenTheme && (
               <div className="flex flex-col items-end justify-center mr-2">
                 <p className="text-xs text-secondary/70 uppercase font-bold tracking-widest">Net Worth</p>
                 <p className="text-secondary text-sm font-bold leading-none">$12,450.80</p>
               </div>
            )}
            
            <div className={`size-10 rounded-full border-2 ${isGreenTheme ? 'border-secondary' : 'border-primary'} overflow-hidden cursor-pointer`}>
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJPqMN-AedWqx3VkDoqMLnVWxACEo_S5I2z_MFD72FCgK_srOlqmsQ1S_u2SfKBhr_0uhdBxzTa1-2QX67XG-PY23b-LlRHjB2WLqvGZ0Hg2yk_odv63GVtv-4JjWqiQtPxmiT-_gDiQTJy0fTscco_Tlf74y2WoSD7qi8NmKESn3TwCnuIiuzwnwPj9zVXnzi-LHFXykbVPwIRvYfFnvR5DpBOx53aZq_iUIi1k0a9Y7WjkhK72W16L7A_xNoUKV4PzQt_p9TLas" 
                alt="User Profile"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};