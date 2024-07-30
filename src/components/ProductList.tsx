import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProduct } from '../ducks/products/actions';
import { AppState, AppDispatch } from '../store';
import { Product } from '../ducks/products/types';
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

const ProductList: React.FC = () => {
    const products = useSelector((state: AppState) => state.products.products);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter(); 

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [orderBy, setOrderBy] = useState('id');
    const [direction, setDirection] = useState<'asc' | 'desc'>('asc');
    const [filter, setFilter] = useState('');
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);

    useEffect(() => {
        const params = new URLSearchParams({
            page: page.toString(),
            per_page: limit.toString(),
            sort: orderBy,
            direction,
            search: filter,
        });

        dispatch(fetchProducts(params.toString())).then((response: any) => {
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

    const handleAddProduct = () => {
        router.push('/add-product');
    };

    const handleEditProduct = (id: number) => {
        router.push(`/edit-product?id=${id}`);
    };

    const handleDelete = (id: number) => {
        setProductIdToDelete(id);
        setIsDialogOpen(true);
    };

    const confirmDelete = () => {
        if (productIdToDelete !== null) {
            dispatch(deleteProduct(productIdToDelete));
            setIsDialogOpen(false);
            setProductIdToDelete(null);
        }
    };

    if (!Array.isArray(products)) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex space-x-6 justify-start mb-4">
                <h1 className="text-2xl font-bold">Products</h1>
                <button onClick={handleAddProduct} className="bg-green-500 text-white px-4 py-2 rounded flex items-center">
                    Add Product
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
                        <th className="py-2 px-4 border cursor-pointer" onClick={() => handleOrderByChange('price')}>
                            Price {orderBy === 'price' && (direction === 'asc' ? '▲' : '▼')}
                        </th>
                        <th className="py-2 px-4 border cursor-pointer" onClick={() => handleOrderByChange('description')}>
                            Description {orderBy === 'description' && (direction === 'asc' ? '▲' : '▼')}
                        </th>
                        <th className="py-2 px-4 border cursor-pointer" onClick={() => handleOrderByChange('stock')}>
                            Stock {orderBy === 'stock' && (direction === 'asc' ? '▲' : '▼')}
                        </th>
                        <th className="py-2 px-4 border cursor-pointer" onClick={() => handleOrderByChange('provider_name')}>
                            Provider {orderBy === 'provider_name' && (direction === 'asc' ? '▲' : '▼')}
                        </th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product: Product) => (
                        <tr key={product.id}>
                            <td className="py-2 px-4 border">{product.id}</td>
                            <td className="py-2 px-4 border">{product.name}</td>
                            <td className="py-2 px-4 border">${product.price}</td>
                            <td className="py-2 px-4 border">{product.description}</td>
                            <td className="py-2 px-4 border">{product.stock}</td>
                            <td className="py-2 px-4 border">{product.provider_name}</td>
                            <td className="py-2 px-4 border">
                                <button onClick={() => handleDelete(product.id)} className="text-red-500 mx-2">
                                    <FontAwesomeIcon icon="trash" />
                                </button>
                                <button onClick={() => handleEditProduct(product.id)} className="text-blue-500 mx-2">
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
                message="Are you sure you want to delete this product?"
            />
        </div>
    );
};

export default ProductList;