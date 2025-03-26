import { ISortConfig } from 'types/sort';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Button from '@components/common/buttons/Button';
import { SORT_OPTIONS, SortOption } from '@constants/sort-options';
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

  // Memoized function to find initial button text
  const getInitialButtonText = useCallback(() => {
    return (
      SORT_OPTIONS.find(
        (option) => option.field === initialConfig.field && option.order === initialConfig.order,
      )?.text ?? 'Sort By:'
    );
  }, [initialConfig]);

  // Use effect to set initial button text
  useEffect(() => {
    setButtonText(getInitialButtonText());
  }, [getInitialButtonText]);

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
    setIsOpen((prevState) => !prevState);
  };

  const handleSortSelect = (option: SortOption) => {
    const newConfig = { field: option.field, order: option.order };
    setCurrentConfig(newConfig);
    setButtonText(option.text);
    setIsOpen(false);
    onSortChange(newConfig);
  };

  return (
    <div className="sort-dropdown" ref={dropdownRef}>
      <button id="sortByButton" className="sort-dropdown__button" onClick={toggleDropdown}>
        <span>{buttonText}</span>
        <span className="arrow-down">▼</span>
      </button>
      <div
        id="sortDropdownMenu"
        className={`sort-dropdown__menu ${isOpen ? '' : 'hidden'}`}
        role="menu"
      >
        {SORT_OPTIONS.map((option) => (
          <Button
            key={`${option.field}-${option.order}`}
            className={`sort-dropdown__item ${
              currentConfig.field === option.field && currentConfig.order === option.order
                ? 'active'
                : ''
            }`}
            data-field={option.field}
            data-order={option.order}
            onClick={() => handleSortSelect(option)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleSortSelect(option);
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
