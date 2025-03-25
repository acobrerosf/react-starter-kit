import { UserAccessLevel, type BreadcrumbItem } from '@/types';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import AppLayout from '@/layouts/app-layout';
import Heading from '@/components/heading';
import { Head, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import { FormEventHandler } from 'react';
import UserForm, { UserFormData } from '@/components/user-form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
    {
        title: 'Create',
        href: '/users/create',
    },
];

export default function UsersCreate({ accessLevels }: { accessLevels: UserAccessLevel[] }) {
    const { data, setData, errors, post, reset, processing } = useForm<Required<UserFormData>>({
        name: '',
        email: '',
        access_level_id: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('users.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create User" />

            <div className="px-4 py-6 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <Heading
                        title="Create User"
                        description="Add a new user to the system."
                    />

                    <Button
                        variant="outline"
                        onClick={() => router.visit(route('users.index'))}
                        className="cursor-pointer w-full sm:w-auto"
                    >
                        Back
                        <ArrowLeftIcon className="ml-2 h-4 w-4" />
                    </Button>
                </div>

                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">
                        <UserForm
                            data={data}
                            setData={(key, value) => setData(key, value)}
                            errors={errors}
                            processing={processing}
                            submitLabel="Create"
                            onSubmit={submit}
                            accessLevels={accessLevels}
                        />
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
