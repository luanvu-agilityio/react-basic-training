import { useState, useEffect } from 'react';

interface PaginationOptions {
  initialPage?: number;
  initialItemsPerPage?: number;
}

interface PaginationResult<T> {
  currentPage: number;
  itemsPerPage: number;
  paginatedItems: T[];
  totalPages: number;
  handlePageChange: (page: number, perPage: number) => void;
}

/**
 * Custom hook for handling pagination logic
 *
 * @param items - The array of items to paginate
 * @param options - Optional configuration for pagination
 * @returns Pagination state and handlers
 */
export function usePagination<T>(items: T[], options?: PaginationOptions): PaginationResult<T> {
  // Initialize pagination state
  const [currentPage, setCurrentPage] = useState(options?.initialPage ?? 1);
  const [itemsPerPage, setItemsPerPage] = useState(options?.initialItemsPerPage ?? 5);

  // Calculate paginated items
  const [paginatedItems, setPaginatedItems] = useState<T[]>([]);

  // Update paginated items when source items or pagination settings change
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedItems(items.slice(startIndex, endIndex));
  }, [items, currentPage, itemsPerPage]);

  // Handle page change
  const handlePageChange = (page: number, perPage: number) => {
    setCurrentPage(page);
    setItemsPerPage(perPage);
  };

  // Calculate total pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return {
    currentPage,
    itemsPerPage,
    paginatedItems,
    totalPages,
    handlePageChange,
  };
}
