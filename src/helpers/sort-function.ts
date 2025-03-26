import { IStudent } from 'types/student';
import { ISortConfig } from 'types/sort';
export const sortStudents = (students: IStudent[], config: ISortConfig): IStudent[] => {
  const { field, order } = config;

  return [...students].sort((a, b) => {
    let comparison = 0;
    switch (field) {
      case 'name':
        comparison = (a.name ?? '').localeCompare(b.name ?? '');
        break;
      case 'email':
        comparison = (a.email ?? '').localeCompare(b.email ?? '');
        break;
      case 'phoneNum':
        comparison = (a.phoneNum ?? '').localeCompare(b.phoneNum ?? '');
        break;
      case 'enrollNum':
        comparison = (a.enrollNum ?? '').localeCompare(b.enrollNum ?? '');
        break;
      case 'dateAdmission': {
        const dateA = a.dateAdmission ? new Date(a.dateAdmission) : new Date(0);
        const dateB = b.dateAdmission ? new Date(b.dateAdmission) : new Date(0);
        comparison = dateA.getTime() - dateB.getTime();
        break;
      }
    }
    return order === 'asc' ? comparison : -comparison;
  });
};
