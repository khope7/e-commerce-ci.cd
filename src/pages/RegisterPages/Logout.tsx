import { signOut } from "firebase/auth"
import { auth } from "../../lib/firebase/firebaseConfig"

// Using built in signOut method to return user state to default/null
const control = ()   => {

  const onSignOut = () => {
    try {
        signOut(auth);
    } catch (err: any) {
      console.error("Logout error:", err.message);
    }
  }


  return (
      <div>
        <button onClick={onSignOut} >Logging Out!</button>
      </div>
  )
}

export default control