import { useState, useEffect, useMemo, ChangeEvent, KeyboardEvent } from 'react';
import styled from 'styled-components';
import Button from '@components/common/Button';
import Text from '../Text';
import SelectBox from '@components/common/SelectBox';
import { paginationOptions } from '@constants/pagination-options';
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

// Styled Components
const PaginationContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  min-height: 6rem;
`;

const PaginationControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  min-height: 3.5rem;

  @media screen and (max-width: 992px) {
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    gap: 1rem;
    min-height: 12rem;
  }
`;

const ItemsPerPage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 2.5rem;

  @media (max-width: 768px) {
    justify-self: center;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;

const PaginationLabel = styled(Text)`
  color: var(--black-color);
  font-size: var(--font-size-12);
`;

const StyledSelectBox = styled(SelectBox)`
  min-width: 5rem;
  width: 5rem;
  height: 2.5rem;
  padding: 0.375rem 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  font-size: var(--font-size-10);
  box-sizing: border-box;

  & option {
    font-size: var(--font-size-12);
  }
`;

const PaginationButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  height: 2.5rem;

  @media (max-width: 768px) {
    justify-self: center;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  @media (max-width: 480px) {
    flex-wrap: nowrap;
    justify-content: center;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    -webkit-overflow-scrolling: touch;
  }
`;

const PageIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: 12rem;
  height: 2.5rem;
  margin: 0 0.5rem;
  text-align: center;

  @media (max-width: 768px) {
    min-width: 10rem;
    justify-content: center;
  }

  @media (max-width: 480px) {
    min-width: 8rem;
  }
`;

const PageNumbers = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 0 0.5rem;
  min-width: 10rem;
  justify-content: center;
  height: 2.5rem;

  @media (max-width: 768px) {
    margin: 0 0.25rem;
  }
`;

const GoToButton = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0;
  height: 2.5rem;

  @media (max-width: 768px) {
    justify-self: center;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
  }
`;

const StyledFormField = styled(FormField)`
  width: 4rem;
  height: 2.5rem;
  padding: 0;
  border: 1px solid #ced4da;
  border-radius: 4px;
  text-align: center;
  font-size: var(--font-size-10);
  font-weight: var(--font-weight-regular);
  box-sizing: border-box;
`;

const PaginationButton = styled(Button)`
  &.active {
    background-color: var(--semi-light-blue-color);
    color: white;
    border-color: var(--semi-light-blue-color);
    font-weight: var(--font-weight-semibold);
  }
`;

const PaginationEllipsis = styled.span`
  color: #6c757d;
  font-size: var(--font-size-10);
  width: 1.5rem;
  text-align: center;
  user-select: none;
  display: inline-block;
`;

const PlaceholderSpan = styled.span`
  /* Empty placeholder for layout stability */
`;

const Pagination = ({
  totalItems,
  onPageChange,
  initialPage = 1,
  initialItemsPerPage = 5,
}: PaginationProps) => {
  const effectiveItemsPerPage = initialItemsPerPage ?? 5;
  const effectiveItemsPerPage = initialItemsPerPage ?? 5;
  const effectiveTotalPages = Math.max(1, Math.ceil(totalItems / effectiveItemsPerPage));
  const effectiveInitialPage = Math.min(initialPage ?? 1, effectiveTotalPages);
  const effectiveInitialPage = Math.min(initialPage ?? 1, effectiveTotalPages);

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
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    setGoToPage('1');
  };

  /**
   * Handlers for "Go to page" functionality
   */
  const handleGoToInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  const handleGoToInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, '');
    setGoToPage(value);
  };

  const handleGoToKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
  const handleGoToKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
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
    <PaginationButton
      variant="pagination"
      key={`page-${page}`}
      className={`btn-number ${page === currentPage ? 'active' : ''}`}
      className={`btn-number ${page === currentPage ? 'active' : ''}`}
      onClick={() => handlePageClick(page)}
    >
      {page}
    </PaginationButton>
  );

  const createEllipsis = (key: string) => <PaginationEllipsis key={key}>...</PaginationEllipsis>;

  const createPlaceholder = (index: number) => (
    <PlaceholderSpan key={`placeholder-${index}`} aria-hidden="true">
      {/* Empty placeholder for layout stability */}
    </PlaceholderSpan>
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
    return <PaginationContainer aria-hidden="true"></PaginationContainer>;
  }

  return (
    <PaginationContainer>
      <PaginationControls>
        {/* Items per page */}
        <ItemsPerPage>
          <PaginationLabel as="span">Show</PaginationLabel>
          <StyledSelectBox
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            options={paginationOptions}
          />
          <PaginationLabel as="span">students</PaginationLabel>
        </ItemsPerPage>

        {/* Page numbers and navigation buttons */}
        <PaginationButtons>
          <PaginationButton
            variant="pagination"
            className="btn-first"
            aria-label="First page"
            disabled={currentPage === 1}
            onClick={handleFirstPage}
          >
            <Text text="&laquo;&laquo;" aria-hidden="true" as="span" />
          </PaginationButton>
          <PaginationButton
            variant="pagination"
            className="btn-prev"
            aria-label="Previous page"
            disabled={currentPage === 1}
            onClick={handlePrevPage}
          >
            <Text text="&laquo;" aria-hidden="true" as="span" />
          </PaginationButton>

          <PageIndicator>
            <PageNumbers>{pageNumbers}</PageNumbers>
          </PageIndicator>

          <PaginationButton
            variant="pagination"
            className="btn-next"
            aria-label="Next page"
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            <Text text="&raquo;" aria-hidden="true" as="span" />
          </PaginationButton>
          <PaginationButton
            variant="pagination"
            className="btn-last"
            aria-label="Last page"
            disabled={currentPage === totalPages}
            onClick={handleLastPage}
          >
            <Text text="&raquo;&raquo;" aria-hidden="true" as="span" />
          </PaginationButton>
        </PaginationButtons>

        {/* Go to page input */}
        <GoToButton>
          <PaginationLabel as="span" style={{ display: 'flex', alignItems: 'center' }}>
            Go to page
          </PaginationLabel>
          <StyledFormField
            name="gotoPage"
            type="number"
            min="1"
            max={totalPages}
            value={goToPage}
            onInputChange={handleGoToInputChange}
            onKeyDown={handleGoToKeyPress}
          />
          <PaginationButton variant="pagination" className="btn-go" onClick={handleGoToPage}>
            Go
          </PaginationButton>
        </GoToButton>
      </PaginationControls>
    </PaginationContainer>
  );
};

export default Pagination;
