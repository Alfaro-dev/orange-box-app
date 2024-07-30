import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosConfig';
import { Provider } from './types';

export const fetchProviders = createAsyncThunk('providers/fetchProviders', async (queryParams: string) => {
    const response = await api.get(`/providers?${queryParams}`);
    return {
        data: response.data.data,
        pagination: response.data.pagination,
    };
});

export const fetchProvider = createAsyncThunk('providers/fetchProvider', async (id: number) => {
    const response = await api.get(`/providers/${id}`);
    return response.data.data;
});

export const addProvider = createAsyncThunk('providers/addProvider', async (provider: Provider) => {
    const response = await api.post('/providers', provider);
    return response.data.data;
});

export const updateProvider = createAsyncThunk('providers/updateProvider', async ({ id, provider }: { id: number, provider: Provider }) => {
    const response = await api.put(`/providers/${id}`, provider);
    return response.data.data;
});

export const deleteProvider = createAsyncThunk('providers/deleteProvider', async (id: number) => {
    await api.delete(`/providers/${id}`);
    return id;
});