import { IStudent } from 'types/student';

export const filterStudentsByQuery = (students: IStudent[], query: string): IStudent[] => {
  const normalizedQuery = query.toLowerCase().trim();
  return students.filter((student) => matchesSearchCriteria(student, normalizedQuery));
};

// Separate search matching logic
const matchesSearchCriteria = (student: IStudent, query: string): boolean => {
  const searchFields: Array<keyof IStudent> = [
    'name',
    'email',
    'phoneNum',
    'enrollNum',
    'dateAdmission',
  ];

  return searchFields.some(
    (field) => student[field]?.toString().toLowerCase().includes(query) ?? false,
  );
};
