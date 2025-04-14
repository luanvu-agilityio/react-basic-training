// StudentTableHeaderStyled.tsx
import styled from 'styled-components';

/**
 * StudentTableHeaderStyled Component
 *
 * A reusable table header component for the student list table using styled-components.
 */
const TABLE_HEADERS = [
  { key: 'avatar', label: '', className: '' }, // Student avatar column
  { key: 'name', label: 'Name', className: 'name-cell' }, // Student name with custom styling
  { key: 'email', label: 'Email', className: 'email-cell' }, // Email address with custom styling
  { key: 'phoneNum', label: 'Phone', className: '' }, // Contact number
  { key: 'enrollNum', label: 'Enroll Number', className: '' }, // Student enrollment ID
  { key: 'dateAdmission', label: 'Date Admission', className: '' }, // Admission date
  { key: 'actions', label: '', className: '' }, // Action buttons column
];

const TableHead = styled.thead`
  @media screen and (max-width: 768px) {
    position: absolute;
    top: -100%;
    left: -100%;
  }
`;

const HeaderRow = styled.tr``;

interface HeaderCellProps {
  isNameCell?: boolean;
  isEmailCell?: boolean;
}

const HeaderCell = styled.th<HeaderCellProps>`
  text-align: left;
  padding: 3rem 1rem 1.2rem 0.5rem;
  border-top: 1px solid var(--input-border-color);
  background-color: #f9f9f9;
  color: var(--dark-gray-color);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-12);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  /* Column width definitions */
  &:nth-child(1) {
    width: 85px; /* Avatar column */
  }

  &:nth-child(2) {
    width: 17%; /* Name column */

    @media screen and (max-width: 1200px) {
      width: 18%;
    }

    @media screen and (max-width: 992px) {
      width: 16%;
    }
  }

  &:nth-child(3) {
    width: 20%; /* Email column */

    @media screen and (max-width: 1200px) {
      width: 18%;
    }

    @media screen and (max-width: 992px) {
      width: 16%;
    }
  }

  &:nth-child(4) {
    width: 13%; /* Phone Number column */
  }

  &:nth-child(5) {
    width: 20%; /* Enrollment Number column */
  }

  &:nth-child(6) {
    width: 15%; /* Date of Admission column */
  }

  &:nth-child(7) {
    width: 14%; /* Actions column */
  }
`;

/**
 * Renders the table header row with configured columns using styled-components
 *
 * @returns {JSX.Element} Table header component
 */
const StudentTableHeaderStyled = () => {
  return (
    <TableHead>
      <HeaderRow>
        {TABLE_HEADERS.map((header) => (
          <HeaderCell
            key={header.key}
            isNameCell={header.className === 'name-cell'}
            isEmailCell={header.className === 'email-cell'}
          >
            {header.label}
          </HeaderCell>
        ))}
      </HeaderRow>
    </TableHead>
  );
};

export default StudentTableHeaderStyled;
