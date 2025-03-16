import { Column } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react"
import { router } from "@inertiajs/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
    sortKey?: string
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    sortKey,
    className,
}: DataTableColumnHeaderProps<TData, TValue>) {
    const searchParams = new URLSearchParams(window.location.search);
    const currentSort = searchParams.get('sort') || '';
    const currentOrder = searchParams.get('order') || '';
    
    const isSorted = sortKey && currentSort === sortKey;
    const sortOrder = isSorted ? currentOrder : null;

    const handleSort = (order: 'asc' | 'desc') => {
        if (!sortKey) return;
        
        router.visit(window.location.pathname, {
            data: {
                sort: sortKey,
                order: order,
                page: searchParams.get('page') || '1',
                perPage: searchParams.get('perPage') || '10',
            },
            preserveState: true,
            preserveScroll: true,
            only: ['users', 'currentPage', 'perPage', 'total', 'lastPage'],
        });
    };

    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>
    }

    return (
        <div className={cn("flex items-center space-x-2", className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                    >
                        <span>{title}</span>
                        {sortOrder === "desc" ? (
                            <ArrowDown className="ml-2 h-4 w-4" />
                        ) : sortOrder === "asc" ? (
                            <ArrowUp className="ml-2 h-4 w-4" />
                        ) : (
                            <ChevronsUpDown className="ml-2 h-4 w-4" />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => handleSort('asc')}>
                        <ArrowUp className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Asc
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSort('desc')}>
                        <ArrowDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Desc
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
