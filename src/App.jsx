import { useState } from 'react'
import Header from './Header'
import Hero from './Hero'
import ProductCard from './ProductCard'
import Footer from './Footer'
import './ProductCard.css'
import './App.css'
import products from './data/products'

function App() {
  const [cart, setCart] = useState([])
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('default')
  const [cartOpen, setCartOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [activeSearch, setActiveSearch] = useState('')

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
    const query = activeSearch.toLowerCase()
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
        setActiveSearch={setActiveSearch}
        removeFromCart={removeFromCart}
      />
      <Hero />

      <div className='filters'>
  <button className={filter === 'all' ? 'active' : ''} onClick={() => { setFilter('all'); setSearch(''); setActiveSearch('')  }}>All</button>
  <button className={filter === 'dresses' ? 'active' : ''} onClick={() => { setFilter('dresses'); setSearch(''); setActiveSearch('')  }}>Dresses</button>
  <button className={filter === 'tops' ? 'active' : ''} onClick={() => { setFilter('tops'); setSearch(''); setActiveSearch('')  }}>Tops</button>
  <button className={filter === 'jackets' ? 'active' : ''} onClick={() => { setFilter('jackets'); setSearch(''); setActiveSearch('')  }}>Jackets & Coats</button>
  <button className={filter === 'bags' ? 'active' : ''} onClick={() => { setFilter('bags'); setSearch(''); setActiveSearch('')  }}>Bags & Purses</button>
  <button className={filter === 'pants' ? 'active' : ''} onClick={() => { setFilter('pants'); setSearch(''); setActiveSearch('')  }}>Pants & Jeans</button>
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