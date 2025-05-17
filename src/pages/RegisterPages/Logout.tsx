import { signOut } from "firebase/auth"
import { auth } from "../../lib/firebase/firebaseConfig"

const control = ()   => {
  try {
      signOut(auth);
  } catch (err: any) {
    console.error("Logout error:", err.message);
  }

  return (
      <div>
        <button onClick={control} >Logout</button>
      </div>
  )
}

export default control