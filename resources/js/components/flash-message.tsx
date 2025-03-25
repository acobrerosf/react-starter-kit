import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { ReactNode } from 'react';

interface FlashMessageProps {
    type: string;
    text: string;
    className?: string;
    showTitle?: boolean;
}

export function FlashMessage({ type, text, className = '', showTitle = true }: FlashMessageProps) {
    const getAlertIcon = (type: string): ReactNode => {
        switch (type) {
            case 'success':
                return <CheckCircle className="h-4 w-4" />;
            case 'danger':
                return <AlertCircle className="h-4 w-4" />;
            case 'warning':
                return <AlertTriangle className="h-4 w-4" />;
            case 'info':
            default:
                return <Info className="h-4 w-4" />;
        }
    };

    const getAlertVariant = (type: string): string => {
        switch (type) {
            case 'success':
                return 'success';
            case 'danger':
                return 'destructive';
            case 'warning':
                return 'warning';
            case 'info':
            default:
                return 'default';
        }
    };

    return (
        <Alert variant={getAlertVariant(type)} className={className}>
            {getAlertIcon(type)}
            {showTitle ? (
                <AlertTitle className="capitalize">{text}</AlertTitle>
            ) : (
                <AlertDescription>{text}</AlertDescription>
            )}
        </Alert>
    );
} 