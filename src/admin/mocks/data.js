const users = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i < 3 ? 'admin' : 'user',
  status: Math.random() > 0.2 ? 'active' : 'inactive',
  createdAt: Date.now() - Math.random() * 10000000
}))

const products = Array.from({ length: 30 }).map((_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: Math.round(10 + Math.random() * 990),
  stock: Math.round(Math.random() * 100),
  category: ['Electronics', 'Books', 'Clothing'][Math.floor(Math.random() * 3)],
  status: Math.random() > 0.1 ? 'available' : 'sold out'
}))

const orders = Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  userId: Math.ceil(Math.random() * users.length),
  items: Array.from({ length: 1 + Math.floor(Math.random() * 4) })
    .map(() => ({ productId: Math.ceil(Math.random() * products.length), qty: Math.ceil(Math.random() * 3) })),
  status: ['new', 'processing', 'shipped', 'delivered'][Math.floor(Math.random() * 4)],
  total: Math.round(100 + Math.random() * 9900),
  createdAt: Date.now() - Math.random() * 10000000
}))

export const mockData = { users, products, orders }
