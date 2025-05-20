// AddDataForm.tsx
import React, { useState } from 'react';
import { db } from '../lib/firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import type { Product2 } from '../types/types';

const AddProductForm = () => {
  const [item, setItem] = useState<Omit<Product2, 'quantity'>>({
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: ''
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: name === 'id' || name === 'price' ? parseInt(value) : value });
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

  const [selected, setSelected] = useState<string>("");

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
    item.category = selected;
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Id: <input name="id" type="number" value={item.id} onChange={handleChange} placeholder="ID" /></p>
      <p>Product Name: <input name="title" value={item.title} onChange={handleChange} placeholder="Product Name" /></p>
      <p>Price: <input name="price" type="number" value={item.price} onChange={handleChange} placeholder="Price" /></p>
      <p>Product Description: <input name="description" value={item.description} onChange={handleChange} placeholder="Item Description" /></p>
      <div>
        <label htmlFor="categories">Choose an item category: </label>
        <select id="categories" value={item.category} onChange={handleCategoryChange}>
          <option value="Categories">-- Categories --</option>
          <option value="electronics">electronics</option>
          <option value="jewelry">jewelry</option>
          <option value="men's clothing">men's clothing</option>
          <option value="women's clothing">women's clothing</option>
        </select>
        <p>You selected: {selected}</p>
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;