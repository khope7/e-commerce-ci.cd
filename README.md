Hello! Here are the tasks for Module1 Assignment2

# Overview
Project has two pages with the first consisting of products pulled from fakestore api from the api.ts file that take products and arrange them based on product category as well as initalize cart functionality from button press

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