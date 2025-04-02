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
    const { t } = useLaravelReactI18n();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('pages.users.index.title'),
            href: route('users.index'),
        },
        {
            title: t('pages.users.edit.title'),
            href: route('users.edit', user.id),
        },
    ];

    const { data, setData, errors, put, processing } = useForm<Required<UserFormData>>({
        name: user.name,
        email: user.email,
        access_level_id: user.access_level_id.toString(),
    });

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
            <Head title={t('pages.users.edit.title')} />

            <div className="px-4 py-6 sm:px-6">
                {!showDeleteButton && (
                    <div className="mb-6">
                        <FlashMessage 
                            type="warning" 
                            text={t('pages.users.edit.cannot_delete_own_account')} 
                            showTitle={false}
                        />
                    </div>
                )}
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <Heading
                        title={t('pages.users.edit.title')}
                        description={t('pages.users.edit.description')}
                    />

                    <div className="flex flex-col sm:flex-row gap-2">
                        {showDeleteButton && (
                            <Button
                                variant="destructive"
                                onClick={() => setShowDeleteDialog(true)}
                                className="cursor-pointer w-full sm:w-auto"
                            >
                                {t('pages.users.edit.delete')}
                                <TrashIcon className="ml-2 h-4 w-4" />
                            </Button>
                        )}
                        <Button
                            variant="outline"
                            onClick={() => router.visit(route('users.index'))}
                            className="cursor-pointer w-full sm:w-auto"
                        >
                            {t('pages.users.edit.back')}
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
                            submitLabel={t('pages.users.edit.submit')}
                            onSubmit={submit}
                            accessLevels={accessLevels}
                        />
                    </section>
                </div>
            </div>

            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{t('pages.users.edit.delete_title')}</DialogTitle>
                        <DialogDescription>
                            {t('pages.users.edit.delete_confirmation')}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button 
                            variant="outline" 
                            onClick={() => setShowDeleteDialog(false)}
                        >
                            {t('pages.users.edit.cancel')}
                        </Button>
                        <Button 
                            variant="destructive" 
                            onClick={() => {
                                handleDelete();
                                setShowDeleteDialog(false);
                            }}
                        >
                            {t('pages.users.edit.delete')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
} 