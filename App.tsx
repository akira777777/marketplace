import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { CheckoutSuccess } from './pages/CheckoutSuccess';
import { Inventory } from './pages/Inventory';
import { Generator } from './pages/Generator';
import { MarketIntel } from './pages/MarketIntel';
import { Catalog } from './pages/Catalog';
import { CartProvider, useCart } from './context/CartContext';
import { Page, Product } from './types';

const AppContent: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.HOME);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { items, addToCart } = useCart();

  const handleNavigate = (page: Page) => {
    setActivePage(page);
    window.scrollTo(0, 0);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    handleNavigate(Page.PRODUCT_DETAILS);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const renderPage = () => {
    switch (activePage) {
      case Page.HOME:
        return <Home onNavigate={handleNavigate} onSelectProduct={handleSelectProduct} />;
      case Page.PRODUCT_DETAILS:
        return selectedProduct ? (
          <ProductDetails 
            product={selectedProduct} 
            onAddToCart={handleAddToCart}
            onBack={() => handleNavigate(Page.HOME)}
          />
        ) : <Home onNavigate={handleNavigate} onSelectProduct={handleSelectProduct} />;
      case Page.CART:
        return <Cart onNavigate={handleNavigate} />;
      case Page.CHECKOUT_SUCCESS:
        return <CheckoutSuccess onNavigate={handleNavigate} />;
      case Page.INVENTORY:
        return <Inventory />;
      case Page.GENERATOR:
        return <Generator />;
      case Page.MARKET_INTEL:
        return <MarketIntel />;
      case Page.CATALOG:
        return <Catalog onNavigate={handleNavigate} onSelectProduct={handleSelectProduct} />;
      default:
        return <Home onNavigate={handleNavigate} onSelectProduct={handleSelectProduct} />;
    }
  };

  const isGreenTheme = [Page.CHECKOUT_SUCCESS, Page.INVENTORY, Page.GENERATOR].includes(activePage);
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={`flex flex-col min-h-screen ${isGreenTheme ? 'bg-bg-green-dark' : 'bg-background-dark'}`}>
      <Navbar activePage={activePage} onNavigate={handleNavigate} cartCount={cartCount} />
      {renderPage()}
      {activePage !== Page.INVENTORY && activePage !== Page.GENERATOR && <Footer theme={isGreenTheme ? 'green' : 'blue'} />}
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}