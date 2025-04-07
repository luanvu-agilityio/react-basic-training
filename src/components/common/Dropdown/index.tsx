import React, { useState, useEffect } from 'react';
import { Button } from '@components/common/Button';
import { Overlay } from 'models/Overlay';
import './index.css';
import FormInput from '@components/common/FormInput';
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

const GenericDropdown = ({
  id,
  label,
  options,
  currentValue,
  onSelect,
  isOpen,
  toggleOpen,
  searchable = false,
}: GenericDropdownProps) => {
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
        variant="dropdown"
        className={`${id === 'sortOrder' ? 'sort-dropdown-order' : id === 'sortField' ? 'sort-dropdown-field' : ''}`}
        onClick={toggleOpen}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>
          {label}: {selectedText}
        </span>
        <span className="arrow-down">▼</span>
      </Button>

      {isOpen &&
        (isMobile ? (
          <Overlay onClick={toggleOpen}>
            <div
              id={`${id}Menu`}
              className="dropdown-menu"
              role="menu"
              tabIndex={-1}
              aria-labelledby={`${id}Button`}
            >
              {/* Mobile drawer indicator */}
              <div className="drawer-indicator"></div>
              {/* Menu content - shared between mobile and desktop */}
              {renderMenuContent()}
            </div>
          </Overlay>
        ) : (
          <div
            id={`${id}Menu`}
            className="dropdown-menu"
            role="menu"
            aria-labelledby={`${id}Button`}
          >
            {/* Menu content - shared between mobile and desktop */}
            {renderMenuContent()}
          </div>
        ))}

      {/* For desktop when closed */}
      {!isOpen && !isMobile && (
        <div
          id={`${id}Menu`}
          className="dropdown-menu hidden"
          role="menu"
          aria-labelledby={`${id}Button`}
        >
          {renderMenuContent()}
        </div>
      )}
    </div>
  );

  // Helper function to render menu content
  function renderMenuContent() {
    return (
      <>
        {/* Search field */}
        {searchable && (
          <div className="dropdown-search">
            <FormInput
              name={`${id}Search`}
              type="text"
              placeholder="Search fields..."
              value={searchText}
              onInputChange={handleSearchInputChange}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        {/* Dropdown options */}
        <div className="dropdown-options">
          {filteredOptions.map((option) => (
            <Button
              key={option.value}
              variant="dropdown"
              className={`dropdown-item ${currentValue === option.value ? 'active' : ''}`}
              onClick={() => handleOptionSelect(option.value, option.text)}
              role="menuitem"
            >
              <span>{option.text}</span>
            </Button>
          ))}
          {searchable && filteredOptions.length === 0 && (
            <div className="no-results">No matching fields</div>
          )}
        </div>
      </>
    );
  }
};
export default GenericDropdown;
