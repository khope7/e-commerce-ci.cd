import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import { ProductProvider } from "./context/ProductContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { CartProvider } from "./context/CartContext"
import { AuthProvider } from "./context/AuthContext"
import CartPage from "./pages/CartPage/CartPage"
import Profile from "./pages/RegisterPages/Profile"
import Login from "./pages/RegisterPages/Login"
import Logout from "./pages/RegisterPages/Logout"
import Register from "./pages/RegisterPages/Register"
import NavBar from "./components/NavBar/NavBar"


//Setting up Query Client for Query Client provider for axios API pull
function App() {
  const queryClient = new QueryClient()

  return (

    //Wrapping project with Query Client Provider for axios API pul
    <QueryClientProvider client={queryClient}>
      {/* Wrapping project with Product provider for global access to products array */}
      <AuthProvider>
        <ProductProvider>
          {/* Wrapping project with Cart provider for global access to products array */}
          <CartProvider>
            {/* Wrapping project with BrowserRouter for user Navigation */}
            <NavBar/>
            {/* Wrapping project with Navbar */}
              <BrowserRouter>
              {/* Wrapping each page in routes */}
              <Routes>
                {/* Using route for each page navigation */}
                <Route path="/" element={<HomePage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/register" element={<Register/>}/>
              </Routes>
              </BrowserRouter>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

// Sending app to main for project run
export default App
