import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProvider } from '../ducks/providers/actions';
import { AppState, AppDispatch } from '../store';
import ProviderForm from '../components/ProviderForm';

const EditProviderPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const dispatch = useDispatch<AppDispatch>();

    const provider = useSelector((state: AppState) =>
        state.providers.providers.find((p) => p.id === Number(id))
    );

    useEffect(() => {
        if (id) {
            dispatch(fetchProvider(Number(id)));
        }
    }, [dispatch, id]);

    const handleFormSubmit = () => {
        router.push('/providers');
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Edit Provider</h1>
            {provider ? (
                <ProviderForm provider={provider} onSubmit={handleFormSubmit} />
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default EditProviderPage;