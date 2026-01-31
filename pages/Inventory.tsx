import React, { useState, useMemo } from 'react';
import { INVENTORY_ITEMS } from '../data';
import { InventoryItem } from '../types';

type SortOption = {
  field: 'name' | 'price' | 'rarity';
  direction: 'asc' | 'desc';
};

const ITEMS_PER_PAGE = 12;

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  action: 'trade' | 'list' | null;
  count: number;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, action, count }) => {
  if (!isOpen || !action) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in px-4">
      <div className="bg-[#102210] border border-secondary/20 rounded-2xl p-6 max-w-md w-full shadow-[0_0_50px_rgba(13,242,13,0.1)] relative transform transition-all scale-100">
        <div className="flex items-start gap-4 mb-4">
            <div className="size-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 text-secondary border border-secondary/20">
                <span className="material-symbols-outlined text-2xl">
                    {action === 'trade' ? 'swap_horiz' : 'sell'}
                </span>
            </div>
            <div>
                <h3 className="text-xl font-bold text-white mb-1">Confirm {action === 'trade' ? 'Trade Request' : 'Market Listing'}</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  You are about to {action} <span className="text-secondary font-bold">{count}</span> item{count !== 1 ? 's' : ''}. 
                  {action === 'trade' 
                    ? ' These items will be moved to your active trade offers.' 
                    : ' These items will be listed publicly on the marketplace.'}
                </p>
            </div>
        </div>
        
        <div className="bg-surface-green/50 rounded-lg p-3 mb-6 border border-white/5">
            <div className="flex justify-between items-center text-xs text-white/40 uppercase font-bold tracking-wider mb-2">
                <span>Action Summary</span>
                <span>{count} Assets</span>
            </div>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-full animate-pulse"></div>
            </div>
        </div>

        <div className="flex gap-3 justify-end">
          <button 
            onClick={onClose} 
            className="px-4 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/5 font-bold text-sm transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="px-6 py-2.5 bg-secondary text-bg-green-dark rounded-xl font-bold text-sm hover:brightness-110 shadow-[0_0_15px_rgba(13,242,13,0.3)] transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">check</span>
            Confirm {action === 'trade' ? 'Trade' : 'Listing'}
          </button>
        </div>
      </div>
    </div>
  );
};

