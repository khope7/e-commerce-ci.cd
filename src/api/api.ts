import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Product, Category } from "../types/types";

//Using axios method to pull API product catelog
const apiClient = axios.create({
    baseURL: "https://fakestoreapi.com"
})

export const fetchProducts = (): Promise<AxiosResponse<Product[]>> =>
    apiClient.get<Product[]>("/products")

export const fetchCategories = (): Promise<AxiosResponse<Category[]>> =>
    apiClient.get<Category[]>("/products/categories")