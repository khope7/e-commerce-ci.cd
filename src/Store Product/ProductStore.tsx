import { useState, useEffect } from 'react';
import { db } from '../lib/firebase/firebaseConfig';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { Product } from '../types/types';

type UpdatedProductData = {
  [key: string]: any
}


//displays on products on screen
const DisplayProduct = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newPrice, setNewPrice] = useState<number>(0);
  const [newDescription, setNewDescription] = useState<string>('');

//update method to rewrite product attributes
const updateProduct = async (productId: string, updatedData: UpdatedProductData) => {
      console.log(typeof productId)
    const productDoc = doc(db, 'products', productId);
    await updateDoc(productDoc, updatedData);
    setProduct((prevProduct) => prevProduct.map((product) => {
      if (product.id === productId) {
        const updatedProduct: Product = {
          ...product,
          ...updatedData,
          title: (updatedData.title ?? product.title),
          price: (updatedData.price ?? product.price),
          description: (updatedData.description ?? product.description),
        };
        return updatedProduct;
      }
      return product;
    }))
  };

//delete method to delete product from catelog
  const deleteProduct = async (productId: string) => {
      await deleteDoc(doc(db, 'products', productId))
      setProduct((prevProduct) => prevProduct.filter((product) => product.id !== productId))
    }

//useEffect function to show data after updates
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const dataArray = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      })) as Product[];
      setProduct(dataArray);
    };

    fetchData();
  }, []);



//displaying products field with CRUD methods
  return (
    <div>
      <h2>Product List</h2>
      {product.map((product) => (
        <div
          key={product.id}
          style={{ backgroundColor: 'white', border: '2px solid black', margin: '10px' }}
        >
          <div key={product.id}>
            <p>Product: {product.title}</p>
            <p>Price: {product.price}</p>
            <p>Description: {product.description}</p>
            <p>Category: {product.category}</p>
          </div>
          <input
            onChange={(e) => setNewTitle(e.target.value)}
            type="string"
            placeholder="Enter new product name:"
          />
          <button onClick={() => updateProduct(product.id, { title: newTitle })}>
            Update product name
          </button>
          <input
            onChange={(e) => setNewPrice(Number(e.target.value))}
            type="number"
            placeholder="Enter new product price:"
          />
          <button onClick={() => updateProduct(product.id, { price: newPrice })}>
            Update product price
          </button>
          <input
            onChange={(e) => setNewDescription(e.target.value)}
            type="string"
            placeholder="Enter new product description:"
          />
          <button onClick={() => updateProduct(product.id, { description: newDescription })}>
            Update product description
          </button>
          <button style={{ backgroundColor: 'crimson'}} onClick={() => deleteProduct(product.id)}>Delete Product</button>
        </div>
      ))}
    </div>
  );
};

export default DisplayProduct;