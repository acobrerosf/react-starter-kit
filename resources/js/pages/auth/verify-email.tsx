// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { useLaravelReactI18n } from 'laravel-react-i18n';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const { t } = useLaravelReactI18n();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <AuthLayout
            title={t('pages.auth.verify_email.title')}
            description={t('pages.auth.verify_email.description')}
        >
            <Head title={t('pages.auth.verify_email.title')} />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {t('pages.auth.verify_email.link_sent')}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6 text-center">
                <Button disabled={processing} variant="secondary">
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    {t('pages.auth.verify_email.resend')}
                </Button>

                <TextLink href={route('logout')} method="post" className="mx-auto block text-sm">
                    {t('pages.auth.verify_email.logout')}
                </TextLink>
            </form>
        </AuthLayout>
    );
}
