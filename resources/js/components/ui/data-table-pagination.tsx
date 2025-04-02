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
import { useLaravelReactI18n } from 'laravel-react-i18n';
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
    const { t } = useLaravelReactI18n();

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
                {t('datatables.showing')} <span className="font-medium">{from}</span> {t('datatables.to')}&nbsp;
                <span className="font-medium">{to}</span> {t('datatables.of')}&nbsp;
                <span className="font-medium">{total}</span> {t('datatables.results')}
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">{t('datatables.rows_per_page')}</p>
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
                    {t('datatables.page')} {currentPage} {t('datatables.of')} {lastPage}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage <= 1}
                    >
                        <span className="sr-only">{t('datatables.go_to_first_page')}</span>
                        <ChevronsLeft />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage <= 1}
                    >
                        <span className="sr-only">{t('datatables.go_to_previous_page')}</span>
                        <ChevronLeft />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= lastPage}
                    >
                        <span className="sr-only">{t('datatables.go_to_next_page')}</span>
                        <ChevronRight />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => handlePageChange(lastPage)}
                        disabled={currentPage >= lastPage}
                    >
                        <span className="sr-only">{t('datatables.go_to_last_page')}</span>
                        <ChevronsRight />
                    </Button>
                </div>
            </div>
        </div>
    )
}
