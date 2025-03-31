import { SortField } from 'types/sort';
export interface SortOption {
  field: SortField;
  text: string;
}

export const SORT_FIELDS: SortOption[] = [
  { field: 'name', text: 'Name' },
  { field: 'email', text: 'Email' },
  { field: 'enrollNum', text: 'Enroll Number' },
  { field: 'phoneNum', text: 'Phone Number' },
  { field: 'dateAdmission', text: 'Date of Admission' },
];

export const SORT_ORDERS = [
  { order: 'asc', text: 'A to Z' },
  { order: 'desc', text: 'Z to A' },
];
