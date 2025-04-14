import { ISortConfig } from 'types/sort';
import { useState } from 'react';
import { useState } from 'react';
import { SORT_FIELDS, SORT_ORDERS } from '@constants/sort-options';
import Dropdown, { DropdownOption } from '@components/common/Dropdown';
import styled from 'styled-components';

/**
 * dropdown components for sorting functionality.
 *
 * Features:
 * - Two interconnected dropdowns for field selection and sort order
 * - Searchable fields dropdown
 * - Click outside handling
 * - Initial state support
 */
interface StudentSortDropdownProps {
  /** Callback triggered when either sort field or order changes */
  onSortChange: (config: ISortConfig) => void;
  /** Initial sorting configuration */
  initialConfig: ISortConfig;
}

const StudentSortDropdown = ({
  onSortChange,
  initialConfig = { field: 'name', order: 'asc' },
}: StudentSortDropdownProps) => {
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

  const DualSortContainer = styled.div`
    display: flex;
    gap: 16px;
    align-items: center;

    @media screen and (max-width: 768px) {
      flex-direction: column;
      gap: 8px;
      width: 100%;
      margin-top: 10px;
      min-height: 86px;
    }
  `;

  return (
    <DualSortContainer>
      {/* Field Dropdown */}
      <Dropdown
      <Dropdown
        id="sortField"
        label="Sort By"
        options={fieldOptions}
        currentValue={currentField}
        onSelect={handleFieldSelect}
        isOpen={isFieldOpen}
        toggleOpen={toggleFieldDropdown}
      />

      {/* Order Dropdown */}
      <Dropdown
      <Dropdown
        id="sortOrder"
        label="Order"
        options={orderOptions}
        currentValue={currentOrder}
        onSelect={handleOrderSelect}
        isOpen={isOrderOpen}
        toggleOpen={toggleOrderDropdown}
      />
    </DualSortContainer>
  );
};

export default StudentSortDropdown;
