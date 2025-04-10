import { useState, useMemo, ChangeEvent } from 'react';
import { Button } from '@components/common/Button';
import './index.css';
import FormField from '../FormField';
import useIsMobile from '@hooks/useIsMobile';
import { useEscapeKey } from '@hooks/useEscapeKey';
import useClickOutside from '@hooks/useClickOutside';

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

interface DropdownProps {
  id: string;
  label: string;
  options: DropdownOption[];
  currentValue: string;
  isOpen: boolean;
  onSelect: (value: string, text: string) => void;
  toggleOpen: () => void;
}

const Dropdown = ({
  id,
  label,
  options,
  currentValue,
  isOpen,
  onSelect,
  toggleOpen,
}: DropdownProps) => {
  const [searchText, setSearchText] = useState<string>('');

  // Check if screen is mobile size
  const isMobile = useIsMobile();

  // Setup global Escape key handler to close dropdown
  useEscapeKey(() => {
    if (isOpen) toggleOpen();
  });

  //Setup click outside handler
  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    if (isOpen) toggleOpen();
  }, isOpen && !isMobile);

  // Filter options based on search text
  const filteredOptions = useMemo(() => {
    if (!searchText) return options;
    return options.filter((option) => option.text.toLowerCase().includes(searchText.toLowerCase()));
  }, [searchText, options]);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const selectedText = options.find((option) => option.value === currentValue)?.text ?? label;

  // Function to handle option selection
  const handleOptionSelect = (value: string, text: string) => {
    onSelect(value, text);
    setSearchText('');
    toggleOpen();
  };

  const getDropdownClassName = (id: string): string => {
    if (id === 'sortOrder') return 'sort-dropdown-order';
    if (id === 'sortField') return 'sort-dropdown-field';
    return '';
  };

  return (
    <div className={`sort-dropdown ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
      <Button
        id={`${id}Button`}
        variant="dropdown"
        className={getDropdownClassName(id)}
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
          <div className="modal-background" onClick={toggleOpen}>
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
          </div>
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
        {
          <div className="dropdown-search">
            <FormField
              name={`${id}Search`}
              type="text"
              placeholder="Search fields..."
              value={searchText}
              onInputChange={handleSearchInputChange}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        }

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
          {filteredOptions.length === 0 && <div className="no-results">No matching fields</div>}
        </div>
      </>
    );
  }
};
export default Dropdown;
