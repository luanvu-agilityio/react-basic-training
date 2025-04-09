import React, { useState, useEffect, useMemo } from 'react';
import Button from '@components/common/Button';
import Text from '../Text';
import SelectBox from '@components/common/SelectBox';
import { paginationOptions } from '@constants/pagination-options';
import './index.css';
import FormField from '../FormField';

/**
 * A Pagination component
 *
 * Features:
 * - Dynamic page number generation with ellipsis
 * - Items per page selection
 * - First/Previous/Next/Last navigation
 * - Go to specific page functionality
 */
interface PaginationProps {
  totalItems: number;
  /** Callback function when page or items per page changes */
  onPageChange: (page: number, itemsPerPage: number) => void;
  initialPage?: number;
  initialItemsPerPage?: number;
}

const Pagination = ({
  totalItems,
  onPageChange,
  initialPage = 1,
  initialItemsPerPage = 5,
}: PaginationProps) => {
  const effectiveItemsPerPage = initialItemsPerPage ?? 5;
  const effectiveTotalPages = Math.max(1, Math.ceil(totalItems / effectiveItemsPerPage));
  const effectiveInitialPage = Math.min(initialPage ?? 1, effectiveTotalPages);

  // Then use in useState:
  // State management for pagination
  const [currentPage, setCurrentPage] = useState(effectiveInitialPage);
  const [itemsPerPage, setItemsPerPage] = useState(effectiveItemsPerPage);
  const [totalPages, setTotalPages] = useState(effectiveTotalPages);
  const [goToPage, setGoToPage] = useState(effectiveInitialPage.toString());

  /**
   * Effect to update total pages when items count or items per page changes
   * Adjusts current page if it exceeds the new total pages
   */
  useEffect(() => {
    const newTotalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    setTotalPages(newTotalPages);
    // Adjust the current page if it exceed the new total Pages (given the current items per page)
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
      setGoToPage(newTotalPages.toString());
    }
  }, [totalItems, itemsPerPage, currentPage]);

  /**
   * Effect to notify parent component of pagination changes
   */
  useEffect(() => {
    onPageChange(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage, onPageChange]);

  const handleFirstPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(1);
      setGoToPage('1');
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      setGoToPage(newPage.toString());
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      setGoToPage(newPage.toString());
    }
  };

  const handleLastPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(totalPages);
      setGoToPage(totalPages.toString());
    }
  };

  /**
   * Handlers for pagination controls
   */
  // Updated to accept a direct number value from SelectBox
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    setGoToPage('1');
  };

  /**
   * Handlers for "Go to page" functionality
   */
  const handleGoToInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, '');
    setGoToPage(value);
  };

  const handleGoToKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGoToPage();
    }
  };

  const handleGoToPage = () => {
    const page = parseInt(goToPage);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    } else {
      setGoToPage(currentPage.toString());
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      setGoToPage(page.toString());
    }
  };

  /**
   * Memoized page numbers to prevent unnecessary re-renders
   * Shows first page, last page, and a window of pages around current page
   * Adds ellipsis when there are gaps in the sequence
   */
  const createPageButton = (page: number) => (
    <Button
      variant="pagination"
      key={`page-${page}`}
      className={`btn-number ${page === currentPage ? 'active' : ''}`}
      onClick={() => handlePageClick(page)}
    >
      {page}
    </Button>
  );

  const createEllipsis = (key: string) => (
    <span key={key} className="pagination-ellipsis">
      ...
    </span>
  );

  const createPlaceholder = (index: number) => (
    <span key={`placeholder-${index}`} className="pagination-placeholder" aria-hidden="true">
      {/* Empty placeholder for layout stability */}
    </span>
  );

  const pageNumbers = useMemo(() => {
    const maxPagesToShow = 3;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const elements = [];

    if (startPage > 1) {
      elements.push(createPageButton(1));
      if (startPage > 2) {
        elements.push(createEllipsis('ellipsis-1'));
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      elements.push(createPageButton(i));
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        elements.push(createEllipsis('ellipsis-2'));
      }
      elements.push(createPageButton(totalPages));
    }

    if (elements.length < 3 && totalPages > 0) {
      const placeholdersNeeded = 3 - elements.length;
      for (let i = 0; i < placeholdersNeeded; i++) {
        elements.push(createPlaceholder(i));
      }
    }

    return elements;
  }, [currentPage, totalPages]);

  // Early return an empty placeholder of proper height if there are no items
  if (totalItems === 0) {
    return <div className="pagination" aria-hidden="true" style={{ minHeight: '6rem' }}></div>;
  }

  return (
    <div className="pagination">
      <div className="pagination-controls">
        {/* Items per page */}
        <div className="items-per-page">
          <Text text="Show" className="pagination-label" as="span" />
          <SelectBox
            id="itemsPerPage"
            className="pagination-select"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            options={paginationOptions}
          />
          <Text text="students" className="pagination-label" as="span" />
        </div>

        {/* Page numbers and navigation buttons */}
        <div className="pagination-btns">
          <Button
            variant="pagination"
            className=" btn-first"
            aria-label="First page"
            disabled={currentPage === 1}
            onClick={handleFirstPage}
          >
            <Text text="&laquo;&laquo;" aria-hidden="true" as="span" />
          </Button>
          <Button
            variant="pagination"
            className="btn-prev"
            aria-label="Previous page"
            disabled={currentPage === 1}
            onClick={handlePrevPage}
          >
            <Text text="&laquo;" aria-hidden="true" as="span" />
          </Button>

          <div className="page-indicator">
            <div className="page-numbers">{pageNumbers}</div>
          </div>

          <Button
            variant="pagination"
            className="btn-next"
            aria-label="Next page"
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            <Text text="&raquo;" aria-hidden="true" as="span" />
          </Button>
          <Button
            variant="pagination"
            className="btn-last"
            aria-label="Last page"
            disabled={currentPage === totalPages}
            onClick={handleLastPage}
          >
            <Text text="&raquo;&raquo;" aria-hidden="true" as="span" />
          </Button>
        </div>

        {/* Go to page input */}
        <div className="goto-btn">
          <Text text="Go to page" className="pagination-label" as="span" />
          <FormField
            name="gotoPage"
            type="number"
            min="1"
            max={totalPages}
            className="pagination-input"
            value={goToPage}
            onInputChange={handleGoToInputChange}
            onKeyDown={handleGoToKeyPress}
            style={{ width: '4rem', padding: '0' }}
          />
          <Button variant="pagination" className="btn-go" onClick={handleGoToPage}>
            Go
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Pagination;
