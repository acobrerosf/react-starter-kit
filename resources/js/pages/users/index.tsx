import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ColumnDef } from "@tanstack/react-table";
import { User } from '@/types';

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
            <DataTableColumnHeader column={column} title="Name" sortKey="name" />
        ),
        accessorKey: 'name',
    },
    {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" sortKey="email" />
        ),
        accessorKey: 'email',
    },
    {
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Access Level" sortKey="access_level.name" />
        ),
        accessorKey: 'access_level.name',
    }
];

export default function UsersIndex({ 
    users, currentPage, perPage, total, lastPage, sort, order 
}: { 
    users: User[], 
    currentPage: number, 
    perPage: number, 
    total: number, 
    lastPage: number,
    sort?: string,
    order?: string
}) {
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
                />

                <DataTablePagination 
                    currentPage={currentPage}
                    perPage={perPage}
                    total={total}
                    lastPage={lastPage}
                />
            </div>
        </AppLayout>
    );
}
