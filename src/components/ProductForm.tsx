import React, { useState, FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { addProduct, updateProduct } from '../ducks/products/actions';
import { Product } from '../ducks/products/types';
import api from '../api/axiosConfig';

interface ProductFormProps {
    product?: Product;
    onSubmit: () => void;
}

interface Provider {
    id: number;
    name: string;
}

const ProductForm: FC<ProductFormProps> = ({ product = {} as Product, onSubmit }) => {
    const [name, setName] = useState(product.name || '');
    const [price, setPrice] = useState(product.price || 0);
    const [stock, setStock] = useState(product.stock || 0);
    const [description, setDescription] = useState(product.description || '');
    const [providerId, setProviderId] = useState(product.provider_id || 0);
    const [successMessage, setSuccessMessage] = useState('');
    const [providers, setProviders] = useState<Provider[]>([]);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        // Fetch providers when the component mounts
        api.get('/providers?per_page=-1').then(response => {
            setProviders(response.data.data);
        });
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const productData = {
            name,
            price,
            stock,
            description,
            provider_id: providerId,
        } as Product;

        if (product.id) {
            dispatch(updateProduct({ id: product.id, product: productData })).then(() => {
                setSuccessMessage('Product updated successfully');
                clearForm();
                onSubmit();
            });
        } else {
            dispatch(addProduct(productData)).then(() => {
                setSuccessMessage('Product added successfully');
                clearForm();
                onSubmit();
            });
        }
    };

    const clearForm = () => {
        setName('');
        setPrice(0);
        setStock(0);
        setDescription('');
        setProviderId(0);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded">
            <h1 className="text-2xl font-bold mb-6">Add Product</h1>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                    Price
                </label>
                <input
                    type="number"
                    id="price"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
                    Stock
                </label>
                <input
                    type="number"
                    id="stock"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description
                </label>
                <textarea
                    id="description"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                ></textarea>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="providerId">
                    Provider
                </label>
                <select
                    id="providerId"
                    value={providerId}
                    onChange={(e) => setProviderId(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                >
                    {providers.map(provider => (
                        <option key={provider.id} value={provider.id}>
                            {provider.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </div>
            {successMessage && (
                <div className="mt-4 p-2 bg-green-200 text-green-800 rounded">
                    {successMessage}
                </div>
            )}
        </form>
    );
};

export default ProductForm;