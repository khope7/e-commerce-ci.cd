import { createContext, useContext, useReducer } from "react";
import type { Product } from "../types/types";

//initalizing CartState as products array
interface CartState {
    items: Product[];
}

//parsing data from sessionStorage to readable format pulling cart or empty array if empty
const initialState: CartState = {
    items: JSON.parse(sessionStorage.getItem('cart') || '[]'),
}

//creating action methods add remove and clear and initalizing payload variables
type Action = 
    | { type: 'ADD_TO_CART'; payload: Product}
    | { type: 'REMOVE_FROM_CART'; payload: number}
    | { type: 'CLEAR_CART'; payload: [] }

//setting up reducer function to add remove and clear from cart
//starting cart reducer with State and Action variables, initializing as CartState
const cartReducer = (state: CartState, action: Action): CartState => {
//Introducing switch methods to define reducer action
    switch (action.type) {
        case 'ADD_TO_CART': {
            //finding item from add button as index
            const existingItemIndex = state.items.findIndex(
                (item) => item.id === action.payload.id
            );

            let updatedAddItems;

            if (existingItemIndex >= 0) {
                //Finding the item via index and increasing its quantity
                const updatedItem = {
                    ...state.items[existingItemIndex],
                    quantity: state.items[existingItemIndex].quantity + 1,
                };
                //setting updatedAdditems to be a spread version of cart items
                updatedAddItems = [...state.items];
                //Finding specific item via index and updating the quantity of that item to itself +1 after running updated item 
                updatedAddItems[existingItemIndex] = updatedItem;
                //Alerting user of the quantity change
                alert("Quantity updated.")
            } else {
                // Setting updatedAddItems as a spread version of cartState array and adding specific item from existing items databank
                updatedAddItems = [...state.items, { ...action.payload, quantity: 1}]
                alert("Item added to cart.")
            }
            //Setting item into storagae
            sessionStorage.setItem('cart', JSON.stringify(updatedAddItems));
            //returning items as updatedAddItems array
            return {items: updatedAddItems}
        }
        case 'REMOVE_FROM_CART': {
            // Takes id from button press and removes item associated with item.id
            const updatedRemoveItems = state.items.filter(
                (item: CartItem) => item.id !== action.payload
            );
            alert("Item removed.")
            sessionStorage.setItem('cart', JSON.stringify(updatedRemoveItems));
            return { items: updatedRemoveItems };
        }
        case 'CLEAR_CART':{
            //turns items into empty array upon button press, clearing cart and total
            alert("Cart cleared.")
            sessionStorage.setItem('cart', JSON.stringify([]));
            return { items: [] };
        }
        default:
            return state;
    }
}

// Innitializing action functions and function variable representation
type CartContextType = {
    cartItems: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
}

//Setting up CartContext as an undefined variable
const CartContext = createContext<CartContextType | undefined>(undefined);

//Setting up context provider as CartProvider
export const CartProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    //Setting up state as reducer and initializing state variable by passing in cartReducer and initialState into reducer function
    const [state, dispatch] = useReducer(cartReducer, initialState);

    //Creating add remove and clear dispatch methods to call each action
    const addToCart = (product: Product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product});
    }
    const removeFromCart = (productId: number) => {
        dispatch ({ type: 'REMOVE_FROM_CART', payload: productId });
    };
    const clearCart = () => {
        dispatch ({ type: 'CLEAR_CART', payload: [] })
    }

    //Returning CartContext Provider so CartContext can be used as a Global state from Provider wrapping, passing in action functions and items array
    return (
        <CartContext.Provider value={{cartItems: state.items, addToCart, removeFromCart, clearCart}}>
        {children}
        </CartContext.Provider>
    )
};

//Simplifying CartContext into useCart function for ease of reusability
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be within a CartProvider');
    }
    return context;
};