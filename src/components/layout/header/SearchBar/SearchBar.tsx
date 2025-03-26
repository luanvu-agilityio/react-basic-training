import React, { useEffect, useState } from 'react';
import '../Header/Header.css';
import { IStudent } from 'types/student';
import { filterStudentsByQuery } from '@helpers/filter-student-by-query';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [debounceQuery, setDebounceQuery] = useState<string>('');

  const performSearch = (query: string) => {
    const filteredStudents = query.trim() ? filterStudentsByQuery(allStudents, query) : allStudents;

    onSearchResults(filteredStudents);
  };

  // Debounce search query for better performance
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceQuery(searchQuery);
    }, debounceTime);
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, debounceTime]);

  // Perform search when debounced query change
  useEffect(() => {
    performSearch(debounceQuery);
  }, [debounceQuery, allStudents]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      performSearch(searchQuery);
    }
  };

  return (
    <div className="content__search">
      <input
        type="text"
        className="content__search-input"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        aria-label="Search students"
      />

      <img
        className="content__search-icon"
        src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742868125/search_jksrfd.svg"
        alt="Search"
        loading="lazy"
      />
    </div>
  );
};

export default SearchBar;
