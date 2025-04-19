/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Page<T> {
    data: Page<import("/Users/miguelamaral/Documents/dev/site-hub-inovacao/hub-inovacao/src/features/projects/project.interface").Project>;
    page: any;
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  }