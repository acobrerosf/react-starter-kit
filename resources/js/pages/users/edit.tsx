import { UserAccessLevel, type BreadcrumbItem, User } from '@/types';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import AppLayout from '@/layouts/app-layout';
import Heading from '@/components/heading';
import { Head, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, TrashIcon } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import UserForm, { UserFormData } from '@/components/user-form';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FlashMessage } from '@/components/flash-message';

interface Props {
    user: User;
    accessLevels: UserAccessLevel[];
    showDeleteButton: boolean;
}

export default function UsersEdit({ user, accessLevels, showDeleteButton }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Users',
            href: '/users',
        },
        {
            title: 'Edit',
            href: `/users/${user.id}/edit`,
        },
    ];

    const { data, setData, errors, put, processing } = useForm<Required<UserFormData>>({
        name: user.name,
        email: user.email,
        access_level_id: user.access_level_id.toString(),
    });

    const { t } = useLaravelReactI18n();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('users.update', user.id), {
            preserveScroll: true,
        });
    };

    const handleDelete = () => {
        router.delete(route('users.destroy', user.id), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit User: ${user.name}`} />

            <div className="px-4 py-6 sm:px-6">
                {!showDeleteButton && (
                    <div className="mb-6">
                        <FlashMessage 
                            type="warning" 
                            text="You are editing your own account. If you change your email you will be logged out and will have to log in again. Deleting is not available." 
                            showTitle={false}
                        />
                    </div>
                )}
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <Heading
                        title={`Edit User: ${user.name}`}
                        description="Update user information."
                    />

                    <div className="flex flex-col sm:flex-row gap-2">
                        {showDeleteButton && (
                            <Button
                                variant="destructive"
                                onClick={() => setShowDeleteDialog(true)}
                                className="cursor-pointer w-full sm:w-auto"
                            >
                                Delete
                                <TrashIcon className="ml-2 h-4 w-4" />
                            </Button>
                        )}
                        <Button
                            variant="outline"
                            onClick={() => router.visit(route('users.index'))}
                            className="cursor-pointer w-full sm:w-auto"
                        >
                            Back
                            <ArrowLeftIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">
                        <UserForm
                            data={data}
                            setData={(key, value) => setData(key, value)}
                            errors={errors}
                            processing={processing}
                            submitLabel="Update"
                            onSubmit={submit}
                            accessLevels={accessLevels}
                        />
                    </section>
                </div>
            </div>

            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete User</DialogTitle>
                        <DialogDescription>
                            {t('Are you sure you want to delete this user?')}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button 
                            variant="outline" 
                            onClick={() => setShowDeleteDialog(false)}
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="destructive" 
                            onClick={() => {
                                handleDelete();
                                setShowDeleteDialog(false);
                            }}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
} 