export const Inventory: React.FC = () => {
  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{ category: string[]; tradable: boolean | null }>({
    category: [],
    tradable: null
  });
  const [sort, setSort] = useState<SortOption>({ field: 'rarity', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  // New State for UI Enhancements
  const [actionModal, setActionModal] = useState<{ isOpen: boolean; action: 'trade' | 'list' | null }>({ isOpen: false, action: null });
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(true);

  // Constants
  const categories = ['Sword', 'Armor', 'Accessory', 'Effect', 'Gadget'];

  // Handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const toggleFilter = (category: string) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category.includes(category) 
        ? prev.category.filter(c => c !== category)
        : [...prev.category, category]
    }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({ category: [], tradable: null });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleSortChange = (field: 'name' | 'price' | 'rarity') => {
    setSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const handleSelectAll = (filteredItems: InventoryItem[]) => {
    if (selectedIds.size === filteredItems.length && filteredItems.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredItems.map(i => i.id)));
    }
  };

  const toggleSelection = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const openActionModal = (action: 'trade' | 'list') => {
    if (selectedIds.size === 0) return;
    setActionModal({ isOpen: true, action });
  };

  const handleConfirmAction = () => {
    // Here you would implement the actual logic
    console.log(`Executed ${actionModal.action} on ${selectedIds.size} items.`);
    setSelectedIds(new Set());
    setActionModal({ isOpen: false, action: null });
  };

  // Processing
  const processedItems = useMemo(() => {
    let result = [...INVENTORY_ITEMS];

    // Search
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(lower) || 
        item.inventoryId.toLowerCase().includes(lower)
      );
    }

    // Filter
    if (filters.category.length > 0) {
      result = result.filter(item => filters.category.includes(item.type));
    }
    if (filters.tradable !== null) {
      result = result.filter(item => item.isTradable === filters.tradable);
    }

    // Sort
    result.sort((a, b) => {
      let res = 0;
      if (sort.field === 'price') res = a.price - b.price;
      if (sort.field === 'name') res = a.name.localeCompare(b.name);
      if (sort.field === 'rarity') {
        const order: Record<string, number> = { 'Legendary': 3, 'Epic': 2, 'Rare': 1, 'Common': 0 };
        res = (order[a.rarity] || 0) - (order[b.rarity] || 0);
      }
      return sort.direction === 'asc' ? res : -res;
    });

    return result;
  }, [searchTerm, filters, sort]);

  const totalPages = Math.ceil(processedItems.length / ITEMS_PER_PAGE);
  const currentItems = processedItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  
  const hasActiveFilters = filters.category.length > 0 || filters.tradable !== null || searchTerm !== '';
  const isAllSelected = selectedIds.size === processedItems.length && processedItems.length > 0;
  const isIndeterminate = selectedIds.size > 0 && selectedIds.size < processedItems.length;

  return (
    <div className="flex flex-1 overflow-hidden grid-bg animate-fade-in bg-bg-green-dark relative">
      <ConfirmModal 
        isOpen={actionModal.isOpen} 
        action={actionModal.action} 
        count={selectedIds.size} 
        onClose={() => setActionModal({ ...actionModal, isOpen: false })}
        onConfirm={handleConfirmAction}
      />

      {/* Sidebar Navigation */}
      <aside className="w-72 bg-bg-green-dark border-r border-secondary/10 flex flex-col p-6 gap-6 hidden lg:flex overflow-y-auto">
        
        {/* Basic Categories */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-3 mb-2">
            <h3 className="text-secondary/50 text-xs font-bold uppercase tracking-widest">Categories</h3>
            {hasActiveFilters && (
                <button onClick={clearAllFilters} className="text-[10px] text-red-400 hover:text-red-300 uppercase font-bold flex items-center gap-1 transition-colors">
                    <span className="material-symbols-outlined text-[10px]">close</span> Clear
                </button>
            )}
          </div>
          <nav className="flex flex-col gap-1">
            <button 
              onClick={() => setFilters(prev => ({ ...prev, category: [] }))}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${filters.category.length === 0 ? 'bg-secondary/20 text-white' : 'text-secondary/70 hover:bg-surface-green'} group transition-all`}
            >
              <span className="material-symbols-outlined text-secondary group-hover:scale-110 transition-transform">dashboard</span>
              <p className="text-sm font-medium flex-1 text-left">All Items</p>
              <span className="text-xs bg-bg-green-dark px-2 py-0.5 rounded text-secondary/70 border border-secondary/10">{INVENTORY_ITEMS.length}</span>
            </button>
            {categories.map((cat, idx) => (
              <button 
                key={idx} 
                onClick={() => toggleFilter(cat)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${filters.category.includes(cat) ? 'bg-surface-green text-white border border-secondary/20' : 'text-secondary/70 hover:bg-surface-green/50'} group transition-all`}
              >
                <span className="material-symbols-outlined group-hover:scale-110 transition-transform text-sm">category</span>
                <p className="text-sm font-medium">{cat}</p>
              </button>
            ))}
          </nav>
        </div>
        
        {/* Advanced Filters Section */}
        <div className="border-t border-secondary/10 pt-6">
           <button 
             onClick={() => setIsAdvancedFiltersOpen(!isAdvancedFiltersOpen)}
             className="flex items-center justify-between w-full text-secondary/50 text-xs font-bold uppercase tracking-widest mb-4 hover:text-secondary transition-colors group"
           >
             <span>Advanced Filters</span>
             <span className={`material-symbols-outlined text-sm transform transition-transform duration-300 ${isAdvancedFiltersOpen ? 'rotate-180' : ''}`}>expand_more</span>
           </button>
           
           <div className={`space-y-4 overflow-hidden transition-all duration-300 ease-in-out ${isAdvancedFiltersOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
               <div className="px-3">
                 <label className="block text-white/40 text-[10px] uppercase font-bold tracking-wider mb-2">Trade Status</label>
                 <label className={`flex items-center gap-3 cursor-pointer group p-3 rounded-lg border transition-all ${filters.tradable === true ? 'bg-surface-green border-secondary/30' : 'border-white/5 hover:bg-surface-green/30'}`}>
                   <div className={`size-4 rounded border ${filters.tradable === true ? 'bg-secondary border-secondary' : 'border-secondary/50'} flex items-center justify-center transition-colors`}>
                      {filters.tradable === true && <span className="material-symbols-outlined text-[12px] text-black font-bold">check</span>}
                   </div>
                   <input type="checkbox" className="hidden" onChange={() => setFilters(prev => ({...prev, tradable: prev.tradable === true ? null : true}))} checked={filters.tradable === true} />
                   <span className="text-secondary/90 text-sm font-medium">Tradable Only</span>
                 </label>
               </div>
               
               {/* Placeholder for future advanced filters */}
               <div className="px-3 opacity-50 pointer-events-none">
                 <label className="block text-white/40 text-[10px] uppercase font-bold tracking-wider mb-2">Price Range</label>
                 <div className="flex items-center gap-2">
                    <input disabled type="text" placeholder="Min" className="w-full bg-surface-green/30 border border-secondary/10 rounded-lg py-2 px-3 text-xs text-white" />
                    <span className="text-secondary/30">-</span>
                    <input disabled type="text" placeholder="Max" className="w-full bg-surface-green/30 border border-secondary/10 rounded-lg py-2 px-3 text-xs text-white" />
                 </div>
               </div>
           </div>
        </div>

        <div className="mt-auto bg-surface-green/50 p-4 rounded-xl border border-secondary/10 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-3">
            <span className="material-symbols-outlined text-secondary">verified_user</span>
            <p className="text-xs font-bold text-white uppercase">Vault Security</p>
          </div>
          <p className="text-xs text-secondary/60 leading-relaxed">2FA is currently active. Your items are secured with blockchain tracking.</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8 flex flex-col">
        {/* Header Actions */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between gap-4">
             <div className="relative flex-1 max-w-lg group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary/50 group-hover:text-secondary transition-colors">search</span>
                <input 
                  type="text" 
                  placeholder="Search by Name or Asset ID..." 
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full bg-surface-green/50 border border-secondary/20 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-secondary/30 focus:ring-1 focus:ring-secondary focus:border-secondary transition-all outline-none"
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary/50 hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                )}
             </div>
             
             {selectedIds.size > 0 && (
               <div className="flex items-center gap-3 animate-slide-up origin-right">
                 <div className="flex items-center gap-2 mr-2 px-3 py-1 bg-secondary/10 rounded-lg border border-secondary/20 text-secondary text-xs font-bold uppercase tracking-wider">
                    <span>{selectedIds.size} Selected</span>
                 </div>
                 <button 
                    onClick={() => openActionModal('trade')}
                    className="h-12 px-5 bg-secondary text-bg-green-dark font-bold rounded-xl hover:brightness-110 flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(13,242,13,0.3)] hover:scale-105 active:scale-95"
                 >
                   <span className="material-symbols-outlined">swap_horiz</span> Trade
                 </button>
                 <button 
                    onClick={() => openActionModal('list')}
                    className="h-12 px-5 bg-surface-green text-white font-bold rounded-xl border border-secondary/30 hover:bg-surface-green/80 flex items-center gap-2 transition-all hover:border-secondary hover:shadow-[0_0_15px_rgba(13,242,13,0.1)] active:scale-95"
                 >
                   <span className="material-symbols-outlined">sell</span> List
                 </button>
               </div>
             )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-secondary/10">
             <div className="flex items-center gap-3">
               <label className={`flex items-center gap-2 cursor-pointer select-none px-3 py-2 rounded-lg border transition-all ${isAllSelected || isIndeterminate ? 'bg-secondary/10 border-secondary/30' : 'bg-surface-green/30 border-transparent hover:border-secondary/20'}`}>
                 <div className={`size-4 rounded border ${isAllSelected || isIndeterminate ? 'bg-secondary border-secondary' : 'border-secondary/50'} flex items-center justify-center transition-colors`}>
                    {isAllSelected && <span className="material-symbols-outlined text-[12px] text-black font-bold">check</span>}
                    {isIndeterminate && <span className="material-symbols-outlined text-[12px] text-black font-bold">remove</span>}
                 </div>
                 <input 
                   type="checkbox" 
                   className="hidden" 
                   onChange={() => handleSelectAll(processedItems)} 
                   checked={isAllSelected} 
                 />
                 <span className={`text-sm font-bold transition-colors ${isAllSelected || isIndeterminate ? 'text-secondary' : 'text-secondary/80'}`}>
                    Select All
                 </span>
               </label>
               <div className="h-6 w-px bg-secondary/10"></div>
               <span className="text-secondary/60 text-sm font-medium">{processedItems.length} Assets Found</span>
             </div>

             <div className="flex gap-2 bg-surface-green/30 p-1 rounded-xl">
                <button onClick={() => handleSortChange('rarity')} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${sort.field === 'rarity' ? 'bg-surface-green text-white shadow-sm' : 'text-secondary/60 hover:text-white'}`}>
                  Rarity {sort.field === 'rarity' && <span className="material-symbols-outlined text-sm">{sort.direction === 'asc' ? 'arrow_upward' : 'arrow_downward'}</span>}
                </button>
                <button onClick={() => handleSortChange('price')} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${sort.field === 'price' ? 'bg-surface-green text-white shadow-sm' : 'text-secondary/60 hover:text-white'}`}>
                  Price {sort.field === 'price' && <span className="material-symbols-outlined text-sm">{sort.direction === 'asc' ? 'arrow_upward' : 'arrow_downward'}</span>}
                </button>
                 <button onClick={() => handleSortChange('name')} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${sort.field === 'name' ? 'bg-surface-green text-white shadow-sm' : 'text-secondary/60 hover:text-white'}`}>
                  Name {sort.field === 'name' && <span className="material-symbols-outlined text-sm">{sort.direction === 'asc' ? 'arrow_upward' : 'arrow_downward'}</span>}
                </button>
             </div>
          </div>
        </div>

        {/* Items Grid */}
        {currentItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {currentItems.map((item) => (
               <div 
                 key={item.id} 
                 onClick={() => toggleSelection(item.id)}
                 className={`group relative border rounded-xl overflow-hidden transition-all duration-300 cursor-pointer 
                  ${selectedIds.has(item.id) 
                    ? 'bg-secondary/10 border-secondary ring-1 ring-secondary shadow-[0_0_20px_rgba(13,242,13,0.15)] -translate-y-1 z-10' 
                    : 'bg-surface-green/40 border-white/10 hover:border-secondary/50 hover:-translate-y-1 hover:shadow-lg'
                  }`}
              >
                  <div className="absolute top-3 right-3 z-10 transition-transform duration-300 group-hover:scale-110">
                     <div className={`size-5 rounded border transition-all flex items-center justify-center ${selectedIds.has(item.id) ? 'bg-secondary border-secondary shadow-[0_0_10px_rgba(13,242,13,0.4)]' : 'bg-black/40 border-white/30 group-hover:border-white'}`}>
                        {selectedIds.has(item.id) && <span className="material-symbols-outlined text-[14px] text-black font-bold">check</span>}
                     </div>
                  </div>
                  <div className="absolute top-3 left-3 z-10">
                     <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.rarityColor === 'text-[#FFD700]' ? 'bg-[#FFD700] text-black shadow-[#FFD700]/20' : item.rarityColor === 'text-[#A335EE]' ? 'bg-[#A335EE] text-white shadow-[#A335EE]/20' : 'bg-[#0070DD] text-white'} shadow-lg uppercase tracking-widest`}>
                        {item.rarity}
                     </span>
                  </div>
                  <div className="aspect-square w-full bg-gradient-to-b from-white/5 to-transparent flex items-center justify-center p-6 relative overflow-hidden">
                     {selectedIds.has(item.id) && <div className="absolute inset-0 bg-secondary/10 animate-pulse"></div>}
                     <div 
                        className="w-full h-full bg-center bg-contain bg-no-repeat transition-transform duration-500 group-hover:scale-110" 
                        style={{backgroundImage: `url('${item.image}')`, filter: `drop-shadow(0 0 15px ${item.rarityColor.includes('FFD700') ? 'rgba(255,215,0,0.4)' : item.rarityColor.includes('A335EE') ? 'rgba(163,53,238,0.4)' : 'rgba(0,112,221,0.4)'})`}}
                     ></div>
                  </div>
                  <div className={`p-4 transition-colors ${selectedIds.has(item.id) ? 'bg-secondary/20' : 'bg-surface-green group-hover:bg-surface-green/80'}`}>
                     <h4 className="text-white font-bold truncate group-hover:text-secondary transition-colors">{item.name}</h4>
                     <div className="flex items-center justify-between mt-1">
                        <span className="text-secondary text-sm font-bold">${item.price.toFixed(2)}</span>
                        <span className="text-white/40 text-xs">ID: {item.inventoryId}</span>
                     </div>
                  </div>
               </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50 py-12">
            <span className="material-symbols-outlined text-6xl text-secondary mb-4">search_off</span>
            <h3 className="text-white text-xl font-bold mb-2">No items found</h3>
            <p className="text-white/60">Try adjusting your filters or search terms.</p>
            <button onClick={clearAllFilters} className="mt-6 px-6 py-2 bg-secondary/10 border border-secondary/30 rounded-lg text-secondary font-bold hover:bg-secondary/20 transition-all">
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {processedItems.length > ITEMS_PER_PAGE && (
          <div className="flex justify-center items-center gap-4 mt-8 pt-4 border-t border-secondary/10">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="size-10 rounded-lg border border-secondary/20 flex items-center justify-center text-secondary hover:bg-surface-green disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <span className="text-secondary/60 text-sm font-bold">Page {currentPage} of {totalPages}</span>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="size-10 rounded-lg border border-secondary/20 flex items-center justify-center text-secondary hover:bg-surface-green disabled:opacity-30 disabled:hover:bg-transparent transition-all"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
};