import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartPage from '../pages/CartPage/CartPage';
import { CartProvider } from '../context/CartContext';
import ProductCard from '../components/ProductCard/ProductCard';
import { Provider } from 'react-redux';
import { store } from '../components/redux/store';

jest.mock('@smastrom/react-rating', () => ({
    Rating: () => <div data-testid='rating-component'/>  
}))

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

describe('Cart Integration Test', () => {
    beforeEach(() => {
    sessionStorage.clear()
    jest.spyOn(window, 'alert').mockImplementation(() => {})
    })

    test ('Should update the cart when a product is added', () => {
        try{
            render(
                <Provider store={store}>
                    <CartProvider>
                        <ProductCard product={mockcartItems}/>
                        <CartPage/>
                    </CartProvider>
                </Provider>
            )
        } catch (e){
            console.error('render fail', e)
            throw e
        }


        const addToCartButton = screen.getByText(/Add to Cart/i)
        fireEvent.click(addToCartButton)
        const cartArea = screen.getByText(/Current shopping cart/i).closest('div')
        expect(within(cartArea!).getByText(/Test product/i)).toBeInTheDocument()
        expect(within(cartArea!).getByText(/Quantity: 1/i)).toBeInTheDocument()
    })
})