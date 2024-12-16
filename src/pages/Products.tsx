import React, { useState } from 'react';
import { Table } from '../components/common/Table';
import { Pagination } from '../components/common/Pagination';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  status: string;
}

const mockProducts: Product[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: Math.floor(Math.random() * 1000) + 10,
  stock: Math.floor(Math.random() * 100),
  status: i % 3 === 0 ? 'out-of-stock' : i % 3 === 1 ? 'low-stock' : 'in-stock',
}));

const ITEMS_PER_PAGE = 10;

export function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();

  const columns = [
    { header: t('products.columns.id'), accessor: 'id' as keyof Product },
    { header: t('products.columns.name'), accessor: 'name' as keyof Product },
    {
      header: t('products.columns.price'),
      accessor: 'price' as keyof Product,
      render: (value: number) => `$${value.toFixed(2)}`,
    },
    { header: t('products.columns.stock'), accessor: 'stock' as keyof Product },
    {
      header: t('products.columns.status'),
      accessor: 'status' as keyof Product,
      render: (value: string) => (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            value === 'in-stock'
              ? 'bg-green-100 text-green-800'
              : value === 'low-stock'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {t(`products.status.${value}`)}
        </span>
      ),
    },
  ];

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = mockProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(mockProducts.length / ITEMS_PER_PAGE);

  return (
    <div className="p-6">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('products.title')}</h1>
        <Link
          to="/products/new"
          className="btn-primary inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium"
        >
          <Plus className="h-5 w-5 mr-2" />
          {t('products.addNew')}
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg">
        <Table columns={columns} data={paginatedProducts} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}