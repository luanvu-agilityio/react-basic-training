import './index.css';
import React from 'react';
import { IStudent } from 'types/student';
import StudentTableHeader from './TableHeader/index';
import StudentTableRow from './TableRow/index';

/**
 * StudentList Component
 *
 * A table component that displays a list of students with their information
 * and action buttons for editing and deleting.
 */
interface StudentListProps {
  /** Array of student records to display */
  students: IStudent[];
  /** Callback function when edit button is clicked */
  onEdit: (student: IStudent) => void;
  /** Callback function when delete button is clicked */
  onDelete: (student: IStudent) => void;
}

/**
 * Renders a table of student records with actions
 *
 * @param {StudentListProps} props - Component props
 * @returns {JSX.Element} Table component with student data
 */
const StudentList: React.FC<StudentListProps> = ({ students, onEdit, onDelete }) => {
  return (
    <div>
      <table className="students__table">
        <StudentTableHeader />
        <tbody>
          {students.length === 0 ? (
            // Empty state message
            <tr className="students__table-row">
              <td className="students__table-cell text-center" colSpan={7}>
                No students found. Click ADD NEW STUDENT to add one.
              </td>
            </tr>
          ) : (
            // Map through students and render rows
            students.map((student) => (
              <StudentTableRow
                key={student.id}
                student={student}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
