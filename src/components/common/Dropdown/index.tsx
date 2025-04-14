import { useState, useMemo, ChangeEvent } from 'react';
import styled, { css } from 'styled-components';
import { Button } from '@components/common/Button';
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
interface DropdownProps {
  id: string;
  label: string;
  options: DropdownOption[];
  currentValue: string;
  isOpen: boolean;
  isOpen: boolean;
  onSelect: (value: string, text: string) => void;
  toggleOpen: () => void;
}

// Styled Components
const DropdownContainer = styled.div<{ $isOpen: boolean }>`
  position: relative;
  display: inline-block;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const ArrowDown = styled.span<{ $isOpen: boolean }>`
  font-size: 16px;
  margin-left: 5px;
  color: #666;
  transition: transform 0.2s ease;
  flex-shrink: 0;

  ${(props) =>
    props.$isOpen &&
    css`
      transform: rotate(180deg);
    `}
`;

const DropdownMenuBase = styled.div<{ $isHidden?: boolean }>`
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  z-index: 100;
  width: 100%;
  min-width: 140px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  border: 1px solid #e0e0e0;

  ${(props) =>
    props.$isHidden
      ? css`
          display: none;
        `
      : css`
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
          pointer-events: auto;
          height: auto;
          max-height: 300px;
        `}

  @media screen and (max-width: 480px) {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    max-width: 100%;
    border-radius: 12px 12px 0 0;
    max-height: 60vh;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    transform: translateY(0);

    &::before {
      content: '';
      display: block;
      width: 40px;
      height: 4px;
      background-color: #e0e0e0;
      border-radius: 2px;
      margin: 8px auto;
    }
  }
`;

const DropdownMenu = styled(DropdownMenuBase)<{ $isOpen?: boolean }>`
  opacity: ${(props) => (props.$isOpen ? '1' : '0')};
  visibility: ${(props) => (props.$isOpen ? 'visible' : 'hidden')};
  transform: ${(props) => (props.$isOpen ? 'translateY(0)' : 'translateY(-10px)')};
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    visibility 0.2s ease;
  pointer-events: ${(props) => (props.$isOpen ? 'auto' : 'none')};
  height: ${(props) => (props.$isOpen ? 'auto' : '0')};

  @media screen and (max-width: 480px) {
    transform: ${(props) => (props.$isOpen ? 'translateY(0)' : 'translateY(100%)')};
  }
`;

const DropdownSearch = styled.div`
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;

  input {
    width: 100%;
    padding: 8px 10px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    font-size: 14px;
    outline: none;
    box-sizing: border-box;

    &:focus {
      border-color: #1677ff;
      box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.1);
    }
  }

  @media screen and (max-width: 480px) {
    padding: 12px;

    input {
      padding: 10px 12px;
      font-size: 15px;
    }
  }
`;

const DropdownOptions = styled.div`
  max-height: 240px;
  overflow-y: auto;
  min-height: 40px;

  @media screen and (max-width: 480px) {
    max-height: 50vh;
  }
`;

const NoResults = styled.div`
  padding: 16px;
  text-align: center;
  color: #999;
  font-style: italic;
`;

const DropdownItem = styled(Button)<{ $isActive: boolean }>`
  padding: 10px 16px;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  color: #333;
  transition: background-color 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 40px;
  box-sizing: border-box;
  min-width: 100%;

  &:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }

  &:hover {
    background-color: #f8f8f8;
  }

  ${(props) =>
    props.$isActive &&
    css`
      background-color: #f5f8ff;
      color: #1677ff;
      font-weight: 500;
    `}

  &::after {
    content: '';
    width: 16px;
    height: 16px;
    display: inline-block;
    flex-shrink: 0;
  }

  ${(props) =>
    props.$isActive &&
    css`
      &::after {
        content: '✓';
        color: #1677ff;
        font-weight: bold;
      }
    `}

  @media screen and (max-width: 480px) {
    padding: 12px 16px;
    font-size: 15px;
    min-height: 45px;
  }

  @media screen and (max-width: 320px) {
    padding: 10px 12px;
    font-size: 13px;
    min-height: 40px;
  }
