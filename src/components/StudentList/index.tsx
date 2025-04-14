import styled from 'styled-components';
import { IStudent } from 'types/student';
import StudentTableHeaderStyled from '../StudentTableHeader';
import StudentTableRowStyled from '../StudentTableRow';

/**
 * StudentListStyled Component
 *
 * A styled-components version of the table component that displays a list of students
 * with their information and action buttons for editing and deleting.
 */
interface StudentListProps {
  /** Array of student records to display */
  students: IStudent[];
  /** Callback function when edit button is clicked */
  onEdit: (student: IStudent) => void;
  /** Callback function when delete button is clicked */
  onDelete: (student: IStudent) => void;
}

const TableContainer = styled.div`
  width: 100%;
`;

const StudentsTable = styled.table`
  width: 100%;
  border-spacing: 0 1.5rem;
  table-layout: fixed;

  @media screen and (max-width: 768px) {
    display: block;
    width: 100%;

    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
      width: 100% !important;
    }
  }
`;

const EmptyRow = styled.tr`
  background-color: var(--white-color);
`;

const EmptyCell = styled.td`
  padding: 15px 10px;
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-regular);
  border: none;
  text-align: center;
  border-radius: 1rem;
`;

/**
 * Renders a table of student records with actions using styled-components
 *
 * @param {StudentListProps} props - Component props
 * @returns {JSX.Element} Table component with student data
 */
const StudentListStyled = ({ students, onEdit, onDelete }: StudentListProps) => {
  return (
    <TableContainer>
      <StudentsTable>
        <StudentTableHeaderStyled />
        <tbody>
          {students.length === 0 ? (
            // Empty state message
            <EmptyRow>
              <EmptyCell colSpan={7}>
                No students found. Click ADD NEW STUDENT to add one.
              </EmptyCell>
            </EmptyRow>
          ) : (
            // Map through students and render rows
            students.map((student) => (
              <StudentTableRowStyled
                key={student.id}
                student={student}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </StudentsTable>
    </TableContainer>
  );
};

export default StudentListStyled;
