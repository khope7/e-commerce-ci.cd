import React from 'react'
import type { Category, Product } from '../../types/types'
import { useEffect } from 'react'
import { useProductContext } from '../../context/ProductContext'
import ProductCard from '../../components/ProductCard/ProductCard'
import { fetchProducts, fetchCategories } from '../../api/api'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { db } from '../../lib/firebase/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore';
import './HomePage.css'

//Creating HomePage function to show for original product API pull
const HomePage: React.FC = () => {
    const {products, selectedCategory, dispatch} = useProductContext()
    const [fireStoreProduct, setFireStoreProduct] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const dataArray = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      })) as Product[];
      setFireStoreProduct(dataArray);
    };

    fetchData();
  }, []);

//Setting product fetch for axios useQuery method
    const {data: productsData } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });

//Setting useEffect to dispatch products from API pull
    useEffect(() => {
        if(productsData){
            dispatch({type: 'SET_PRODUCTS', payload: productsData.data})
        }
    }, [productsData, dispatch])

//Setting product category fetch for axios useQuery method
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });

//Creating method to only show products based on category
    const getFilteredProducts = () => {
        if(selectedCategory){
            return products.filter((product: Product) => product.category === selectedCategory);
        }
        return products;
    }

//Setting variable filteredProducts to getFilteredProducts function
    const filteredProducts = getFilteredProducts()

    return (
    <div>
        <h1 className='products'>Products API</h1>
{/* Creating Select menu drop down that allows user to specify product categories by dispatching reducer function to show speficic items using set selected category */}
        <select onChange={e => dispatch({type:"SET_SELECTED_CATEGORY", payload: e.target.value})}
            value={selectedCategory}
            >
            <option value=""> All Categories</option>
            {categories?.data.map((category: Category) => (
//Setting API categories as drop down options
                <option value={category} key={category}>
                    {category}
                </option>
            ))}
        </select>
{/* Creating Clear filter button to remove selected category parameters and show all Products */}
        <button onClick={() => dispatch({type: "SET_SELECTED_CATEGORY", payload: ""})}>Clear Filter</button>
        <div className='container'>
{/* Sending all products to Product Card */}
            {[...filteredProducts, ...fireStoreProduct].map((product:Product) => (
                <ProductCard product={product} key={(product.id)} />

            ))}
        </div>
    </div>
  )
}

// Sending component out as HomePage
export default HomePage