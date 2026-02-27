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


  return (     //← everything inside here shows on the page
    <div>
      <Header cartTotal={cartTotal} total={total} />
      <Hero />
      <div className='filters'>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('under50')}>Under $50</button>
        <button onClick={() => setFilter('over50')}>Over $50</button>
      </div>
      <div className="cards">
        {filteredProducts.map(function(product) {
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