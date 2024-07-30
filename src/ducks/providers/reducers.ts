// src/ducks/providers/reducer.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Provider, ProviderState } from './types';
import { fetchProviders, addProvider, updateProvider, deleteProvider } from './actions';

const initialState: ProviderState = {
  providers: [],
};

const providersSlice = createSlice({
  name: 'providers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProviders.fulfilled, (state, action: PayloadAction<{ data: Provider[], pagination: any }>) => {
      state.providers = action.payload.data;
    });

    builder.addCase(addProvider.fulfilled, (state, action: PayloadAction<Provider>) => {
      state.providers.push(action.payload);
    });

    builder.addCase(updateProvider.fulfilled, (state, action: PayloadAction<Provider>) => {
      const index = state.providers.findIndex((provider) => provider.id === action.payload.id);
      if (index !== -1) {
        state.providers[index] = action.payload;
      }
    });

    builder.addCase(deleteProvider.fulfilled, (state, action: PayloadAction<number>) => {
      state.providers = state.providers.filter((provider) => provider.id !== action.payload);
    });
  },
});

export default providersSlice.reducer;