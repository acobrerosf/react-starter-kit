import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { useLaravelReactI18n } from 'laravel-react-i18n';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    onRowClick?: (row: TData) => void;
    className?: string;
    onFilterChange?: (value: string) => void;
    filterPlaceholder?: string;
    initialFilterValue?: string;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    onRowClick,
    className,
    onFilterChange,
    filterPlaceholder = "Search...",
    initialFilterValue = "",
}: DataTableProps<TData, TValue>) {
    const [filterValue, setFilterValue] = useState(initialFilterValue);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    const { t } = useLaravelReactI18n();

    useEffect(() => {
        if (onFilterChange) {
            const handler = setTimeout(() => {
                onFilterChange(filterValue);
            }, 300); // Debounce filter changes

            return () => clearTimeout(handler);
        }
    }, [filterValue, onFilterChange]);

    return (
        <div className={className || ''}>
            {onFilterChange && (
                <div className="flex items-center pb-4">
                    <Input
                        placeholder={filterPlaceholder}
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        className="max-w-sm"
                    />
                </div>
            )}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    onClick={() => onRowClick && onRowClick(row.original)}
                                    className={onRowClick ? 'cursor-pointer hover:bg-muted' : ''}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    {t('datatables.no_results')}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}