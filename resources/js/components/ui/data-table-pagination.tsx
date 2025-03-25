import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { router } from "@inertiajs/react"

interface DataTablePaginationProps {
    currentPage: number
    perPage: number
    total: number
    lastPage: number
    dataKey?: string
}

export function DataTablePagination({
    currentPage,
    perPage,
    total,
    lastPage,
    dataKey = 'data',
}: DataTablePaginationProps) {
    const handlePageChange = (page: number) => {
        router.visit(window.location.pathname, {
            data: {
                page,
                perPage,
            },
            preserveState: true,
            preserveScroll: true,
            only: [dataKey, 'currentPage', 'perPage', 'total', 'lastPage'],
        });
    };

    const handlePerPageChange = (value: string) => {
        router.visit(window.location.pathname, {
            data: {
                page: 1, // Reset to first page when changing items per page
                perPage: Number(value),
            },
            preserveState: true,
            preserveScroll: true,
            only: [dataKey, 'currentPage', 'perPage', 'total', 'lastPage'],
        });
    };

    // Calculate the range of items being displayed
    const from = total === 0 ? 0 : (currentPage - 1) * perPage + 1;
    const to = Math.min(currentPage * perPage, total);

    return (
        <div className="flex items-center justify-between px-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
                Showing <span className="font-medium">{from}</span> to{" "}
                <span className="font-medium">{to}</span> of{" "}
                <span className="font-medium">{total}</span> results
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                        value={`${perPage}`}
                        onValueChange={handlePerPageChange}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={perPage} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {currentPage} of {lastPage}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage <= 1}
                    >
                        <span className="sr-only">Go to first page</span>
                        <ChevronsLeft />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage <= 1}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= lastPage}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => handlePageChange(lastPage)}
                        disabled={currentPage >= lastPage}
                    >
                        <span className="sr-only">Go to last page</span>
                        <ChevronsRight />
                    </Button>
                </div>
            </div>
        </div>
    )
}
