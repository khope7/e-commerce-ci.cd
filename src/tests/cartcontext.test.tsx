import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartPage from '../pages/CartPage/CartPage';
// import Counter from '../components/redux/counter';
// import { Timestamp } from 'firebase/firestore';
// import type { Product } from '../types/types';
import { CartProvider } from '../context/CartContext';
import ProductCard from '../components/ProductCard/ProductCard';
import { Provider } from 'react-redux';
import { store } from '../components/redux/store';

// jest.mock('../pages/CartPage/CartPage', () => ( {
//     useCart: jest.fn()
// }));

// const mockCartPage = CartPage.useCart as jest.Mock

const mockcartItems = {
    id: '1',
    title: 'Test Product',
    price: 1.50,
    description: 'Test product description',
    category: "Test Category",
    image: 'Test Image',
    rating: {rate: 4, count: 20},
    quantity: 2
}

// const mockTotalCount = {
//     displayName: "Test Name",
//     cart: mockcartItems,
//     total: 5.00,
//     createdAt: Timestamp.now()
//     clearCart: jest.fn()
//     removeFromCart: jest.fn(),
// }

describe('Cart Integration Test', () => {
    beforeEach(() => {
    // mockCartPage.mockReturnValue({
    //     cartItems: [{id:1, name:"test"}],
    //     })
    sessionStorage.clear()
    })

    test ('Should update the cart when a product is added', () => {
        render(
            <Provider store={store}>
                <CartProvider>
                    <ProductCard product={mockcartItems}/>
                    <CartPage/>
                </CartProvider>
            </Provider>
        )
        const addToCart = screen.getByText(/Add to Cart/i)
        fireEvent.click(addToCart)
    })
})