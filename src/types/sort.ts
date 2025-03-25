export type SortField = 'name' | 'email' | 'phoneNum' | 'enrollNum' | 'dateAdmission';
export type SortOrder = 'asc' | 'desc';

export interface ISortConfig {
  field: SortField;
  order: SortOrder;
}
