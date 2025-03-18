import { UserAccessLevel, type BreadcrumbItem } from '@/types';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import AppLayout from '@/layouts/app-layout';
import Heading from '@/components/heading';
import { Head, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import { FormEventHandler, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

interface UserForm {
    access_level_id: string;
    name: string;
    email: string;
}

export default function UsersCreate({ accessLevels }: { accessLevels: UserAccessLevel[] }) {

    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm<Required<UserForm>>({
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
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>

                                <Input
                                    id="name"
                                    className="mt-1 block w-full"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    autoComplete="name"
                                    placeholder="Name"
                                />

                                <InputError className="mt-2" message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>

                                <Input
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    autoComplete="username"
                                    placeholder="Email address"
                                />

                                <InputError className="mt-2" message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="access_level_id">Access Level</Label>

                                <Select
                                    value={data.access_level_id}
                                    onValueChange={(value) => setData('access_level_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an access level" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {accessLevels.map((accessLevel) => (
                                            <SelectItem key={accessLevel.id} value={accessLevel.id.toString()}>{accessLevel.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <InputError className="mt-2" message={errors.access_level_id} />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button disabled={processing}>Create</Button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}
