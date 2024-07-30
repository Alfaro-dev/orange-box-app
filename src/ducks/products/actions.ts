import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosConfig';
import { Product } from './types';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (queryParams: string) => {
    const response = await api.get(`/products?${queryParams}`);
    return {
        data: response.data.data,
        pagination: response.data.pagination,
    };
});

export const fetchProduct = createAsyncThunk('products/fetchProduct', async (id: number) => {
    const response = await api.get(`/products/${id}`);
    return response.data.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (product: Product) => {
    const response = await api.post('/products', product);
    return response.data.data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, product }: { id: number, product: Product }) => {
    const response = await api.put(`/products/${id}`, product);
    return response.data.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id: number) => {
    await api.delete(`/products/${id}`);
    return id;
});