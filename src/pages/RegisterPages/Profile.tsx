import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../lib/firebase/firebaseConfig";
import { getDocs, where } from "firebase/firestore";
import { collection, query } from "firebase/firestore";
import type { Order } from "../../types/types";
import './Profile.css'


// Creating Component page to show for specific user information including name and shopping cart
export const Profile = () => {
  const [email, setEmail] = useState<string | null>("");
  const [displayName, setDisplayName ] = useState<string | null>("")
  const [prevOrder, setPrevOrder] = useState<Order[] | null>(null)

// Using auth and user to catch current active user information and shopping cart
  const auth = getAuth();
  const {user} = useAuth();


// Using UseEffect hook to Catch for user authorization and sets specific authorized user giving user email and displayname
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email)
        setDisplayName(user.displayName)
      } else {
        console.log("No user is signed in.");
      }
    })
  }, [])


// fetches data from specific users firestore database for shopping cart Order
  const fetchOrder = async () => {
    const q = query(collection(db, "orders"), where("displayName", "==", user?.displayName))
    try {
      const querySnapshot = await getDocs(q)
      const orders = querySnapshot.docs.map(doc => ({
        id:doc.id,
        ...doc.data()

      })) as Order[];
      setPrevOrder(orders)
    } catch (error){
      console.error('Error fetching orders', error)
      setPrevOrder([])
    }
  }

// only fetches if user exists
  useEffect(() => {
    if(user?.displayName){
      fetchOrder()
    }
  }, [user?.displayName])


//displaying all information specific to user login
  return (
    <div>
      <p>Hello, {displayName}! </p>
      <p>Your Email: {email}</p>
      <p>Your Shopping Cart:       </p>
      <div>
          {prevOrder?.map((item) => (
            <div key={item.id} className='cartItem'>
              <h3>{item.displayName}</h3>
              {item.cart?.map((orderItem) => (
                <div className="orderContainer">
                  <h4>Product Name: {orderItem.title}</h4>
                  <img src={orderItem.image} alt={orderItem.title} className='cartItemImage'/>
                  <p>Price: ${orderItem.price}</p>
                  <p>Quantity: {orderItem.quantity}</p>

                </div>
              ))}
              <p>Total: {item.total}</p>
              <p>Created At: {item.createdAt.toDate().toLocaleString()}</p>
            </div>
          ))}
      </div>
    </div>

  )
}

export default Profile