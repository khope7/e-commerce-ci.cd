import type { ReactNode } from "react"
import { createContext, useContext, useReducer } from "react";
import type { Product } from "../types/types"

//Initializing ProductAction types
type ProductAction =
    { type: 'SET_PRODUCTS'; payload: Product[] }
    | { type: 'SET_SELECTED_CATEGORY'; payload: string }

//Setting variables for ProductState
interface ProductState {
    products: Product[];
    selectedCategory: string;
}

//Initializing ProductStates initial state for initial default
const initialState: ProductState = {
    products: [],
    selectedCategory: '',
};

//Setting reducer function starting with state and action and calling ProductState
const productReducer = (
    state: ProductState,
    action: ProductAction
): ProductState => {
    //Setting action cases, set products and set selected catagory to show Products API and choose between categories based on selection
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload};
        case 'SET_SELECTED_CATEGORY':
            return {...state, selectedCategory: action.payload};
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
};

//Setting up ProductContext variables
interface ProductContextType {
    products: Product[];
    selectedCategory: string;
    dispatch: React.Dispatch<ProductAction>
}

//Setting up ProductContext with ProductContextType parameters
const ProductContext = createContext<ProductContextType>(
    {} as ProductContextType
);

// Creating ProductProvider as props
interface ProductProviderProps {
    children: ReactNode;
}

// Setting Product Context as ProductProvider and passing it as children props along with reducer function
export const ProductProvider: React.FC<ProductProviderProps> = 
({
    children,
}) => {
    //Sending productReducer (product array and categories array) into state with initalState passing as default value
    const [state, dispatch] = useReducer(productReducer, initialState);

    return (
        <ProductContext.Provider value = {{ ...state, dispatch }}>
            {children}
        </ProductContext.Provider>
    )
};

//Simplifying ProductContext into useProductContext function for ease of reusability
export const useProductContext = (): ProductContextType => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
};