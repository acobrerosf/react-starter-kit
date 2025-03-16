import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ColumnDef } from "@tanstack/react-table";
import { User } from '@/types';
import { useEffect, useState } from 'react';

import AppLayout from '@/layouts/app-layout';
import { DataTable } from '@/components/ui/data-table';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { DataTablePagination } from '@/components/ui/data-table-pagination';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

const columns: ColumnDef<User>[] = [
    {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" sortKey="name" dataKey="users" />
        ),
        accessorKey: 'name',
    },
    {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" sortKey="email" dataKey="users" />
        ),
        accessorKey: 'email',
    },
    {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Access Level" sortKey="access_level.name" dataKey="users" />
        ),
        accessorKey: 'access_level.name',
    }
];

export default function UsersIndex({ 
    users, currentPage, perPage, total, lastPage, sort, order, filter 
}: { 
    users: User[], 
    currentPage: number, 
    perPage: number, 
    total: number, 
    lastPage: number,
    sort?: string,
    order?: string,
    filter?: string
}) {
    const [currentFilter, setCurrentFilter] = useState(filter || '');
    const [debouncedFilter, setDebouncedFilter] = useState(filter || '');
    
    const handleFilterChange = (value: string) => {
        setCurrentFilter(value);
    };
    
    useEffect(() => {
        const timer = setTimeout(() => {
            // Only navigate if the filter has actually changed
            if (debouncedFilter !== currentFilter) {
                setDebouncedFilter(currentFilter);
                
                const params = {
                    filter: currentFilter,
                    page: 1, // Reset to first page when filtering
                    perPage: perPage || 10,
                    sort: sort || '',
                    order: order || 'asc'
                };
                
                // Remove empty parameters to avoid issues
                Object.keys(params).forEach(key => 
                    (params[key] === '' || params[key] === null || params[key] === undefined) && delete params[key]
                );
                
                router.get(route('users.index'), params, {
                    preserveState: true,
                    replace: true,
                    onSuccess: () => {
                        // Do nothing
                    },
                    onError: (errors) => {
                        // Do nothing
                    }
                });
            }
        }, 500);
        
        return () => clearTimeout(timer);
    }, [currentFilter]);

    const handleRowClick = (user: User) => {
        router.visit(route('users.edit', user.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />

            <div className="container mx-auto p-5">
                <DataTable 
                    columns={columns} 
                    data={users} 
                    onRowClick={handleRowClick}
                    onFilterChange={handleFilterChange}
                    filterPlaceholder="Search users..."
                    initialFilterValue={currentFilter}
                />

                <DataTablePagination 
                    currentPage={currentPage}
                    perPage={perPage}
                    total={total}
                    lastPage={lastPage}
                    dataKey="users"
                />
            </div>
        </AppLayout>
    );
}
