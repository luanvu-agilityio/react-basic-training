import React, { JSX } from 'react';

/**
 * StudentTableHeader Component
 *
 * A reusable table header component for the student list table.
 */
const TABLE_HEADERS = [
  { key: 'avatar', label: '', className: '' }, // Student avatar column
  { key: 'name', label: 'Name', className: 'name-cell' }, // Student name with custom styling
  { key: 'email', label: 'Email', className: 'email-cell' }, // Email address with custom styling
  { key: 'phoneNum', label: 'Phone Number', className: '' }, // Contact number
  { key: 'enrollNum', label: 'Enroll Number', className: '' }, // Student enrollment ID
  { key: 'dateAdmission', label: 'Date Admission', className: '' }, // Admission date
  { key: 'actions', label: '', className: '' }, // Action buttons column
];

/**
 * Renders the table header row with configured columns
 *
 * @returns {JSX.Element} Table header component
 */
const StudentTableHeader = (): JSX.Element => {
  return (
    <thead>
      <tr>
        {TABLE_HEADERS.map((header) => (
          <th key={header.key} className={`students__table-header ${header.className}`}>
            {header.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default StudentTableHeader;
