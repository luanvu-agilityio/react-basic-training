import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ICON_SRC } from '@constants/icon-src';
import FormField from '../FormField';
import useDebounce from '@hooks/useDebounce';

export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceTime?: number;
  initialQuery?: string;
  type?: string;
}

// Styled components definition
const SearchBarContainer = styled.div`
  position: relative;
  width: 22rem;
  height: 3.7rem;
  border-radius: 4px;
  border: 1px solid var(--input-border-color);
`;

// Add a prop to determine icon visibility
interface StyledFormFieldProps {
  hideIcon: boolean;
}

const StyledFormField = styled(FormField)<StyledFormFieldProps>`
  width: 100%;
  height: 100%;

  border: none;
  border-radius: 8px;
  outline: none;
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-regular);

  .form-input {
    padding: 0;
    height: 30px;
    font-size: 14px;
  }

  &::placeholder {
    font-size: var(--font-size-14);
    font-weight: var(--font-weight-regular);
    color: var(--semi-gray-color);
  }

  .search-icon {
    width: 1.4rem;
    height: 1.4rem;
    display: ${(props) => (props.hideIcon ? 'none' : 'block')};
    transition: opacity 0.2s ease;
  }
`;

const SearchBar = ({
  onSearch,
  placeholder = 'Search...',
  debounceTime = 300,
  initialQuery = '',
  type = 'text',
  type = 'text',
}: SearchBarProps) => {
  // State for managing the immediate search query input
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  // Custom hook to debounce the search query
  const debouncedQuery = useDebounce(searchQuery, debounceTime);
  // Custom hook to debounce the search query
  const debouncedQuery = useDebounce(searchQuery, debounceTime);

  /**
   * Performs the actual search operation using the provided query
   * @param query - The search string to filter data
   */
  const performSearch = (query: string) => {
    onSearch(query);
  };

  /**
   * Effect to trigger search when debounced query changes
   */
  useEffect(() => {
    performSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);
    performSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  /**
   * Handles real-time input changes
   * Updates the searchQuery state, which triggers the debounce effect
   */
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  /**
   * Handles Enter key press for immediate search
   * Bypasses the debounce delay when user explicitly requests search
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      performSearch(searchQuery);
    }
  };

  // Hide icon when there is a search query
  const shouldHideIcon = searchQuery.trim().length > 0;

  return (
    <SearchBarContainer className="searchbar">
      <StyledFormField
        type={type}
        name="search"
        className="searchbar-input"
        placeholder={placeholder}
        value={searchQuery}
        onInputChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        imgSrc={ICON_SRC.search.src}
        imgAlt={ICON_SRC.search.alt}
        imgClassName={ICON_SRC.search.className}
        aria-label={`Search ${placeholder?.toLowerCase() || 'items'}`}
        hideIcon={shouldHideIcon}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
