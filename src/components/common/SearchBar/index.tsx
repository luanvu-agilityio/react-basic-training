import React, { useEffect, useState } from 'react';
import './index.css';
import FormInput from '@components/common/FormInput';
import { ICON_SRC } from '@constants/icon-src';

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
  // State for managing the debounced version of the search query
  const [debounceQuery, setDebounceQuery] = useState<string>(initialQuery);

  /**
   * Performs the actual search operation using the provided query
   * @param query - The search string to filter data
   */
  const performSearch = (query: string) => {
    onSearch(query);
  };

  /**
   * Debounce effect: Delays updating the debounced query to prevent excessive searches
   * Cleanup function removes the timeout if component unmounts or query changes
   */
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceQuery(searchQuery);
    }, debounceTime);
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, debounceTime]);

  /**
   * Effect to trigger search when debounced query changes
   */
  useEffect(() => {
    performSearch(debounceQuery);
  }, [debounceQuery]);

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
      <FormInput
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
