// Register.tsx
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../lib/firebase/firebaseConfig";
import { db } from "../../lib/firebase/firebaseConfig";
import { collection, addDoc } from 'firebase/firestore';
import styles from "../../styles/auth-styles";
import type { Product } from "../../types/types";

interface User {
  id?: string;
  name: string;
  age: number;
  userCart?: Product;
}

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [displayName, setDisplayName ] = useState<string>("")
  const [newAge, setNewAge ] = useState<string>("")
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Omit<User, 'id'>>({ name: '', age: 0 });

  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: displayName,
      });
      navigate('/profile')
      let str: string = newAge;
      let num: number = Number(str);

      data.name = displayName
      data.age = num

      await addDoc(collection(db, 'users'), data);
      alert('Data added!');
      setData({ name: '', age: 0 });
    } catch (error: any) {
      setError(error.message);
    }
    }
  
  return (
    <div>
      <form onSubmit={handleRegister}>
        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
          <input
          style={styles.input}
          type="text"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
        style={styles.input}
        type="number"
        placeholder="Age" 
        value={newAge}
        onChange={(e) => setNewAge(e.target.value)}
        />
        <button style={styles.legend} type="submit">Register</button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );

}

export default Register;