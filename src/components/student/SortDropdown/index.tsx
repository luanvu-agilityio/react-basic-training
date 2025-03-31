import { ISortConfig } from 'types/sort';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Button from '@components/common/Button';
import { SORT_FIELDS, SORT_ORDERS } from '@constants/sort-options';
import './index.css';
/**
 * dropdown components for sorting functionality.
 *
 * Features:
 * - Two interconnected dropdowns for field selection and sort order
 * - Searchable fields dropdown
 * - Click outside handling
 * - Initial state support
 */
interface SortDropdownProps {
  /** Callback triggered when either sort field or order changes */
  onSortChange: (config: ISortConfig) => void;
  /** Initial sorting configuration */
  initialConfig: ISortConfig;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  onSortChange,
  initialConfig = { field: 'name', order: 'asc' },
}) => {
  // State for field dropdown
  const [isFieldOpen, setIsFieldOpen] = useState<boolean>(false);
  const [currentField, setCurrentField] = useState<string>(initialConfig.field);
  const [selectedFieldText, setSelectedFieldText] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [filteredFields, setFilteredFields] = useState(SORT_FIELDS);
  const fieldDropdownRef = useRef<HTMLDivElement>(null);

  // State for order dropdown
  const [isOrderOpen, setIsOrderOpen] = useState<boolean>(false);
  const [currentOrder, setCurrentOrder] = useState<string>(initialConfig.order);
  const [selectedOrderText, setSelectedOrderText] = useState<string>('');
  const orderDropdownRef = useRef<HTMLDivElement>(null);

  /**
   * Gets the display text for the initially selected field
   * Falls back to 'Select Field' if field not found
   */
  const getInitialFieldText = useCallback(() => {
    return (
      SORT_FIELDS.find((option) => option.field === initialConfig.field)?.text ?? 'Select Field'
    );
  }, [initialConfig.field]);

  /**
   * Gets the display text for the initially selected order
   * Falls back to 'A to Z' if order not found
   */
  const getInitialOrderText = useCallback(() => {
    return SORT_ORDERS.find((option) => option.order === initialConfig.order)?.text ?? 'A to Z';
  }, [initialConfig.order]);

  /**
   * Sets up initial dropdown states
   */
  useEffect(() => {
    setSelectedFieldText(getInitialFieldText());
    setSelectedOrderText(getInitialOrderText());
  }, [getInitialFieldText, getInitialOrderText]);

  /**
   * Filters field options based on search text
   */
  useEffect(() => {
    if (searchText) {
      const filtered = SORT_FIELDS.filter((field) =>
        field.text.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredFields(filtered);
    } else {
      setFilteredFields(SORT_FIELDS);
    }
  }, [searchText]);

  /**
   * Click outside handlers for both dropdowns
   * Closes dropdowns when clicking outside their containers
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fieldDropdownRef.current && !fieldDropdownRef.current.contains(event.target as Node)) {
        setIsFieldOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle clicks outside for order dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (orderDropdownRef.current && !orderDropdownRef.current.contains(event.target as Node)) {
        setIsOrderOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /**
   * Dropdown toggle handlers
   * Ensures only one dropdown is open at a time
   */
  const toggleFieldDropdown = () => {
    setIsFieldOpen((prev) => !prev);
    if (isOrderOpen) setIsOrderOpen(false);
  };

  const toggleOrderDropdown = () => {
    setIsOrderOpen((prev) => !prev);
    if (isFieldOpen) setIsFieldOpen(false);
  };

  /**
   * Selection handlers
   * Updates state and triggers parent callback with new sort configuration
   */
  const handleFieldSelect = (field: string, text: string) => {
    setCurrentField(field);
    setSelectedFieldText(text);
    setIsFieldOpen(false);
    setSearchText('');

    onSortChange({
      field: field as ISortConfig['field'],
      order: currentOrder as ISortConfig['order'],
    });
  };

  const handleOrderSelect = (order: string, text: string) => {
    setCurrentOrder(order);
    setSelectedOrderText(text);
    setIsOrderOpen(false);

    onSortChange({
      field: currentField as ISortConfig['field'],
      order: order as ISortConfig['order'],
    });
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="dual-sort-container">
      {/* Field Dropdown */}
      <div className={`sort-dropdown ${isFieldOpen ? 'open' : ''}`} ref={fieldDropdownRef}>
        <Button
          id="sortFieldButton"
          className="sort-dropdown__button"
          onClick={toggleFieldDropdown}
          aria-haspopup="true"
          aria-expanded={isFieldOpen}
        >
          <span>Sort By: {selectedFieldText}</span>
          <span className="arrow-down">▼</span>
        </Button>
        <div
          id="sortFieldMenu"
          className={`sort-dropdown__menu ${isFieldOpen ? '' : 'hidden'}`}
          role="menu"
          aria-labelledby="sortFieldButton"
        >
          <div className="sort-dropdown__search">
            <input
              type="text"
              placeholder="Search fields..."
              value={searchText}
              onChange={handleSearchInputChange}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="sort-dropdown__options">
            {filteredFields.map((option) => (
              <Button
                key={option.field}
                className={`sort-dropdown__item ${currentField === option.field ? 'active' : ''}`}
                onClick={() => handleFieldSelect(option.field, option.text)}
                role="menuitem"
              >
                <span>{option.text}</span>
              </Button>
            ))}
            {filteredFields.length === 0 && (
              <div className="sort-dropdown__no-results">No matching fields</div>
            )}
          </div>
        </div>
      </div>

      {/* Order Dropdown */}
      <div className={`sort-dropdown ${isOrderOpen ? 'open' : ''}`} ref={orderDropdownRef}>
        <Button
          id="sortOrderButton"
          className="sort-dropdown__button sort-dropdown__button--order"
          onClick={toggleOrderDropdown}
          aria-haspopup="true"
          aria-expanded={isOrderOpen}
        >
          <span>Order: {selectedOrderText}</span>
          <span className="arrow-down">▼</span>
        </Button>
        <div
          id="sortOrderMenu"
          className={`sort-dropdown__menu ${isOrderOpen ? '' : 'hidden'}`}
          role="menu"
          aria-labelledby="sortOrderButton"
        >
          {SORT_ORDERS.map((option) => (
            <Button
              key={option.order}
              className={`sort-dropdown__item ${currentOrder === option.order ? 'active' : ''}`}
              onClick={() => handleOrderSelect(option.order, option.text)}
              role="menuitem"
            >
              <span>{option.text}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SortDropdown;
