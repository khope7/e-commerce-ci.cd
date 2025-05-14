// Register.tsx
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../lib/firebase/firebaseConfig";
import styles from "../../styles/auth-styles";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [displayName, setDisplayName ] = useState<string>("")
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  
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
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div style={styles.form}>
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
        <button style={styles.legend} type="submit">Register</button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default Register;