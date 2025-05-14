import { useCart } from '../../context/CartContext'
import Counter from '../../components/redux/counter'
import './CartPage.css'

//Passing in cartItems, remove, and clear functions under useCart function
const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();


//Increasing total by the price and quantity of all items in cart
  let total = 0;
  for (const item of cartItems) {
    total += item.price * item.quantity;
  }

  return (
    <div>
      <h1 className='shoppingCart'> Products Shopping Cart</h1>
          <h2>Current Shopping Cart:</h2>
          {/* Creating clearCart function to clearCart from CartContext dispatch action through useCart import */}
        <div>
          <button onClick={() => clearCart()}>Clear Cart</button>
        </div>
        {/* Mapping all selected "add to cart" items into CartPage pulling products from CartItems array*/}
          {cartItems.map((item) => (
            <div key={item.id} className='cartItem'>
              <h3>{item.title}</h3>
              <img src={item.image} alt={item.title} className='cartItemImage'/>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              {/* Setting removeFromCart button to remove specific item from cart */}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}

      {/* Using total method to show current total price for all items in cart */}.
      <h4>Total: ${total}</h4>
      <Counter/>
    </div>
  )
}

// Sending component as CartPage
export default CartPage