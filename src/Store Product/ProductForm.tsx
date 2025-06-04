// AddDataForm.tsx
import React, { useState } from 'react';
import { db } from '../lib/firebase/firebaseConfig';
import { collection, addDoc, updateDoc } from 'firebase/firestore';
import type { Product } from '../types/types';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../api/api';
import type { Category } from '../types/types';

//Creating shopping cart item users themselves can create and sending to firestore database
const AddProductForm = () => {
  const [item, setItem] = useState<Omit<Product, 'quantity'>>({
    id: '',
    title: '',
    price: 0,
    description: '',
    rating: {rate: 0, count: 0},
    image: '',
    category: ''
    });
    
//Adds item to user cart
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)  => {
    const { name, value } = e.target;
    if (name === 'rating') {
      setItem((prev) => ({ ...prev, rating: {
        ...prev.rating, rate: parseInt(value), count: prev.rating.count += 1
      }, 
      }))
    } else {
      setItem((prev) => ({ ...prev, [name]: ["id", "price"].includes(name) && !isNaN (Number(value)) ? parseInt(value) : value }));
    }

    
  };

//Creates item and resets fields for additional item creation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'products'), {...item, id: ''});
      await updateDoc(docRef, {id: docRef.id})
      alert('Data added!');
      setItem({
      id: '',
      title: '',
      price: 0,
      description: '',
      rating: {rate: 0, count: 0},
      image: '',
      category: ''
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  // fetching categories for drop down select
    const { data: categories } = useQuery({
      queryKey: ['categories'],
      queryFn: fetchCategories,
    });

  //population fields on screen
  return (
    <div>
    <form onSubmit={handleSubmit}>
      <p>Product Name: <input name="title" value={item.title} onChange={handleChange} placeholder="Product Name" /></p>
      <p>Price: <input name="price" type="number" value={item.price} onChange={handleChange} placeholder="Price" /></p>
      <p>Product Description: <input name="description" value={item.description} onChange={handleChange} placeholder="Item Description" /></p>
      <p>Product Image: <input name="image" value={item.image} onChange={handleChange} placeholder="Product Image" /></p>
        <select name="category" value={item.category} onChange={handleChange}>
          <option value=""> All Categories</option>
          {categories?.data.map((category: Category) => (
          <option value={category} key={category}>
                  {category}
          
          </option>
          ))}

        </select>
          <p>You have selected: {item.category}</p>

          <select name="rating" value={item.rating.rate} onChange={handleChange}>
          {[0,1,2,3,4,5].map((rate: number) => (
          <option value={rate} key={rate}>
                  {rate}
          </option>
          ))}

        </select>
          <p>You have selected: {item.rating.rate}</p>


      <button type="submit">Add Product</button>
    </form>
    </div>
  );
};

export default AddProductForm;