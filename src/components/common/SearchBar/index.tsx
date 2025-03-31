import React, { useEffect, useState } from 'react';
import '../../layout/Header/index.css';
import { IStudent } from 'types/student';
import { filterStudentsByQuery } from '@helpers/filter-student-by-query';
import InputWithIcon from '@components/common/FormInputWithIcon';

/**
 * A reusable SearchBar component with debounced search functionality.
 *
 * This component provides a search input field with debounced search capabilities
 * to efficiently filter through student data. It includes an icon and supports
 * both onChange and Enter key search triggers.
 *
 * Props:
 * - `allStudents` (IStudent[]): Array of all students to search through
 * - `onSearchResults` (function): Callback function that receives filtered students
 * - `placeholder` (string, optional): Custom placeholder text. Defaults to "Search students..."
 * - `debounceTime` (number, optional): Debounce delay in milliseconds. Defaults to 300ms
 */
export interface SearchBarProps {
  allStudents: IStudent[];
  onSearchResults: (students: IStudent[]) => void;
  placeholder?: string;
  debounceTime?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  allStudents,
  onSearchResults,
  placeholder = 'Search students...',
  debounceTime = 300,
}) => {
  // State for managing the immediate search query input
  const [searchQuery, setSearchQuery] = useState('');
  // State for managing the debounced version of the search query
  const [debounceQuery, setDebounceQuery] = useState<string>('');

  /**
   * Performs the actual search operation using the provided query
   * @param query - The search string to filter students
   */
  const performSearch = (query: string) => {
    const filteredStudents = query.trim() ? filterStudentsByQuery(allStudents, query) : allStudents;

    onSearchResults(filteredStudents);
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
   * Also re-runs when allStudents array changes to keep results in sync
   */
  useEffect(() => {
    performSearch(debounceQuery);
  }, [debounceQuery, allStudents]);

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
  const icon = {
    search: {
      src: 'https://res.cloudinary.com/ds82onf5q/image/upload/v1742868125/search_jksrfd.svg',
      alt: 'Search',
      className: 'search-icon',
    },
  };

  return (
    <div className="content__search">
      <InputWithIcon
        type="text"
        id="search"
        className="content__search-input"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        icon={icon.search}
        aria-label="Search students"
      />
    </div>
  );
};

export default SearchBar;
