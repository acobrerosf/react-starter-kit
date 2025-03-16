import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ColumnDef } from "@tanstack/react-table";
import { User } from '@/types';

import AppLayout from '@/layouts/app-layout';
import { DataTable } from '@/components/ui/data-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

const columns: ColumnDef<User>[] = [
    {
        header: 'Name',
        accessorKey: 'name',
    },
    {
        header: 'Email',
        accessorKey: 'email',
    },
    {
        header: 'Access Level',
        accessorKey: 'access_level.name',
    }
];

export default function UsersIndex({ users }: { users: User[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />

            <div className="container mx-auto p-5">
                <DataTable columns={columns} data={users} />
            </div>
        </AppLayout>
    );
}
