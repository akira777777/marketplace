const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample data - in a real app this would come from a database
const products = [
  {
    id: 1,
    name: "Dragon Lore AWP",
    price: 2450.99,
    image: "/images/dragon_lore_awp_1769891784.png",
    category: "weapons",
    rating: 4.9,
    reviews: 1247,
    description: "Legendary AWP skin with dragon motif"
  },
  {
    id: 2,
    name: "Prime Karambit",
    price: 1890.50,
    image: "/images/prime_karambit_1769891845.png",
    category: "knives",
    rating: 4.8,
    reviews: 892,
    description: "Premium karambit with pristine finish"
  },
  {
    id: 3,
    name: "Gold Pack",
    price: 599.99,
    image: "/images/gold_pack_1769891872.png",
    category: "bundles",
    rating: 4.7,
    reviews: 2156,
    description: "Exclusive gold-themed item collection"
  }
];

const users = [
  {
    id: 1,
    username: "gamer123",
    email: "gamer@example.com",
    inventory: []
  }
];

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend server is running' });
});

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Search products
app.get('/api/products/search/:query', (req, res) => {
  const query = req.params.query.toLowerCase();
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query)
  );
  res.json(filteredProducts);
});

// Get user profile
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// Add item to cart
app.post('/api/cart/add', (req, res) => {
  const { userId, productId, quantity } = req.body;
  
  // In a real app, this would update the database
  console.log(`Adding ${quantity} of product ${productId} to user ${userId}'s cart`);
  
  res.json({ 
    success: true, 
    message: 'Item added to cart',
    cartItem: { userId, productId, quantity }
  });
});

// Get cart items
app.get('/api/cart/:userId', (req, res) => {
  // In a real app, this would fetch from database
  res.json({ 
    userId: parseInt(req.params.userId),
    items: [],
    total: 0
  });
});

// Submit review
app.post('/api/reviews', (req, res) => {
  const { productId, userId, rating, comment } = req.body;
  
  // In a real app, this would save to database
  console.log(`New review for product ${productId} by user ${userId}: ${rating} stars`);
  
  res.json({ 
    success: true, 
    message: 'Review submitted successfully',
    review: { productId, userId, rating, comment }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
});

module.exports = app;