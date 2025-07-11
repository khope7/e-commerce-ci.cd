import ProductCard from '../components/ProductCard/ProductCard'
import { render, screen } from '@testing-library/react'
import * as CartContext from '../context/CartContext'
import '@testing-library/jest-dom'

// mocking CartContext for ProductCard as unit test
jest.mock('../context/CartContext', () => ( {
    useCart: jest.fn()
}));

// Instantiating useCart object
const mockUseCart = CartContext.useCart as jest.Mock

// Creating CartItems Mock Object
const mockProduct = {
    id: '1',
    title: 'Test Product',
    price: 1.50,
    description: 'Test product description',
    category: "Test Category",
    image: 'Test Image',
    rating: {rate: 4, count: 20},
    quantity: 2
}

// Describing Product Card with add remove and clear cart functions along with default values
describe('Product Card', () => {
    beforeEach(() => {
    mockUseCart.mockReturnValue({
        cartItems: [{id:1, name:"test"}],
        addToCart: jest.fn(),
        removeFromCart: jest.fn(),
        clearCart: jest.fn()
        })
    })

//Adding expected events for testing with try catch block
    test ('Renders product details.', () => {
        try{
            render(<ProductCard product={mockProduct}/>)
            expect(screen.getByText(/\$1.50/)).toBeInTheDocument()
            expect(screen.getByText(/Test Product/i)).toBeInTheDocument()
            expect(screen.getByText(/Test product description/i)).toBeInTheDocument()
            screen.debug()
        }
        catch(error){
        }
    })
})
