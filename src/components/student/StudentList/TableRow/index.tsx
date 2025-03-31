import React from 'react';
import { IStudent } from 'types/student';
import Button from '@components/common/Button';
import Avatar from '@components/common/Avatar';

/**
 * StudentTableRow Component
 *
 * Renders a table row for a student record with configurable columns and actions.
 */

/**
 * Table column configuration
 * Defines the structure and rendering logic for each column
 */
const TABLE_COLUMNS = [
  {
    key: 'avatar',
    render: (student: IStudent) => (
      <Avatar
        className="student-avatar"
        src={
          student.avatar ??
          'https://res.cloudinary.com/ds82onf5q/image/upload/w_65,h_55,c_fill,q_auto,f_auto/v1742547439/opzj4nkixf9ftq6bmeyj.jpg'
        }
        alt={`Student ${student.name}`}
        style={{
          width: '65px',
          height: '55px',
          borderRadius: '5px',
        }}
        lazyLoad={false}
      />
    ),
  },
  {
    key: 'Name',
    render: (student: IStudent) => student.name,
  },
  {
    key: 'Email',
    render: (student: IStudent) => student.email,
  },
  {
    key: 'Phone Number',
    render: (student: IStudent) => student.phoneNum,
  },
  {
    key: 'Enrollment Number',
    render: (student: IStudent) => student.enrollNum,
  },
  {
    key: 'Date of Admission',
    render: (student: IStudent) => student.dateAdmission,
  },
  {
    key: 'actions',
    render: (
      student: IStudent,
      onEdit: (student: IStudent) => void,
      onDelete: (student: IStudent) => void,
    ) => (
      <div className="students__table-action">
        <Button className="btn btn--edit" onClick={() => student.id && onEdit(student)}>
          <img
            src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742868082/edit_gxvseg.svg"
            alt="Edit student"
            loading="eager"
            width={18}
            height={18}
          />
        </Button>
        <Button className="btn btn--delete" onClick={() => student.id && onDelete(student)}>
          <img
            src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742868081/delete_oynjal.svg"
            alt="Delete student"
            loading="eager"
            width={18}
            height={18}
          />
        </Button>
      </div>
    ),
  },
];

/**
 * Props interface for StudentTableRow
 */
interface StudentTableRowProps {
  /** Student data to display in the row */
  student: IStudent;
  /** Callback function when edit button is clicked */
  onEdit: (student: IStudent) => void;
  /** Callback function when delete button is clicked */
  onDelete: (student: IStudent) => void;
}

/**
 * StudentTableRow Component
 *
 * Renders a table row with student information and action buttons
 * Maps through configured columns to render cells consistently
 *
 * @param props StudentTableRowProps
 * @returns Table row element with student data
 */
const StudentTableRow: React.FC<StudentTableRowProps> = ({ student, onEdit, onDelete }) => {
  return (
    <tr key={student.id} className="students__table-row" data-id={student.id}>
      {TABLE_COLUMNS.map((column) => (
        <td
          key={column.key}
          className={`students__table-cell ${column.key === 'Name' ? 'name-cell' : ''} ${column.key === 'Email' ? 'email-cell' : ''}`}
          data-label={column.key !== 'avatar' && column.key !== 'actions' ? column.key : undefined}
        >
          {column.key === 'actions'
            ? column.render(student, onEdit, onDelete)
            : column.render(
                student,
                () => {},
                () => {},
              )}
        </td>
      ))}
    </tr>
  );
};

export default StudentTableRow;
