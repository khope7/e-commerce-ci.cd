import { useState } from "react";
import { createContext, useContext } from "react";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../lib/firebase/firebaseConfig";

// Introducing User state as user
interface AuthState{
    user: User | null,
    setUser: (user: User) => void
}

// Creating user context
const AuthContext = createContext<AuthState>({
    user: null,
    setUser: (user: User) => {}
})

// Creating children function for AuthContext Provider global state
export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext