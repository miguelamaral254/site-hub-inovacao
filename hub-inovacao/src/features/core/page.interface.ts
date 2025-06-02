
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Page<T> {
    data: Page<T>
    page: any;
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  }