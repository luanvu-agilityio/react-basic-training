import React, { useState, useEffect } from 'react';
import { Button } from '@components/common/Button';
import './index.css';
/**
 * dropdown components for sorting functionality.
 *
 * Features:
 * - Searchable fields dropdown
 * - Click outside handling
 * - Initial state support
 */

export interface DropdownOption {
  value: string;
  text: string;
}

interface GenericDropdownProps {
  id: string;
  label: string;
  options: DropdownOption[];
  currentValue: string;
  onSelect: (value: string, text: string) => void;
  isOpen: boolean;
  toggleOpen: () => void;
  searchable?: boolean;
}

const GenericDropdown: React.FC<GenericDropdownProps> = ({
  id,
  label,
  options,
  currentValue,
  onSelect,
  isOpen,
  toggleOpen,
  searchable = false,
}) => {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<DropdownOption[]>(options);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  //Setup click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (isOpen) toggleOpen();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleOpen]);

  // Filter options based on search text
  useEffect(() => {
    if (searchable && searchText) {
      const filtered = options.filter((option) =>
        option.text.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [searchText, options, searchable]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const selectedText = options.find((option) => option.value === currentValue)?.text ?? label;

  return (
    <div className={`sort-dropdown ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
      <Button
        id={`${id}Button`}
        className={`sort-dropdown__button ${id === 'sortOrder' ? 'sort-dropdown__button--order' : ''}`}
        onClick={toggleOpen}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>
          {label}: {selectedText}
        </span>
        <span className="arrow-down">▼</span>
      </Button>

      {/* Dropdown menu, set default to hidden */}
      <div
        id={`${id}Menu`}
        className={`sort-dropdown__menu ${isOpen ? '' : 'hidden'}`}
        role="menu"
        aria-labelledby={`${id}Button`}
      >
        {/* Search field */}
        {searchable && (
          <div className="sort-dropdown__search">
            <input
              type="text"
              placeholder="Search fields..."
              value={searchText}
              onChange={handleSearchInputChange}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        {/* Dropdown options */}
        <div className="sort-dropdown__options">
          {filteredOptions.map((option) => (
            <Button
              key={option.value}
              className={`sort-dropdown__item ${currentValue === option.value ? 'active' : ''}`}
              onClick={() => {
                onSelect(option.value, option.text);
                if (searchable) setSearchText('');
              }}
              role="menuitem"
            >
              <span>{option.text}</span>
            </Button>
          ))}
          {searchable && filteredOptions.length === 0 && (
            <div className="sort-dropdown__no-results">No matching fields</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default GenericDropdown;
