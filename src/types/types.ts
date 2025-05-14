// Initializing and sending each product as product array with constant variable values
export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
    quantity?: number;
}

//Setting rating variable as an object
interface Rating{
    rate: number;
    count: number
}

//Sending Category as type string for global access
export type Category = string;