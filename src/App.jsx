import { useState } from 'react'
import Header from './Header'
import Hero from './Hero'
import ProductCard from './ProductCard'
import Footer from './Footer'
import './Hero.css'
import './ProductCard.css'
import './App.css'

function App() { // ← this is a React component
  const [cart, setCart] = useState([])
  const [cartTotal, setCartTotal] = useState(0)
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('default')
  const [cartOpen, setCartOpen] = useState(false)
  const [search, setSearch] = useState('')
  const products = [
    {id: 1, name: "Winter Coat", price: 30, image: "images/jacket.jpg", description: " A great all year round jacket"},
    {id: 2, name: "Summer Dress", price: 60, image: "images/dress.jpg", description: " A beautiful red dress"},
    {id: 3, name: "Comfortable Shoes", price: 45, image: "images/shoes.jpg", description: " A pair of comfortable shoes"}
  ]

  function addToCart(name, price) {
    setCartTotal(cartTotal + 1)

    const existingProduct = cart.find(function(item) {
      return item.name === name
    })

    if (existingProduct) {
      setCart(cart.map(function(item) {
        if (item.name === name) {
          return { ...item, quantity: item.quantity + 1 }
        }
        return item
      }))
    } else {
      setCart([...cart, { name: name, price: price, quantity: 1 }])
    }
  }

  // add reduce here
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // The above code can be written as this as well:
  // const total = cart.reduce(function(sum, item) {
  // return sum + item.price * item.quantity
  // }, 0)

  //  cart total
  const filteredProducts = products.filter(function(product) {
    if (filter === 'all') return true
    if (filter === 'under50') return product.price < 50
    if (filter === 'over50') return product.price > 50
  })

  const searchedProducts = filteredProducts.filter(function(product) {
    return product.name.toLowerCase().includes(search.toLocaleLowerCase())
  })

  const sortedProducts = [...searchedProducts].sort(function(a, b) {
    if ( sort === 'low') return a.price -b.price
    if ( sort === 'high') return b.price -a.price
    return 0
  })


  return (     //← everything inside here shows on the page
    <div>
      <Header 
      cartTotal={cartTotal} 
      total={total} 
      cart = {cart}
      cartOpen = {cartOpen}
      setCartOpen = {setCartOpen}
      search={search}
      setSearch={setSearch}
      />
      <Hero />

      {/* remove div search since it's now in the header */}

      {/* <div className='search'>
      <input 
      type='text'
      placeholder='Search products...'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      />
      </div> */}

      <div className='filters'>
        <button 
        className={filter === 'all' ? 'active' : ''}
        onClick={() => setFilter('all')}>All</button>
        <button 
        className={filter === 'under50' ? 'active' : ''}
        onClick={() => setFilter('under50')}>Under $50</button>
        <button 
        className={filter === 'over50' ? 'active' : ''}
        onClick={() => setFilter('over50')}>Over $50</button>
      </div>

      <div className='sort'>
        <button 
        className={sort === 'default' ? 'active' : ''} 
        onClick={() => setSort('default')}>Default</button>
        <button 
        className={sort === 'low' ? 'active' : ''} 
        onClick={() => setSort('low')}>Price Low to High</button>
        <button 
        className={sort === 'high' ? 'active' : ''} 
        onClick={() => setSort('high')}>Price High to Low</button>
      </div>
      <div className="cards">
        {sortedProducts.map(function(product) {
          return (
            <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            description={product.description}
            addToCart={addToCart}
            />
          )
        })}
      </div>
      <Footer />
    </div>
  )
}

export default App  // ← makes this component available to other files