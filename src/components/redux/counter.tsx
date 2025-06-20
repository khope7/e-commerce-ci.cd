import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { increment, decrement } from '../redux/counterSlice';
import { useCart } from '../../context/CartContext'
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase/firebaseConfig';


//Implementing redux method to introduce increment, decrement and count methods to adjust for shopping cart orders
const Counter = () => {
   const count = useSelector((state: RootState) => state.counter.count);
   const dispatch = useDispatch<AppDispatch>();
   const { cartItems } = useCart();
   const [tcount, setTCount] = useState(0);
   const {user} = useAuth()

//Pulling shopping cart item total pricing from CartContext global method
  let total = 0;
  for (const item of cartItems) {
    total += item.price * item.quantity;
  }


//Combining Shopping Cart Item price and redux count to show for users total price
   const totalCount = async () => {
      setTCount(total * count)
      const completeTotal = total * count
      const orderData = {
         displayName: user?.displayName,
         cart: cartItems,
         total: completeTotal,
         createdAt: Timestamp.now()
      }
      try {

// Adding shopping cart total and time stamp to user data base within firestore
         const docRef = await addDoc(collection(db, "orders"), orderData)
         alert(`Order added to ${user?.displayName}'s account.`)
      }
      catch(error) {
         console.error('Error saving order: ', error)
      }
   };

   return (
      <div>
         <h1>Number of Orders: {count}</h1>
         <button onClick={() => dispatch(increment())}>Increment</button>
         <button onClick={() => dispatch(decrement())}>Decrement</button>
         <button onClick={() => totalCount()}> Calculate Total</button>
         <h1>Final Total: ${tcount} </h1>
      </div>
   );
};

export default Counter;