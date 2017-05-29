export class PaginationModel {
    constructor(
        public PageSize: number,
        public PageNumber: number,
        public Sort: string,
        public Total: number,
        public PageCount: number[],
        public Show: number
    ) { }
}