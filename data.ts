import { Product, InventoryItem } from './types';

export const POPULAR_GAMES = [
  { name: 'League of Legends', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAF-pkovLSLL8BUa2IoSPPY2LIAyTvF54uabhvGi6D7bWV6xeWsFT934m258w29rTlKnH3Bf04dcUvcnuYSMLbajsypCFlH5myKRSCqSsQm3TjHONMTl1UO-W7DeCKPB2zoAcDx9BFet--CBSC6PW8hI0MizVlWkTKWYdUMiFdFipF8CtZR13Sy115I_XHvsdUa2S0ng-r-iAuBMdzR2Bh0AflZXaizZi2aO9SOCBRVlcEpAvCKHNAXX2zsgpFIzhnjDGShdRdUOFE' },
  { name: 'Valorant', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2y-Ku98T7akcFlg-QS43Rufkn1mdtgysEoadHySmDYM5xJLl5L2EQa9SUD4fKKzz2vuNO0pWRUwKijZpiajSc685a6Pr-14787wXkg5F99ZDDrYvk_EaOyNzHORB-Nv7-K5cDpfcZg5XN45uFRXfi_iNFMWKqV5rYo6adV-B3HwOgYh13XRtO3NtXOF3WaiqB8AIBnK2uTxTF4H_KWtGF85ojE88iOH4Wcj-ktdUi7a_P1x6fEiNTEvdaiicoNp3MHiXJv3Hq2Iw' },
  { name: 'Roblox', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAC5o6ek0pCLaFPxUg6VqwOvO80PqgnhYGUoMqqtsjfurxu6cTHkjEJA6qW7eMn6Vxzq7QvNBhJ8ijIgFqj1k1t0wDK8VtC5xSE-1mauQOpiT1yEKeiukQP88iVi2FvMrgRmMEcyzgnqbnPNIHpjdpmz9L4EYYbULj3aZLTdrwOUEN3Y6gec1j0sltYKhHvrBnbuzLB_eReWPoerVKxcuKgpVlwwk0x2NXA8WEARlCI_LzwQSc1-SkeHfUcrS4jLeAwrAZmSAh6r98' },
  { name: 'CS:GO', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzxQWCIj-VEPulC9CJHG_Hpr99lL4x0KN34hYk2w2IPssLqQs--CPARn5GtoxTRFeNOXJKVu-mYCXpHbhXjJ86pTQdiFvdZcN2JAxu8olPuZuPhgI0SIlDPjfxdpkx9OUMQs9otWDnn-ahjYPDekMy6h-sbS5uFWrfvrFXFv43iXsPOnTfLw3sgLrrAx1bqUyrV5GIGJbSf_6xJf9ZeIixoZ4KTZ8XTVZKCWuox5zpC-DKc725gREP5Bx0s5o0RB6gwFXil0pV0Zg' },
  { name: 'Fortnite', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpEkaeq_FhfCDJQk-YwuukpZfiwZLFa6Wh4iZEB5mj8bLxpG67_E6napWjQoVnakZWlSFeJYje9hLLi0drulV0QDtwGjHLUIAFxeF-iJg8ony5U2F4Apu_0Ux3GX8pWqa9YOPyLWWciK0TixNb2NlubrGJtUQsTvG6TvKruNT9N22dHfmzsfrYwVuPQqLHR-teln_RDekuDL9HT5_a573L96e4Qd-DfGNEaCSXFQzzDBJKdweaaCBpt_-7PQdmRQzr-Ily1HlhkpU' },
  { name: 'WoW', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDg9BlX1gWV3PFBpKSheGC0g10yRlhl0V8NTHmeLga-3vbh2n6O9_at5AUB5P2VgmyooMwWGvkeLy5fsuzj6KURLsWUths4_aGGwWr765b0woYEqOX2-R4hS4PCBC1mJAHmAjdDBNQ-h6vPtXTj_nOAaMB2D9Uri_Ci9gm2-dY6xpUWzM31XUHdXZrL82a_SjsXbZywsEBAgcQDgvOi1WKDnmmIzBFUWjcojSanf439zSvi4ZA-sP1CM8fBolGM30RidJLEHeRPUpg' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Dragon Lore | AWP',
    game: 'CS:GO',
    type: 'Sniper Skin',
    price: 4250.00,
    originalPrice: 4500.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATlksr1xL5Nn7ZQ9vmMRPWLeZhbO2VWQwTpXcw2W6ewDNrTQ84G_MNgfw6TRRGV_nQ7QQ8fwTKNxQYjmxZzGdQZHYeLbxQSmBws4tii0oLgqCMag50F4ryZ6fRrdxgjOEDWAlHSG3Zuit8Ftfos0FEaEbiOjjjfoI8W8DbJKaMJdpaDbHxg8tv6CFNVBRBdptk83RIaVQi6iJTgtaZntUM2dBkQwbGjl7Oi6hjy1N7ZgPEVeDwR1hjCX9VtLpTY62RTDawYVHRTds',
    rarity: 'Legendary',
    rarityColor: 'text-primary',
    description: 'The Dragon Lore AWP is one of the most iconic and sought-after skins in the history of tactical shooters. Featuring a hand-painted knotwork dragon breathing fire, this skin exudes prestige and rarity.',
    float: '0.02154382',
    pattern: 752
  },
  {
    id: '2',
    name: 'Prime Karambit',
    game: 'Valorant',
    type: 'Knife Skin',
    price: 120.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQZEpqHDj6U3nBGyFtLE9VLN3O5IZZtkEBTTqEuIZ_Y8XKGA8AuqxxRKBNtZMxkW4RTFtmPH7apEaq_hPuDJ3I0PZnS6N70CerPi82ut3-3khDeW_p-DDt7j4WiTgTq8WikOmXUwvmxUncSoICg8Sb4PR5FSc5noUgBfNhkm1FZ-Das-gS0HyPVTHKkHNf9taNln4fy9xlcHDxA5oqVf2enxUdNLdiUXO9zdA_1Ps2m-ATIEan6Qke0xmzXXFW2oFcJSJQ-aYAT0E',
    rarity: 'Epic',
    rarityColor: 'text-purple-400'
  },
  {
    id: '3',
    name: '500,000 Gold Pack',
    game: 'WoW',
    type: 'Currency',
    price: 45.50,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDR-Sj2DtgOPMP7VOeRxqUfvraastmVBGH6FPAj5lbDNJ4Xde02wo2Bhx5iVDgSit-5o0tvFmTq1533Dd5FTBEdjcdoXtv6MJ3nb3KOIxOKHaKTOmcHkFfTEQYJzDF2BhHdVPNDnKMqneOtpdxNCI58W0iFqMi6MUfaxR_GJXcexRliT-Ki7v7jEefILYMdHEHSymYVMwPdOAIH1oKRU18eiC4KDSjdjGyEMXQ5w2bxZr5BNC6OVfRP8Q5YxtS1trCTtETYyw_h2uw',
    rarity: 'Rare',
    rarityColor: 'text-blue-400'
  },
  {
    id: '4',
    name: 'Hyper Beast | M4A1-S',
    game: 'CS:GO',
    type: 'Rifle Skin',
    price: 285.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBs_SisILPQeSqLI_wqUi-bFicA2nSfe_eRyroL7lcX8NtxxGBFYWKr_CrvykjJJiJmb8C-lyYuo8RyLwsHFsv2uGZ791u1j9VvmjK6YqZWZo5YUVuB3hDFqhvw9wp9FmM6_7D1Wa1BSnsq7_k47x1yLSMRYScYtl-MbJWGOFcmxyvKz3O9cLPTJLUhka9pCHkhjITUYEjcAar8I1hyKX-h8WaWrX_dvfqH0P8PP038cDKpj0Yzlt0nGyzTJqEaT6H7Jmwax234NSs',
    rarity: 'StatTrak™',
    rarityColor: 'text-yellow-400'
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuYCoy9cS1dBuEAJacCHqdJaU-h7UoX10ojDVAaTPczRVNZosgwRcUvOavRXDUmHy6Ll4b0JRPt--tbQnqHVu4u4H71vN-8pnDa8hpC7eDl40VlDq9wudJ0Ma5CW_5Llo8_RkgSq7jWwjC7wnkcumq9dEjIYiEjasCjT-FSnTXTCv_Dl0Ldnv4vY0m_pldS7h-X8pFv2Q10D2lL-vMPPxanG_4CCByFe46HiMth-Bry6ZOS4IWVhorQfC1izXHL8hGhxRF4x17Bq8',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDy6oC4CRt5-OFFTwcPvbebs0atEJ9OXW78gxndN4BujxUUNJD6cE8NzoYl4YzVX1unczasf8qWaJJ-ydqQCg-kv1z9V0fm0aafNJFFRVJ-RwcYqtjmN97zz_rinEa0WQnQJ8DXhw89mYgFAHVODfOFH9pvyVBmQrfYJdSPFKit_2PzP3aHNd5_I7SqJwjssccrVPzk2O4xpWetkaNemdHcC6MgiS0QN_6JJ2bEvdQoOa0d59UHjkRpKFdeJo7bHCnk-EZBeXpTd-8',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNBVSw7LmkTEc7gAfo9lWMVp8tPpJsiUfDJXGZBRj-hvM4BAzwdeB7LdIyGjo73rkVbc5i3thSbH3rBrKaPCVDnVGptLPtJQPLzOKTZ49Ahl3d-grMqoY36RlD80ecsRzbnasMpUQRJVhFGFkNmFNWt9PgKdEauQ1T31vqsp7BAwdFvhP2iQJKYn9Z-E_58Ua_82vdhxq--zPvpVY8E5BZ2-FD8Y_ZJElOLPvbl4WL61456nDNAgYokjdS1dCEvKKpu4FoFwDC6cg',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSCSGKOhWvnthmSoXPfa7r2wsHRk9W4dqRhr62WQgpaG54k8d94vCXhWtENmd8kNuAmRDY-He8YhDrTQdeWjZGIvsamMfujwyyjh27tXFxk1SboAt7C408ywObyhqMy1zb4cWY_o91_4M3q4xG7pR5Mg-fRY4TJKVtw3Z7j-BRD6-4MkleWy5TcUO_hoiieBYNSFL43-BjIdFC1fJCZPGOS-61z8FSD6OTswdPQfOgsIejcgBiajdFlzvhm_4XdTG5RZfw5GEIjyQ',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIDXooCUbrU-kTb7e_CuQKhzYm_7vvwU5UkXvnPGSqahzdJn9j-PPr08ZKfmP-wTsoS4htTGUInJ9I0I-QtGjsfE6QCEPC3P0koQWNOqHgP39tfOBICF4YW9gX7mzUicichFJdKl5rYSkCNOfCdqG8504VDse-8-m_XnRcLFpLbCX_XcbaRINDnb1CbU4W8Gt-GQTJQ6lEUOWWhAfcD-SGx1cdoIvW50dkBTCjOUQOBYgO-tFph-MyB--Lhrc34nHGuGbFGgOhfJY',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpszyU2G_iv10DOSrk814Yk9bIX9D8r219LVz2p02vWbTUgbO1m-mImJxZ50HQMiPOvKKQma2WSeOZPK73U0sYw-9-7y5XaZir48JJw4Qoesj6LaEc9r-2gIgC-_d9effBDnSvGMVp3ohOoWhSKCtw9vtvvAxHMG7rkT_tuAEfQK3LvkfhQFQaC2mgEFDaoo4XERmGLDUAi5Azo63ZvwbINNe-bPUTUsiu5f4c5RNhLei9FMJoKjWWOpwqfRI6_zhvInuybkHZvGg',
    rarity: 'Rare',
    rarityColor: 'text-[#0070DD]',
    acquiredDate: '2023-12-01',
    isTradable: true
  }
];