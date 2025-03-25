import { SortField, SortOrder, ISortConfig } from 'types/sort';
import React, { useState, useEffect, useRef } from 'react';
import Button from '@components/common/buttons/Button';
import './SortDropdown.css';

interface SortDropdownProps {
  onSortChange: (config: ISortConfig) => void;
  initialConfig?: ISortConfig;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  onSortChange,
  initialConfig = { field: 'name', order: 'asc' },
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentConfig, setCurrentConfig] = useState<ISortConfig>(initialConfig);
  const [buttonText, setButtonText] = useState<string>('Sort By:');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sort options configuration
  const sortOptions = [
    { field: 'name', order: 'asc', text: 'Name A-Z' },
    { field: 'name', order: 'desc', text: 'Name Z-A' },
    { field: 'email', order: 'asc', text: 'Email A-Z' },
    { field: 'email', order: 'desc', text: 'Email Z-A' },
    { field: 'enrollNum', order: 'asc', text: 'Enroll Number A-Z' },
    { field: 'enrollNum', order: 'desc', text: 'Enroll Number Z-A' },
    { field: 'phoneNum', order: 'asc', text: 'Phone Number A-Z' },
    { field: 'phoneNum', order: 'desc', text: 'Phone Number Z-A' },
    { field: 'dateAdmission', order: 'asc', text: 'Date of Admission A-Z' },
    { field: 'dateAdmission', order: 'desc', text: 'Date of Admission Z-A' },
  ];
  //Set initial button text
  useEffect(() => {
    const initialOption = sortOptions.find(
      (option) => option.field === initialConfig.field && option.order === initialConfig.order,
    );
    if (initialOption) {
      setButtonText(initialOption.text);
    }
  }, [initialConfig]);

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSortSelect = (field: SortField, order: SortOrder, text: string) => {
    const newConfig = { field, order };
    setCurrentConfig(newConfig);
    setButtonText(text);
    setIsOpen(false);
    onSortChange(newConfig);
  };

  return (
    <div className="sort-dropdown" ref={dropdownRef}>
      <button id="sortByButton" className="sort-dropdown__button" onClick={toggleDropdown}>
        <span>{buttonText}</span>
        <span className="arrow-down">▼</span>
      </button>
      <div id="sortDropdownMenu" className={`sort-dropdown__menu ${isOpen ? '' : 'hidden'}`}>
        {sortOptions.map((option) => (
          <Button
            key={`${option.field}-${option.order}`}
            className={`sort-dropdown__item ${
              currentConfig.field === option.field && currentConfig.order === option.order
                ? 'active'
                : ''
            }`}
            data-field={option.field}
            data-order={option.order}
            onClick={() =>
              handleSortSelect(option.field as SortField, option.order as SortOrder, option.text)
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleSortSelect(option.field as SortField, option.order as SortOrder, option.text);
              }
            }}
            role="menuitem"
          >
            {option.text}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SortDropdown;
