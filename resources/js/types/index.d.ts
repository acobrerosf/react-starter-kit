import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    menu: Record<string, NavItem[]>;
    locale: string;
    fallbackLocale: string;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface UserAccessLevel {
    id: number;
    name: string;
}

export interface User {
    id: number;
    access_level_id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    accessLevel: UserAccessLevel | null;
    [key: string]: unknown; // This allows for additional properties...
}
