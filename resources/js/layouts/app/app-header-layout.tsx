import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import { FlashMessage } from '@/components/flash-message';
import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';
import { usePage } from '@inertiajs/react';

export default function AppHeaderLayout({ children, breadcrumbs }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const { message } = usePage().props as { message?: { type: string; text: string } };

    return (
        <AppShell>
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent>
                {message && (
                    <div className="px-4 py-6 sm:px-6">
                        <FlashMessage type={message.type} text={message.text} />
                    </div>
                )}
                {children}
            </AppContent>
        </AppShell>
    );
}
