import { SortField, SortOrder } from 'types/sort';
export interface SortOption {
  field: SortField;
  order: SortOrder;
  text: string;
}

export const SORT_OPTIONS: SortOption[] = [
  { field: 'name', order: 'asc', text: 'Name A-Z' },
  { field: 'name', order: 'desc', text: 'Name Z-A' },
  { field: 'email', order: 'asc', text: 'Email A-Z' },
  { field: 'email', order: 'desc', text: 'Email Z-A' },
  { field: 'enrollNum', order: 'asc', text: 'Enroll Number A-Z' },
  { field: 'enrollNum', order: 'desc', text: 'Enroll Number Z-A' },
  { field: 'phoneNum', order: 'asc', text: 'Phone Number A-Z' },
  { field: 'phoneNum', order: 'desc', text: 'Phone Number Z-A' },
  { field: 'dateAdmission', order: 'asc', text: 'Date of Admission A-Z' },
  { field: 'dateAdmission', order: 'desc', text: 'Date of Admission Z-A' },
];
