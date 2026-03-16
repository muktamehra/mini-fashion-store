import { useState } from 'react'
import './ProductCard.css'

function ProductCard ({name, price, image, addToCart }) {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <span className="price">${price}</span>
      <div className='quantity-selector'>
        <select 
          value={quantity} 
          onChange={(e) => setQuantity(Number(e.target.value))}>
          {[1,2,3,4,5].map(function(num) {
            return <option key={num} value={num}>{num}</option>
          })}
        </select>
        <button onClick={() => addToCart(name, price, quantity)}>Add to Cart</button>
      </div>
    </div>
  )
}
export default ProductCard