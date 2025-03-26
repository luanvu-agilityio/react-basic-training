import React, { useState, useEffect } from 'react';
import Button from '../buttons/Button';
import './Pagination.css';

interface PaginationProps {
  totalItems: number;
  onPageChange: (page: number, itemsPerPage: number) => void;
  initialPage?: number;
  initialItemsPerPage?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  onPageChange,
  initialPage = 1,
  initialItemsPerPage = 5,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [totalPages, setTotalPages] = useState(Math.max(1, Math.ceil(totalItems / itemsPerPage)));
  const [goToPage, setGoToPage] = useState(currentPage.toString());

  useEffect(() => {
    const newTotalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    setTotalPages(newTotalPages);
    // Adjust the current page if it exceed the new total Pages (given the current items per page)
    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    }
  }, [totalItems, itemsPerPage, currentPage]);

  useEffect(() => {
    onPageChange(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleFirstPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(totalPages);
    }
  };

  const handleGoToInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoToPage(e.target.value);
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
    }
  };

  //Render page numbers with ellipses
  const renderPageNumber = () => {
    const maxPagesToShow = 3;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust start page if end page at maximum
    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const pageNumbers = [];
    // Always show the first page

    if (startPage > 1) {
      pageNumbers.push(
        <Button
          key="page-1"
          className={`pagination__button pagination__button--number ${
            1 === currentPage ? 'pagination__button--active' : ''
          }`}
          onClick={() => handlePageClick(1)}
        >
          1
        </Button>,
      );

      // Add ellipses if there is a gap
      if (startPage > 2) {
        pageNumbers.push(
          <span key="ellipsis-1" className="pagination__ellipsis">
            ...
          </span>,
        );
      }
    }

    // Add Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={`page-${i}`}
          className={`pagination__button pagination__button--number ${
            i === currentPage ? 'pagination__button--active' : ''
          }`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </Button>,
      );
    }

    // Always show the lastPage
    if (endPage < totalPages) {
      // Add ellipsis if there is a gap
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span key="ellipsis-2" className="pagination__ellipsis">
            ...
          </span>,
        );
      }
      pageNumbers.push(
        <Button
          key={`page-${totalPages}`}
          className={`pagination__button pagination__button--number ${
            totalPages === currentPage ? 'pagination__button--active' : ''
          }`}
          onClick={() => handlePageClick(totalPages)}
        >
          {totalPages}
        </Button>,
      );
    }
    return pageNumbers;
  };

  // Calculate the current showing items range
  const startItem = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems);
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="pagination">
      <div className="pagination__controls">
        <div className="pagination__items-per-page">
          <label className="pagination__label">Show</label>
          <select
            className="pagination__select"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <span className="pagination__label">students</span>
        </div>

        <div className="pagination__navigation">
          <Button
            className="pagination__button pagination__button--first"
            aria-label="First page"
            disabled={currentPage === 1}
            onClick={handleFirstPage}
          >
            <span aria-hidden="true">&laquo;&laquo;</span>
          </Button>
          <Button
            className="pagination__button pagination__button--prev"
            aria-label="Previous page"
            disabled={currentPage === 1}
            onClick={handlePrevPage}
          >
            <span aria-hidden="true">&laquo;</span>
          </Button>

          <div className="pagination__page-indicator">
            <span className="pagination__info">
              Showing {startItem} to {endItem} of {totalItems} entries
            </span>
            <div className="pagination__page-numbers">{renderPageNumber()}</div>
          </div>

          <Button
            className="pagination__button pagination__button--next"
            aria-label="Next page"
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            <span aria-hidden="true">&raquo;</span>
          </Button>
          <Button
            className="pagination__button pagination__button--last"
            aria-label="Last page"
            disabled={currentPage === totalPages}
            onClick={handleLastPage}
          >
            <span aria-hidden="true">&raquo;&raquo;</span>
          </Button>
        </div>

        <div className="pagination__goto">
          <label htmlFor="gotoPage" className="pagination__label">
            Go to page
          </label>
          <input
            id="gotoPage"
            type="number"
            min="1"
            max={totalPages}
            className="pagination__input"
            value={goToPage}
            onChange={handleGoToInputChange}
            onKeyDown={handleGoToKeyPress}
          />
          <Button className="pagination__button pagination__button--go" onClick={handleGoToPage}>
            Go
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Pagination;
