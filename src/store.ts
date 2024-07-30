import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './ducks/products/reducers';
import providersReducer from './ducks/providers/reducers';

const store = configureStore({
  reducer: {
    products: productsReducer,
    providers: providersReducer
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;