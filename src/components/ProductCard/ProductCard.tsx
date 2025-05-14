import React from 'react'
import type { Product } from '../../types/types'
import { Rating } from '@smastrom/react-rating'
import { useCart } from '../../context/CartContext'
import './ProductCard.css'

//Instantiating product card for each item listed in product catelog.
const ProductCard:React.FC<{product: Product}> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className='product-card'>
        <h3>{product.title}</h3>
        <p>${product.price}</p>
        <h5>{product.category}</h5>
        <Rating style={{ maxWidth: 150, margin: 20 }} value={product.rating.rate} readOnly/>
        <img className='product-image' src={product.image} alt={product.title} />
        <p>{product.description}</p>
{/* Creating add to cart function to send product data to cart page */}
        <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  )
}

export default ProductCard