`;

const SortDropdownField = styled(Button)`
  width: 240px;
`;

const SortDropdownOrder = styled(Button)`
  @media screen and (max-width: 480px) {
    min-width: unset;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const DrawerIndicator = styled.div`
  height: 4px;
  width: 40px;
  background-color: #e0e0e0;
  border-radius: 2px;
  margin: 8px auto;
`;

const Dropdown = ({
  id,
  label,
  options,
  currentValue,
  isOpen,
  isOpen,
  onSelect,
  toggleOpen,
}: DropdownProps) => {
}: DropdownProps) => {
  const [searchText, setSearchText] = useState<string>('');

  // Check if screen is mobile size
  const isMobile = useIsMobile();
  const isMobile = useIsMobile();

  // Setup global Escape key handler to close dropdown
  useEscapeKey(() => {
    if (isOpen) toggleOpen();
  });
  useEscapeKey(() => {
    if (isOpen) toggleOpen();
  });

  //Setup click outside handler
  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    if (isOpen) toggleOpen();
  }, isOpen && !isMobile);
  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    if (isOpen) toggleOpen();
  }, isOpen && !isMobile);

  // Filter options based on search text
  const filteredOptions = useMemo(() => {
    if (!searchText) return options;
    return options.filter((option) => option.text.toLowerCase().includes(searchText.toLowerCase()));
  }, [searchText, options]);
  const filteredOptions = useMemo(() => {
    if (!searchText) return options;
    return options.filter((option) => option.text.toLowerCase().includes(searchText.toLowerCase()));
  }, [searchText, options]);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const selectedText = options.find((option) => option.value === currentValue)?.text ?? label;

  // Function to handle option selection
  const handleOptionSelect = (value: string, text: string) => {
    onSelect(value, text);
    setSearchText('');
    setSearchText('');
    toggleOpen();
  };

  // Helper function to render menu content
  const renderMenuContent = () => {
    return (
      <>
        {/* Search field */}
        <DropdownSearch>
          <FormField
            name={`${id}Search`}
            type="text"
            placeholder="Search fields..."
            value={searchText}
            onInputChange={handleSearchInputChange}
            onClick={(e) => e.stopPropagation()}
          />
        </DropdownSearch>

        {/* Dropdown options */}
        <DropdownOptions>
          {filteredOptions.map((option) => (
            <DropdownItem
              key={option.value}
              variant="dropdown"
              $isActive={currentValue === option.value}
              onClick={() => handleOptionSelect(option.value, option.text)}
              role="menuitem"
            >
              <span>{option.text}</span>
            </DropdownItem>
          ))}
          {filteredOptions.length === 0 && <NoResults>No matching fields</NoResults>}
        </DropdownOptions>
      </>
    );
  };

  // Determine which Button component to use based on id
  const DropdownButton =
    id === 'sortField' ? SortDropdownField : id === 'sortOrder' ? SortDropdownOrder : Button;

  return (
    <DropdownContainer $isOpen={isOpen} ref={dropdownRef}>
      <DropdownButton
        id={`${id}Button`}
        variant="dropdown"
        onClick={toggleOpen}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>
          {label}: {selectedText}
        </span>
        <ArrowDown $isOpen={isOpen}>▼</ArrowDown>
      </DropdownButton>

      {isOpen &&
        (isMobile ? (
          <ModalBackground onClick={toggleOpen}>
            <DropdownMenu
              $isOpen={isOpen}
              id={`${id}Menu`}
              role="menu"
              tabIndex={-1}
              aria-labelledby={`${id}Button`}
            >
              <DrawerIndicator />
              {renderMenuContent()}
            </DropdownMenu>
          </ModalBackground>
        ) : (
          <DropdownMenu
            $isOpen={isOpen}
            id={`${id}Menu`}
            role="menu"
            aria-labelledby={`${id}Button`}
          >
            {renderMenuContent()}
          </DropdownMenu>
        ))}

      {/* For desktop when closed */}
      {!isOpen && !isMobile && (
        <DropdownMenuBase id={`${id}Menu`} role="menu" aria-labelledby={`${id}Button`} $isHidden>
          {renderMenuContent()}
        </DropdownMenuBase>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;
