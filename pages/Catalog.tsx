import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../data';
import { Product, Page } from '../types';
import { Rating } from '../components/Rating';
import { Image } from '../components/Image';

interface CatalogProps {
  onNavigate: (page: Page) => void;
  onSelectProduct: (product: Product) => void;
}

interface FilterOptions {
  category: string[];
  priceRange: [number, number];
  rarity: string[];
  game: string[];
  searchQuery: string;
}

export const Catalog: React.FC<CatalogProps> = ({ onNavigate, onSelectProduct }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(PRODUCTS);
  const [filters, setFilters] = useState<FilterOptions>({
    category: [],
    priceRange: [0, 10000],
    rarity: [],
    game: [],
    searchQuery: ''
  });
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Extract unique categories, rarities, and games from products
  const categories = Array.from(new Set(products.map(p => p.type)));
  const rarities = Array.from(new Set(products.map(p => p.rarity)));
  const games = Array.from(new Set(products.map(p => p.game)));

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Apply search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.game.toLowerCase().includes(query) ||
        product.type.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (filters.category.length > 0) {
      result = result.filter(product => 
        filters.category.includes(product.type)
      );
    }

    // Apply rarity filter
    if (filters.rarity.length > 0) {
      result = result.filter(product => 
        filters.rarity.includes(product.rarity)
      );
    }

    // Apply game filter
    if (filters.game.length > 0) {
      result = result.filter(product => 
        filters.game.includes(product.game)
      );
    }

    // Apply price range filter
    result = result.filter(product => 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        // Assuming we'll add ratings later
        break;
      default:
        // Featured/default sorting
        break;
    }

    setFilteredProducts(result);
  }, [filters, sortBy, products]);

  const toggleFilter = (filterType: keyof FilterOptions, value: string) => {
    setFilters(prev => {
      const currentValues = [...prev[filterType] as string[]];
      const index = currentValues.indexOf(value);
      
      if (index > -1) {
        currentValues.splice(index, 1);
      } else {
        currentValues.push(value);
      }
      
      return {
        ...prev,
        [filterType]: currentValues
      };
    });
  };

  const handleClearFilters = () => {
    setFilters({
      category: [],
      priceRange: [0, 10000],
      rarity: [],
      game: [],
      searchQuery: ''
    });
  };

  const handlePriceChange = (min: number, max: number) => {
    setFilters(prev => ({
      ...prev,
      priceRange: [min, max]
    }));
  };

  return (
    <main className="max-w-[1440px] mx-auto px-6 lg:px-20 py-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters sidebar - hidden on mobile by default */}
        <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 bg-[#182b34] rounded-2xl border border-[#315668] p-6 h-fit sticky top-8`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-xl font-bold">Filters</h2>
            <button 
              onClick={handleClearFilters}
              className="text-primary text-sm font-semibold hover:underline"
            >
              Clear All
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <label className="block text-white/70 text-sm font-medium mb-2">Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search games, items..."
                value={filters.searchQuery}
                onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
                className="w-full bg-[#223c49] text-white rounded-lg pl-10 pr-4 py-3 border border-[#315668] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/50">search</span>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <label key={category} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`size-4 rounded border ${filters.category.includes(category) ? 'bg-primary border-primary' : 'border-white/30'} flex items-center justify-center transition-colors`}>
                    {filters.category.includes(category) && (
                      <span className="material-symbols-outlined text-[12px] text-black font-bold">check</span>
                    )}
                  </div>
                  <span className="text-white/70 group-hover:text-white transition-colors">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Games */}
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-3">Games</h3>
            <div className="space-y-2">
              {games.map(game => (
                <label key={game} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`size-4 rounded border ${filters.game.includes(game) ? 'bg-primary border-primary' : 'border-white/30'} flex items-center justify-center transition-colors`}>
                    {filters.game.includes(game) && (
                      <span className="material-symbols-outlined text-[12px] text-black font-bold">check</span>
                    )}
                  </div>
                  <span className="text-white/70 group-hover:text-white transition-colors">{game}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rarity */}
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-3">Rarity</h3>
            <div className="space-y-2">
              {rarities.map(rarity => (
                <label key={rarity} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`size-4 rounded border ${filters.rarity.includes(rarity) ? 'bg-primary border-primary' : 'border-white/30'} flex items-center justify-center transition-colors`}>
                    {filters.rarity.includes(rarity) && (
                      <span className="material-symbols-outlined text-[12px] text-black font-bold">check</span>
                    )}
                  </div>
                  <span className="text-white/70 group-hover:text-white transition-colors">{rarity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-3">Price Range</h3>
            <div className="px-1">
              <input 
                type="range" 
                min="0" 
                max="10000" 
                step="100"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(filters.priceRange[0], parseInt(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-white/60 text-sm mt-2">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-white text-3xl font-bold">Game Catalog</h1>
              <p className="text-white/60">{filteredProducts.length} items available</p>
            </div>
            
            <div className="flex gap-4">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#182b34] border border-[#315668] rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
              
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 bg-[#182b34] border border-[#315668] rounded-lg px-4 py-3 text-white hover:bg-[#223c49] transition-colors"
              >
                <span className="material-symbols-outlined">filter_list</span>
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Products grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="bg-[#182b34] border border-[#315668] rounded-xl overflow-hidden hover:border-primary transition-all group cursor-pointer"
                >
                  <div className="relative h-48 bg-black/40 p-4 flex items-center justify-center">
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className={`bg-opacity-20 text-opacity-100 ${product.rarityColor.replace('text-', 'bg-')} ${product.rarityColor} text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider`}>
                        {product.rarity}
                      </span>
                    </div>
                    <Image 
                      className={`max-h-full max-w-full drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-500`}
                      src={product.image} 
                      alt={product.name} 
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-white/50 text-xs font-medium uppercase tracking-widest mb-1">{product.game} • {product.type}</p>
                    <h4 className="text-white text-lg font-bold truncate mb-3">{product.name}</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-white/40 text-[10px] uppercase font-bold tracking-tighter">Price</span>
                        <span className="text-primary text-xl font-black">${product.price.toFixed(2)}</span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add to cart functionality would go here
                        }}
                        className="bg-primary/10 hover:bg-primary text-primary hover:text-white size-10 rounded-lg transition-all flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined">shopping_cart</span>
                      </button>
                    </div>
                    
                    {/* Rating section */}
                    <div className="mt-4">
                      <Rating 
                        rating={product.averageRating || 0} 
                        totalReviews={product.totalReviews} 
                        size="sm" 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <span className="material-symbols-outlined text-6xl text-white/30 mb-4">search_off</span>
              <h3 className="text-white text-xl font-bold mb-2">No items found</h3>
              <p className="text-white/60 max-w-md mx-auto mb-6">Try adjusting your filters or search terms.</p>
              <button 
                onClick={handleClearFilters}
                className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};