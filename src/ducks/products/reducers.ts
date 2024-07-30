import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductState } from './types';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from './actions';

const initialState: ProductState = {
    products: [],
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<{ data: Product[], pagination: any }>) => {
            state.products = action.payload.data;
        });

        builder.addCase(addProduct.fulfilled, (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);
        });
        
        builder.addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
            const index = state.products.findIndex((product) => product.id === action.payload.id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        });
        
        builder.addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
            state.products = state.products.filter((product) => product.id !== action.payload);
        });
    },
});

export default productsSlice.reducer;