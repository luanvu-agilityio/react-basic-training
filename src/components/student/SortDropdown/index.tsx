import { ISortConfig } from 'types/sort';
import React, { useState } from 'react';
import { SORT_FIELDS, SORT_ORDERS } from '@constants/sort-options';
import './index.css';
import GenericDropdown, { DropdownOption } from '@components/common/Dropdown';

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

  // State for order dropdown
  const [isOrderOpen, setIsOrderOpen] = useState<boolean>(false);
  const [currentOrder, setCurrentOrder] = useState<string>(initialConfig.order);

  // Convert SORT_FIELDS to an array of options
  const fieldOptions: DropdownOption[] = SORT_FIELDS.map((field) => ({
    value: field.field,
    text: field.text,
  }));

  // Convert SORT_ORDERS to an array of options
  const orderOptions: DropdownOption[] = SORT_ORDERS.map((order) => ({
    value: order.order,
    text: order.text,
  }));

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
  const handleFieldSelect = (field: string) => {
    setCurrentField(field);
    setIsFieldOpen(false);

    onSortChange({
      field: field as ISortConfig['field'],
      order: currentOrder as ISortConfig['order'],
    });
  };

  const handleOrderSelect = (order: string) => {
    setCurrentOrder(order);
    setIsOrderOpen(false);

    onSortChange({
      field: currentField as ISortConfig['field'],
      order: order as ISortConfig['order'],
    });
  };

  return (
    <div className="dual-sort-container">
      {/* Field Dropdown */}
      <GenericDropdown
        id="sortField"
        label="Sort By"
        options={fieldOptions}
        currentValue={currentField}
        onSelect={handleFieldSelect}
        isOpen={isFieldOpen}
        toggleOpen={toggleFieldDropdown}
        searchable={true}
      />

      {/* Order Dropdown */}
      <GenericDropdown
        id="sortOrder"
        label="Order"
        options={orderOptions}
        currentValue={currentOrder}
        onSelect={handleOrderSelect}
        isOpen={isOrderOpen}
        toggleOpen={toggleOrderDropdown}
      />
    </div>
  );
};

export default SortDropdown;
