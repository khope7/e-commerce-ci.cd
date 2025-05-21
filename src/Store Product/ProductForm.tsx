// AddDataForm.tsx
import React, { useState } from 'react';
import { db } from '../lib/firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import type { Product2 } from '../types/types';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../api/api';
import type { Category } from '../types/types';

const AddProductForm = () => {
  const [item, setItem] = useState<Omit<Product2, 'quantity'>>({
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: ''
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)  => {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: ["id", "price"].includes(name) && !isNaN (Number(value)) ? parseInt(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'products'), item);
      alert('Data added!');
      setItem({
      id: 0,
      title: '',
      price: 0,
      description: '',
      category: ''
      });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

    const { data: categories } = useQuery({
      queryKey: ['categories'],
      queryFn: fetchCategories,
    });

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <p>Id: <input name="id" type="number" value={item.id} onChange={handleChange} placeholder="ID" /></p>
      <p>Product Name: <input name="title" value={item.title} onChange={handleChange} placeholder="Product Name" /></p>
      <p>Price: <input name="price" type="number" value={item.price} onChange={handleChange} placeholder="Price" /></p>
      <p>Product Description: <input name="description" value={item.description} onChange={handleChange} placeholder="Item Description" /></p>
        <select name="category" value={item.category} onChange={handleChange}>
          <option value=""> All Categories</option>
          {categories?.data.map((category: Category) => (
          <option value={category} key={category}>
                  {category}
          
          </option>
          ))}

        </select>
          <p>You have selected: {item.category}</p>


      <button type="submit">Add Product</button>
    </form>
    </div>
  );
};

export default AddProductForm;