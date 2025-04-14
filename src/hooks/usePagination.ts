import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface PaginationOptions {
  initialPage?: number;
  initialItemsPerPage?: number;
  updateURL?: boolean;
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
  const navigate = useNavigate();
  const location = useLocation();
  // Initialize pagination state
  const [currentPage, setCurrentPage] = useState(options?.initialPage ?? 1);
  const [itemsPerPage, setItemsPerPage] = useState(options?.initialItemsPerPage ?? 5);
  const updateURL = options?.updateURL ?? true;

  // Calculate paginated items
  const [paginatedItems, setPaginatedItems] = useState<T[]>([]);

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  // Update paginated items when source items or pagination settings change
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedItems(items.slice(startIndex, endIndex));
  }, [items, currentPage, itemsPerPage]);

  // Update URL when pagination changes if updateURL is true
  useEffect(() => {
    if (updateURL) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('page', currentPage.toString());
      searchParams.set('perPage', itemsPerPage.toString());

      // Update URL without refreshing the page
      navigate(`${location.pathname}?${searchParams.toString()}`);
    }
  }, [currentPage, itemsPerPage, location.pathname, navigate, updateURL]);

  // Handle page change
  const handlePageChange = (page: number, perPage: number) => {
    const validPage = Math.max(1, Math.min(page, Math.ceil(items.length / perPage)));
    setCurrentPage(validPage);
    setItemsPerPage(perPage);
  };

  return {
    currentPage,
    itemsPerPage,
    paginatedItems,
    totalPages,
    handlePageChange,
  };
}
