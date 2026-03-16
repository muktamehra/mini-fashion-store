import { useState } from 'react'
import Header from './Header'
import Hero from './Hero'
import ProductCard from './ProductCard'
import Footer from './Footer'
import './ProductCard.css'
import './App.css'

function App() {
  const [cart, setCart] = useState([])
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('default')
  const [cartOpen, setCartOpen] = useState(false)
  const [search, setSearch] = useState('')

  const products = [
    // Dresses
    { id: 1, name: "Floral Midi Dress", price: 65, category: "dresses", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80" },
    { id: 2, name: "Black Evening Dress", price: 95, category: "dresses", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80" },
    { id: 3, name: "Summer Wrap Dress", price: 55, category: "dresses", image: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&q=80" },

    // T-Shirts & Tops
    { id: 4, name: "Classic White Tee", price: 25, category: "tops", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80" },
    { id: 5, name: "Striped Knit Top", price: 38, category: "tops", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80" },
    { id: 6, name: "Oversized Crop Top", price: 30, category: "tops", image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&q=80" },

    // Jackets & Coats
    { id: 7, name: "Leather Biker Jacket", price: 120, category: "jackets", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80" },
    { id: 8, name: "Wool Trench Coat", price: 140, category: "jackets", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&q=80" },
    { id: 9, name: "Denim Jacket", price: 75, category: "jackets", image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?w=600&q=80" },

    // Bags & Purses
    { id: 10, name: "Mini Shoulder Bag", price: 50, category: "bags", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80" },
    { id: 11, name: "Leather Tote Bag", price: 85, category: "bags", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80" },
    { id: 12, name: "Woven Clutch", price: 40, category: "bags", image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80" },

    // Pants & Jeans
    { id: 13, name: "High Waist Jeans", price: 70, category: "pants", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80" },
    { id: 14, name: "Wide Leg Trousers", price: 60, category: "pants", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80" },
    { id: 15, name: "Linen Pants", price: 48, category: "pants", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80" },
  ]

  const addToCart = (name, price) => {
    const existingProduct = cart.find((item) => item.name === name)
    if (existingProduct) {
      setCart(cart.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setCart([...cart, { name, price, quantity: 1 }])
    }
  }

  const removeFromCart = (name) => {
    const existingProduct = cart.find((item) => item.name === name)
    if (existingProduct.quantity === 1) {
      setCart(cart.filter((item) => item.name !== name))
    } else {
      setCart(cart.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity - 1 } : item
      ))
    }
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const filteredProducts = products.filter((product) =>
    filter === 'all' ? true : product.category === filter
  )

  const searchedProducts = filteredProducts.filter((product) => {
    const query = search.toLowerCase()
    return product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query)
  })

  const sortedProducts = [...searchedProducts].sort((a, b) => {
    if (sort === 'low') return a.price - b.price
    if (sort === 'high') return b.price - a.price
    return 0
  })

  const cartTotal = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div>
      <Header
        cartTotal={cartTotal}
        total={total}
        cart={cart}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        search={search}
        setSearch={setSearch}
        removeFromCart={removeFromCart}
      />
      <Hero />

      <div className='filters'>
  <button className={filter === 'all' ? 'active' : ''} onClick={() => { setFilter('all'); setSearch('') }}>All</button>
  <button className={filter === 'dresses' ? 'active' : ''} onClick={() => { setFilter('dresses'); setSearch('') }}>Dresses</button>
  <button className={filter === 'tops' ? 'active' : ''} onClick={() => { setFilter('tops'); setSearch('') }}>Tops</button>
  <button className={filter === 'jackets' ? 'active' : ''} onClick={() => { setFilter('jackets'); setSearch('') }}>Jackets & Coats</button>
  <button className={filter === 'bags' ? 'active' : ''} onClick={() => { setFilter('bags'); setSearch('') }}>Bags & Purses</button>
  <button className={filter === 'pants' ? 'active' : ''} onClick={() => { setFilter('pants'); setSearch('') }}>Pants & Jeans</button>
</div>

      <div className='sort'>
        <button className={sort === 'default' ? 'active' : ''} onClick={() => setSort('default')}>Default</button>
        <button className={sort === 'low' ? 'active' : ''} onClick={() => setSort('low')}>Price Low to High</button>
        <button className={sort === 'high' ? 'active' : ''} onClick={() => setSort('high')}>Price High to Low</button>
      </div>

      <div className="cards">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            addToCart={addToCart}
          />
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default App