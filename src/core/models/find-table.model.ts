export class findTableModel {
  pageSize: number;
  page: number;

  constructor(pageSize = 25, page = 1) {
    this.page = page;
    this.pageSize = pageSize;
  }
}

export class findTableResponseModel {
  pageSize: number;
  page: number;
  table: any;
  totalCount: number;
  totalPages: number;
}
