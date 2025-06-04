Hello! Here are the tasks for Module2 Assignment1

### Updates
For knowledge check, original project has been updated to include User authentication/register/login/logout, product creation, and user cart allocation

## components/lib/firebase
Creating initial firebase pull/firebase initiation

## components/context/AuthContext
Created Authorization component to Log and identify User authentication

## components/pages/RegisterPages
Created Login/Logout/Profile/Register and Profile.css components for user Authentication methods with Profile showing Current Users Orders made

## components/Store Product
Created add product component for user product creation and allocation to firebase

## components/Store User
Created add user component for simplified user creation and allocation to User database seperate from User authentication

## components/styles/auth-styles.ts
Created stylization for register component page to test object css functionality

### env
Hid firebase authentication information, please DM for .env information

## API.ts
Uses Axios method to call products catelog using React Query(Homepage.tsx, APP.tsx)

## components/NavBar
NavBar folder consisting of Navbar stylelizing and Navigation functionality to be used globally

## components/Context/CartContext
Uses State Management to add remove and clear cart items to cart and context API with sessionstorage to send data to Shopping Cart page

## components/Context/ProductContext
Uses State Management to set products and select product categories from the homepage

## components/pages/CartPage
Has css stylelizing and Cartpage functionality, using useCart method to pass in Cart Context API

## components/pages/HomePage
Has css stylelizing and HomePage functionality, using useProductContext method to pass in Products Context API

## components/redux/store
Component for storing redux counter methods

## components/redux/counterSlice
Component using redux CreateSlice method to increment and decrement user Shopping Cart orders while disallowing decrement below 0

## components/redux/counter
Component carrying redux toolkit functionality allowing for user to press increment decrement and calculate total buttons integrating CartContext data manipulation based on user imput

## types/types
Initializes all product variables along with Rating object

## App
Wrapping QueryClientProvider, ProductProvider, CartProvider, BrowserRouter, and Routes to HomePage and CartPage for data integration and gloabal access along with Webpage navigation functionality

## Main
Used to call App and run project

### Additional
Unsure how to clear current errors, error handling implemented within contexts, Project currently works on run

## Installations Needed
npm install
npm install axios
npm install react-bootstrap
npm install react-router-dom
npm install @reduxjs/toolkit react-redux
npm i @smastrom/react-rating
npm i @tanstack/react-query