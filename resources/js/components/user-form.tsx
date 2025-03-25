import { UserAccessLevel } from '@/types';
import { FormEventHandler } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface UserFormData {
    name: string;
    email: string;
    access_level_id: string;
}

interface UserFormProps {
    data: UserFormData;
    setData: (key: keyof UserFormData, value: string) => void;
    errors: Record<string, string>;
    processing: boolean;
    submitLabel: string;
    onSubmit: FormEventHandler;
    accessLevels: UserAccessLevel[];
}

export default function UserForm({
    data,
    setData,
    errors,
    processing,
    submitLabel,
    onSubmit,
    accessLevels,
}: UserFormProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
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
                            <SelectItem key={accessLevel.id} value={accessLevel.id.toString()}>
                                {accessLevel.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <InputError className="mt-2" message={errors.access_level_id} />
            </div>

            <div className="flex items-center gap-4">
                <Button disabled={processing}>{submitLabel}</Button>
            </div>
        </form>
    );
} 