import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProviders, deleteProvider } from '../ducks/providers/actions';
import { AppState, AppDispatch } from '../store';
import { Provider } from '../ducks/providers/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const ConfirmationDialog = dynamic(() => import('../components/ConfirmationDialog'), { ssr: false });

interface PaginationLinks {
    next_page_url: string | null;
    prev_page_url: string | null;
}

interface Pagination {
    per_page: number;
    from: number;
    to: number;
    total: number;
    links: PaginationLinks;
}

const ProviderList: React.FC = () => {
    const providers = useSelector((state: AppState) => state.providers.providers);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [orderBy, setOrderBy] = useState('id');
    const [direction, setDirection] = useState<'asc' | 'desc'>('asc');
    const [filter, setFilter] = useState('');
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [providerIdToDelete, setProviderIdToDelete] = useState<number | null>(null);

    useEffect(() => {
        const params = new URLSearchParams({
            page: page.toString(),
            per_page: limit.toString(),
            sort: orderBy,
            direction,
            search: filter,
        });

        dispatch(fetchProviders(params.toString())).then((response: any) => {
            setPagination(response.payload.pagination);
        });
    }, [dispatch, page, limit, orderBy, direction, filter]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLimit(parseInt(e.target.value));
    };

    const handleOrderByChange = (field: string) => {
        if (orderBy === field) {
            setDirection(direction === 'asc' ? 'desc' : 'asc');
        } else {
            setOrderBy(field);
            setDirection('asc');
        }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    const handleAddProvider = () => {
        router.push('/add-provider');
    };

    const handleEditProvider = (id: number) => {
        router.push(`/edit-provider?id=${id}`);
    };

    const handleDelete = (id: number) => {
        setProviderIdToDelete(id);
        setIsDialogOpen(true);
    };

    const confirmDelete = () => {
        if (providerIdToDelete !== null) {
            dispatch(deleteProvider(providerIdToDelete));
            setIsDialogOpen(false);
            setProviderIdToDelete(null);
        }
    };

    if (!Array.isArray(providers)) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex space-x-6 justify-start mb-4">
                <h1 className="text-2xl font-bold">Providers</h1>
                <button onClick={handleAddProvider} className="bg-green-500 text-white px-4 py-2 rounded flex items-center">
                    Add Provider
                </button>
            </div>
            <div className="flex justify-between mb-4">
                <div className="justify-start">
                    <label className="flex items-center">
                        <span className="mr-2">Filter:</span>
                        <input type="text" value={filter} onChange={handleFilterChange} className="p-2 border rounded" />
                    </label>
                </div>
                <div className="flex justify-end space-x-6">
                    <label className="flex items-center">
                        <span className="mr-2">Limit:</span>
                        <select value={limit} onChange={handleLimitChange} className="p-2 border rounded">
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                    </label>
                </div>
            </div>
            <table className="min-w-full border">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border cursor-pointer" onClick={() => handleOrderByChange('id')}>
                            ID {orderBy === 'id' && (direction === 'asc' ? '▲' : '▼')}
                        </th>
                        <th className="py-2 px-4 border cursor-pointer" onClick={() => handleOrderByChange('name')}>
                            Name {orderBy === 'name' && (direction === 'asc' ? '▲' : '▼')}
                        </th>
                        <th className="py-2 px-4 border cursor-pointer" onClick={() => handleOrderByChange('address')}>
                            Address {orderBy === 'address' && (direction === 'asc' ? '▲' : '▼')}
                        </th>
                        <th className="py-2 px-4 border cursor-pointer" onClick={() => handleOrderByChange('phone')}>
                            Phone {orderBy === 'phone' && (direction === 'asc' ? '▲' : '▼')}
                        </th>
                        <th className="py-2 px-4 border cursor-pointer" onClick={() => handleOrderByChange('description')}>
                            Description {orderBy === 'description' && (direction === 'asc' ? '▲' : '▼')}
                        </th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {providers.map((provider: Provider) => (
                        <tr key={provider.id}>
                            <td className="py-2 px-4 border">{provider.id}</td>
                            <td className="py-2 px-4 border">{provider.name}</td>
                            <td className="py-2 px-4 border">{provider.address}</td>
                            <td className="py-2 px-4 border">{provider.phone}</td>
                            <td className="py-2 px-4 border">{provider.description}</td>
                            <td className="py-2 px-4 border">
                                <button onClick={() => handleDelete(provider.id)} className="text-red-500 mx-2">
                                    <FontAwesomeIcon icon="trash" />
                                </button>
                                <button onClick={() => handleEditProvider(provider.id)} className="text-blue-500 mx-2">
                                    <FontAwesomeIcon icon="edit" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-end items-center mt-4">
                {pagination && (
                    <>
                        <span className="mr-4">
                            Showing {pagination.from} to {pagination.to} of {pagination.total} entries
                        </span>
                        <div
                            className="inline-flex rounded-md shadow transition duration-150 ease-in-out hover:bg-blue-500 focus:bg-blue-500 focus:outline-none focus:ring-0 active:bg-blue-700"
                            role="group"
                        >
                            <button
                                disabled={!pagination.links.prev_page_url}
                                onClick={() => handlePageChange(page - 1)}
                                className="inline-block rounded-l bg-blue-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-blue-500 focus:bg-blue-500 focus:outline-none focus:ring-0 active:bg-blue-700 disabled:bg-gray-300"
                                data-twe-ripple-init
                            >
                                <FontAwesomeIcon icon="arrow-left" />
                            </button>
                            <button
                                disabled={!pagination.links.next_page_url}
                                onClick={() => handlePageChange(page + 1)}
                                className="inline-block rounded-r bg-blue-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-blue-500 focus:bg-blue-500 focus:outline-none focus:ring-0 active:bg-blue-700 disabled:bg-gray-300"
                                data-twe-ripple-init
                            >
                                <FontAwesomeIcon icon="arrow-right" />
                            </button>
                        </div>
                    </>
                )}
            </div>
            <ConfirmationDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={confirmDelete}
                message="Are you sure you want to delete this provider?"
            />
        </div>
    );
};

export default ProviderList;