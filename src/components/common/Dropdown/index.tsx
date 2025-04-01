import React, { useState, useEffect } from 'react';
import { Button } from '@components/common/Button';
import { Overlay } from '@components/common/Overlay';
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
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Check if screen is mobile size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Setup global Escape key handler to close dropdown
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        toggleOpen();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, toggleOpen]);

  //Setup click outside handler
  useEffect(() => {
    if (!isMobile) {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          if (isOpen) toggleOpen();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
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

  // Function to handle option selection
  const handleOptionSelect = (value: string, text: string) => {
    onSelect(value, text);
    if (searchable) setSearchText('');
    toggleOpen();
  };

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

      {/* Mobile view with Overlay */}
      {isMobile && isOpen && (
        <Overlay onClick={toggleOpen}>
          <div
            id={`${id}Menu`}
            className="sort-dropdown__menu"
            role="menu"
            tabIndex={-1}
            aria-labelledby={`${id}Button`}
          >
            {/* Mobile drawer indicator */}
            <div className="sort-dropdown__drawer-indicator"></div>

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
                  onClick={() => handleOptionSelect(option.value, option.text)}
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
        </Overlay>
      )}

      {/* Desktop dropdown */}
      {(!isMobile || !isOpen) && (
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
                onClick={() => handleOptionSelect(option.value, option.text)}
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
      )}
    </div>
  );
};
export default GenericDropdown;
