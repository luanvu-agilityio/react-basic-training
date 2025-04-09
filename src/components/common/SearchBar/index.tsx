import React, { useEffect, useState } from 'react';
import './index.css';
import { ICON_SRC } from '@constants/icon-src';
import FormField from '../FormField';
import useDebounce from '@hooks/useDebounce';

/**
 * A reusable SearchBar component with debounced search functionality.
 *
 * This component provides a search input field with debounced search capabilities
 * to efficiently search through any data.
 *
 * Props:
 * - `onSearch` (function): Callback function that receives the search query string
 * - `placeholder` (string, optional): Custom placeholder text. Defaults to "Search..."
 * - `debounceTime` (number, optional): Debounce delay in milliseconds. Defaults to 300ms
 * - `initialQuery` (string, optional): Initial search query. Defaults to empty string
 */
export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceTime?: number;
  initialQuery?: string;
}

const SearchBar = ({
  onSearch,
  placeholder = 'Search...',
  debounceTime = 300,
  initialQuery = '',
}: SearchBarProps) => {
  // State for managing the immediate search query input
  const [searchQuery, setSearchQuery] = useState(initialQuery);
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

  /**
   * Handles real-time input changes
   * Updates the searchQuery state, which triggers the debounce effect
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  /**
   * Handles Enter key press for immediate search
   * Bypasses the debounce delay when user explicitly requests search
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      performSearch(searchQuery);
    }
  };

  // Configuration object for the search icon

  return (
    <div className="searchbar">
      <FormField
        type="text"
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
      />
    </div>
  );
};

export default SearchBar;
