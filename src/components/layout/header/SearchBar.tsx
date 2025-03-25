import React, { useEffect, useState } from 'react';
import './Header.css';
import { IStudent } from 'types/student';

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
    searchStudents(debounceQuery);
  }, [debounceQuery, allStudents]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchStudents(searchQuery);
    }
  };

  const searchStudents = (query: string) => {
    if (!query || query.trim() === '') {
      onSearchResults(allStudents);
      return;
    }
    const normalizedQuery = query.toLowerCase().trim();
    const filteredStudents = allStudents.filter((student) =>
      matchesSearch(student, normalizedQuery),
    );
    onSearchResults(filteredStudents);
  };

  // Match function adapted from controller.ts
  const matchesSearch = (student: IStudent, query: string): boolean => {
    return (
      (student.name?.toLowerCase().includes(query) ?? false) ||
      (student.email?.toLowerCase().includes(query) ?? false) ||
      (student.phoneNum?.toLowerCase().includes(query) ?? false) ||
      (student.enrollNum?.toLowerCase().includes(query) ?? false) ||
      (student.dateAdmission?.toLowerCase().includes(query) ?? false)
    );
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
      />
    </div>
  );
};

export default SearchBar;
