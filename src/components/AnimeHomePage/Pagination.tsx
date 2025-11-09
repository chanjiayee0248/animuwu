interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    // If there's nowhere to paginate, don't render anything
    if (totalPages <= 1) return null;

    // Helper: build a compact list of page items (numbers or 'ellipsis')
    const getPageItems = (): (number | 'ellipsis')[] => {
        // If small number of pages, just list them all
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const pages = new Set<number>();
        pages.add(1);
        pages.add(totalPages);

        // Add current page and two neighbors on each side
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
            if (i >= 1 && i <= totalPages) pages.add(i);
        }

        const sorted = Array.from(pages).sort((a, b) => a - b);
        const result: (number | 'ellipsis')[] = [];
        let prev = 0;

        for (const p of sorted) {
            if (prev && p - prev > 1) {
                // If gap of exactly one, include that page; otherwise insert ellipsis
                if (p - prev === 2) {
                    result.push(prev + 1);
                } else {
                    result.push('ellipsis');
                }
            }
            result.push(p);
            prev = p;
        }

        return result;
    };

    const clampAndChange = (page: number) => {
        const clamped = Math.max(1, Math.min(totalPages, Math.floor(page)));
        if (clamped !== currentPage) onPageChange(clamped);
    };

    const pageItems = getPageItems();

    return (
        // Container
        <nav aria-label="Pagination" className="flex items-center space-x-2">

            <button
                type="button"
                onClick={() => clampAndChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Go to previous page"
                className={`px-3 py-1 rounded border ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow'}`}
            >
                Prev
            </button>

            {/* Page number buttons / ellipses */}
            <div className="flex items-center space-x-1">
                {pageItems.map((item, idx) =>
                    item === 'ellipsis' ? (
                        <span key={`ell-${idx}`} className="px-2">…</span>
                    ) : (
                        <button
                            key={`p-${item}`}
                            type="button"
                            onClick={() => clampAndChange(item)}
                            aria-current={item === currentPage ? 'page' : undefined}
                            aria-label={item === currentPage ? `Current page, ${item}` : `Go to page ${item}`}
                            className={`px-3 py-1 rounded border ${item === currentPage ? 'bg-sky-600 text-white' : 'hover:shadow'}`}
                        >
                            {item}
                        </button>
                    )
                )}
            </div>

            <button
                type="button"
                onClick={() => clampAndChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Go to next page"
                className={`px-3 py-1 rounded border ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:shadow'}`}
            >
                Next
            </button>

        </nav>
    );
}

export default Pagination;