import { Product, InventoryItem } from './types';

export const POPULAR_GAMES = [
  { name: 'League of Legends', image: '/images/dragon_slayer_edge_1769891928.png' },
  { name: 'Valorant', image: '/images/prime_karambit_1769891845.png' },
  { name: 'Roblox', image: '/images/titan_grip_mouse_1769892012.png' },
  { name: 'CS:GO', image: '/images/dragon_lore_awp_1769891784.png' },
  { name: 'Fortnite', image: '/images/hyper_beast_m4a1s_1769891901.png' },
  { name: 'WoW', image: '/images/gold_pack_1769891872.png' },
];

import { Review } from './types';

const sampleReviews: Record<string, Review[]> = {
  '1': [
    {
      id: 'rev-1',
      productId: '1',
      userId: 'user-1',
      userName: 'ProGamer99',
      rating: 5,
      title: 'Absolutely stunning!',
      comment: 'This Dragon Lore AWP is the crown jewel of my collection. The craftsmanship and attention to detail are incredible. Worth every penny!',
      date: '2023-11-15',
      helpfulCount: 24
    },
    {
      id: 'rev-2',
      productId: '1',
      userId: 'user-2',
      userName: 'SkinCollector',
      rating: 4,
      title: 'Great addition to my inventory',
      comment: 'Amazing skin as expected. The color and design are perfect. Shipping was quick too.',
      date: '2023-10-22',
      helpfulCount: 12
    },
    {
      id: 'rev-3',
      productId: '1',
      userId: 'user-3',
      userName: 'CSGOEnthusiast',
      rating: 5,
      title: 'The legendary Dragon Lore!',
      comment: 'Finally got my hands on this legendary skin. The quality exceeded my expectations. Highly recommended!',
      date: '2023-09-30',
      helpfulCount: 18
    }
  ],
  '2': [
    {
      id: 'rev-4',
      productId: '2',
      userId: 'user-4',
      userName: 'KnifeMaster',
      rating: 5,
      title: 'Perfect edge!',
      comment: 'This Prime Karambit has the perfect balance and feel. The design is gorgeous and really stands out in-game.',
      date: '2023-12-01',
      helpfulCount: 9
    }
  ],
  '3': [
    {
      id: 'rev-5',
      productId: '3',
      userId: 'user-5',
      userName: 'GoldFarmer',
      rating: 4,
      title: 'Good value for gold',
      comment: 'Got a lot of gold for my efforts. The pack arrived quickly and contained some nice items.',
      date: '2023-11-25',
      helpfulCount: 5
    }
  ],
  '4': [
    {
      id: 'rev-6',
      productId: '4',
      userId: 'user-6',
      userName: 'RifleExpert',
      rating: 5,
      title: 'Hyper Beast power!',
      comment: 'This Hyper Beast M4A1-S is absolutely beautiful. The colors pop and the pattern is unique. Love it!',
      date: '2023-11-05',
      helpfulCount: 15
    }
  ]
};

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Dragon Lore | AWP',
    game: 'CS:GO',
    type: 'Sniper Skin',
    price: 4250.00,
    originalPrice: 4500.00,
    image: '/images/dragon_lore_awp_1769891784.png',
    rarity: 'Legendary',
    rarityColor: 'text-primary',
    description: 'The Dragon Lore AWP is one of the most iconic and sought-after skins in the history of tactical shooters. Featuring a hand-painted knotwork dragon breathing fire, this skin exudes prestige and rarity.',
    float: '0.02154382',
    pattern: 752,
    averageRating: 4.8,
    totalReviews: 128,
    reviews: sampleReviews['1']
  },
  {
    id: '2',
    name: 'Prime Karambit',
    game: 'Valorant',
    type: 'Knife Skin',
    price: 120.00,
    image: '/images/prime_karambit_1769891845.png',
    rarity: 'Epic',
    rarityColor: 'text-purple-400',
    averageRating: 4.5,
    totalReviews: 87,
    reviews: sampleReviews['2']
  },
  {
    id: '3',
    name: '500,000 Gold Pack',
    game: 'WoW',
    type: 'Currency',
    price: 45.50,
    image: '/images/gold_pack_1769891872.png',
    rarity: 'Rare',
    rarityColor: 'text-blue-400',
    averageRating: 4.2,
    totalReviews: 245,
    reviews: sampleReviews['3']
  },
  {
    id: '4',
    name: 'Hyper Beast | M4A1-S',
    game: 'CS:GO',
    type: 'Rifle Skin',
    price: 285.00,
    image: '/images/hyper_beast_m4a1s_1769891901.png',
    rarity: 'StatTrak™',
    rarityColor: 'text-yellow-400',
    averageRating: 4.6,
    totalReviews: 92,
    reviews: sampleReviews['4']
  }
];

export const INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: 'inv-1',
    inventoryId: '#88241',
    name: "Dragon Slayer's Edge",
    game: 'RPG World',
    type: 'Sword',
    price: 2450.00,
    image: '/images/dragon_slayer_edge_1769891928.png',
    rarity: 'Legendary',
    rarityColor: 'text-[#FFD700]',
    acquiredDate: '2023-11-15',
    isTradable: true
  },
  {
    id: 'inv-2',
    inventoryId: '#44129',
    name: 'Neon Pulse Suit',
    game: 'CyberVerse',
    type: 'Armor',
    price: 842.20,
    image: '/images/neon_pulse_suit_1769891954.png',
    rarity: 'Epic',
    rarityColor: 'text-[#A335EE]',
    acquiredDate: '2023-10-10',
    isTradable: true
  },
  {
    id: 'inv-3',
    inventoryId: '#11054',
    name: 'Frost Walker Medallion',
    game: 'Fantasy RPG',
    type: 'Accessory',
    price: 125.00,
    image: '/images/frost_walker_medallion_1769891985.png',
    rarity: 'Rare',
    rarityColor: 'text-[#0070DD]',
    acquiredDate: '2023-12-01',
    isTradable: true
  },
    {
    id: 'inv-4',
    inventoryId: '#99321',
    name: "Titan's Grip Mouse",
    game: 'Hardware',
    type: 'Accessory',
    price: 1100.00,
    image: '/images/titan_grip_mouse_1769892012.png',
    rarity: 'Legendary',
    rarityColor: 'text-[#FFD700]',
    acquiredDate: '2023-11-15',
    isTradable: true
  },
  {
    id: 'inv-5',
    inventoryId: '#22345',
    name: 'Quantum Shifter Effect',
    game: 'CyberVerse',
    type: 'Effect',
    price: 430.50,
    image: '/images/quantum_shifter_effect_1769892042.png',
    rarity: 'Epic',
    rarityColor: 'text-[#A335EE]',
    acquiredDate: '2023-10-10',
    isTradable: true
  },
  {
    id: 'inv-6',
    inventoryId: '#77412',
    name: 'EMP Disruptor',
    game: 'Sci-Fi Shooter',
    type: 'Gadget',
    price: 45.00,
    image: '/images/emp_disruptor_1769892068.png',
    rarity: 'Rare',
    rarityColor: 'text-[#0070DD]',
    acquiredDate: '2023-12-01',
    isTradable: true
  }
];