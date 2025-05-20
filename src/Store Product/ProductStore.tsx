import { useState, useEffect } from 'react';
import { db } from '../lib/firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import type { Product2 } from '../types/types';


const DisplayProduct = () => {
  const [product, setProduct] = useState<Product2[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const dataArray = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
      })) as Product2[];
      setProduct(dataArray);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      {product.map((product) => (
        <div key={product.id}>
          <p>Id: {product.id}</p>
          <p>Product: {product.title}</p>
          <p>Price: {product.price}</p>
          <p>Description: {product.description}</p>
          <p>Category: {product.category}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayProduct;