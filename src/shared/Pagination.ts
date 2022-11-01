export default class Pagination {
  skip: number;
  limit: number;

  constructor(skip: number, limit: number){
    this.skip = skip || 0;
    this.limit = limit || 0;
  }
}
