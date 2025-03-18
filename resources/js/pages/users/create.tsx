import { NavItem, type BreadcrumbItem } from '@/types';
import { useLaravelReactI18n } from 'laravel-react-i18n';

import AppLayout from '@/layouts/app-layout';
import Heading from '@/components/heading';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import HeadingSmall from '@/components/heading-small';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

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

const sidebarNavItems: NavItem[] = [
    {
        title: 'Create account manually',
        href: '/users/create',
        icon: null,
    },
    {
        title: 'Invite user',
        href: '/users/invite',
        icon: null,
    },
];

export default function UsersCreate() {
    const currentPath = window.location.pathname;

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
                        variant="default"
                        onClick={() => router.visit(route('users.index'))}
                        className="cursor-pointer w-full sm:w-auto"
                    >
                        Back
                        <ArrowLeftIcon className="ml-2 h-4 w-4" />
                    </Button>
                </div>

                <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <aside className="w-full max-w-xl lg:w-48">
                        <nav className="flex flex-col space-y-1 space-x-0">
                            {sidebarNavItems.map((item) => (
                                <Button
                                    key={item.href}
                                    size="sm"
                                    variant="ghost"
                                    asChild
                                    className={cn('w-full justify-start', {
                                        'bg-muted': currentPath === item.href,
                                    })}
                                >
                                    <Link href={item.href} prefetch>
                                        {item.title}
                                    </Link>
                                </Button>
                            ))}
                        </nav>
                    </aside>

                    <Separator className="my-6 md:hidden" />

                    <div className="flex-1 md:max-w-2xl">
                        <section className="max-w-xl space-y-12">
                            <HeadingSmall
                                title="Create account manually"
                                description="Fill in the user details below to create a new account."
                            />
                        </section>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
