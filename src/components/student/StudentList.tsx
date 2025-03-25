import './StudentList.css';
import React from 'react';
import { IStudent } from 'types/student';
import Button from '@components/common/buttons/Button';

interface StudentListProps {
  students: IStudent[];
  onEdit: (student: IStudent) => void;
  onDelete: (student: IStudent) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onEdit, onDelete }) => {
  return (
    <div>
      <table className="students__table">
        <thead>
          <tr>
            <th className="students__table-header"></th>
            <th className="students__table-header">Name</th>
            <th className="students__table-header">Email</th>
            <th className="students__table-header">Phone</th>
            <th className="students__table-header">Enroll Number</th>
            <th className="students__table-header">Date of admission</th>
            <th className="students__table-header"></th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr className="students__table-row">
              <td className="students__table-cell text-center">
                No students found. Click ADD NEW STUDENT to add one.
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id} className="students__table-row" data-id={student.id}>
                <td className="students__table-cell">
                  <img src={student.avatar} alt={`Student ${student.name}`} />
                </td>
                <td className="students__table-cell name-cell" data-label="Name">
                  {student.name}
                </td>
                <td className="students__table-cell email-cell" data-label="Email">
                  {student.email}
                </td>
                <td className="students__table-cell" data-label="Phone Number">
                  {student.phoneNum}
                </td>
                <td className="students__table-cell" data-label="Enroll Number">
                  {student.enrollNum}
                </td>
                <td className="students__table-cell" data-label="Date Admission">
                  {student.dateAdmission}
                </td>
                <td className="students__table-cell">
                  <div className="students__table-action">
                    <Button className="btn btn--edit" onClick={() => student.id && onEdit(student)}>
                      <img
                        src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742868082/edit_gxvseg.svg"
                        alt="Edit student"
                      />
                    </Button>
                    <Button
                      className="btn btn--delete"
                      onClick={() => student.id && onDelete(student)}
                    >
                      <img
                        src="https://res.cloudinary.com/ds82onf5q/image/upload/v1742868081/delete_oynjal.svg"
                        alt="Delete student"
                      />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default StudentList;
