import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useCart } from '../../context/CartContext'
import { useAuth } from "../../context/AuthContext";
import { User } from "firebase/auth";
import { db } from "../../lib/firebase/firebaseConfig";
import { collection, query } from "firebase/firestore";


const auth = getAuth();
const {user} = useAuth();

export const Profile = () => {
  const [email, setEmail] = useState<string | null>("");
  const [displayName, setDisplayName ] = useState<string | null>("")
  const { cartItems } = useCart();


  onAuthStateChanged(auth, (user) => {
    if (user) {
      setEmail(user.email)
      setDisplayName(user.displayName)
    } else {
      console.log("No user is signed in.");
    }
  })

  const fetchOrder = async (displayName) => {
    const q = query(collection(db, "orders"), where("displayName", "==", user?.displayName))
  }

  return (
    <div>
      <p>Hello, {displayName}! </p>
      <p>Your Email: {email}</p>
      <p>Your Shopping Cart:       </p>
      <div>
          {cartItems.map((item) => (
            <div key={item.id} className='cartItem'>
              <h3>{item.title}</h3>
              <img src={item.image} alt={item.title} className='cartItemImage'/>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
      </div>
    </div>

  )
}

export default Profile