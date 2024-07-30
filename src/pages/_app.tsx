import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Link from 'next/link';
import store from '../store';
import '../app/globals.css';
import '../utils/fontAwesome'; 
import Head from 'next/head';
import Header from '@/components/Header';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;