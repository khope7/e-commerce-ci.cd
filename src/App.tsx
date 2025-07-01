/*
Implementing Test-Driven Development (TDD) in React:
Unit Testing:
Write at least two unit tests (separate components)
Test component rendering, state changes, and user interactions.
Ensure tests are focused, independent, and deterministic.

Integration Testing:
Conduct an integration test to ensure the Cart gets updated when adding a product 
Simulate user interactions and assert resulting changes using React Testing Library.

Implement a Continuous Integration (CI) flow of build and test in GitHub Actions:
Create a main.yml file within the .github/workflows directory to define the CI workflow.
Configure the workflow to automatically trigger code pushes to the main branch.
Use GitHub Actions to build the project and run unit tests using Jest.
Ensure that the workflow fails if any tests fail, preventing the deployment of faulty code.

Implement a Continuous Deployment (CD) flow in GitHub Actions with deployment to Vercel:
Extend the existing GitHub Actions workflow to include a deployment stage.
Define deployment jobs to deploy the application to Vercel.
Ensure that the deployment only occurs after the CI tests have passed successfully.
*/

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
import AddUserForm from "./Store User/UserForm"
import DisplayUser from "./Store User/UserStore"
import AddProductForm from "./Store Product/ProductForm"
import DisplayProduct from "./Store Product/ProductStore"
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
                <Route path="/createUser" element={<AddUserForm/>}/>
                <Route path="/showUsers" element={<DisplayUser/>}/>
                <Route path="/createProduct" element={<AddProductForm/>}/>
                <Route path="/showProducts" element={<DisplayProduct/>}/>
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
