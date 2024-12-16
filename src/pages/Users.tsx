import React, { useState } from 'react';
import { Table } from '../components/common/Table';
import { Pagination } from '../components/common/Pagination';
import { useTranslation } from 'react-i18next';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const mockUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? 'Admin' : 'User',
  status: i % 4 === 0 ? 'inactive' : 'active',
}));

const ITEMS_PER_PAGE = 10;

export function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();

  const columns = [
    { header: t('users.columns.id'), accessor: 'id' as keyof User },
    { header: t('users.columns.name'), accessor: 'name' as keyof User },
    { header: t('users.columns.email'), accessor: 'email' as keyof User },
    { header: t('users.columns.role'), accessor: 'role' as keyof User },
    {
      header: t('users.columns.status'),
      accessor: 'status' as keyof User,
      render: (value: string) => (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            value === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {t(`users.status.${value}`)}
        </span>
      ),
    },
  ];

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = mockUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(mockUsers.length / ITEMS_PER_PAGE);

  return (
    <div className="p-6">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('users.title')}</h1>
      </div>

      <div className="bg-white shadow rounded-lg">
        <Table columns={columns} data={paginatedUsers} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}