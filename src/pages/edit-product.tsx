import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../ducks/products/actions';
import { AppState, AppDispatch } from '../store';
import ProductForm from '../components/ProductForm';

const EditProductPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch<AppDispatch>();

    const product = useSelector((state: AppState) =>
        state.products.products.find((p) => p.id === Number(id))
    );

    useEffect(() => {
        if (id) {
            dispatch(fetchProduct(Number(id)));
        }
    }, [dispatch, id]);

    const handleFormSubmit = () => {
        router.push('/products');
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
            {product ? (
                <ProductForm product={product} onSubmit={handleFormSubmit} />
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default EditProductPage;