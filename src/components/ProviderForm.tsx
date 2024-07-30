import React, { useState, FC } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { addProvider, updateProvider } from '../ducks/providers/actions';
import { Provider } from '../ducks/providers/types';

interface ProviderFormProps {
    provider?: Provider;
    onSubmit: () => void;
}

const ProviderForm: FC<ProviderFormProps> = ({ provider = {} as Provider, onSubmit }) => {
    const [name, setName] = useState(provider.name || '');
    const [address, setAddress] = useState(provider.address || '');
    const [phone, setPhone] = useState(provider.phone || '');
    const [description, setDescription] = useState(provider.description || '');
    const [successMessage, setSuccessMessage] = useState('');

    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const providerData = {
            name,
            address,
            phone,
            description,
        } as Provider;

        if (provider.id) {
            dispatch(updateProvider({ id: provider.id, provider: providerData })).then(() => {
                setSuccessMessage('Provider updated successfully');
                clearForm();
                onSubmit();
            });
        } else {
            dispatch(addProvider(providerData)).then(() => {
                setSuccessMessage('Provider added successfully');
                clearForm();
                onSubmit();
            });
        }
    };

    const clearForm = () => {
        setName('');
        setAddress('');
        setPhone('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded">
            <h1 className="text-2xl font-bold mb-6">Add Provider</h1>

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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                    Address
                </label>
                <input
                    type="text"
                    id="address"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                    Phone
                </label>
                <input
                    type="text"
                    id="phone"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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

export default ProviderForm;