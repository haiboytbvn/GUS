import { Division } from "../shared/division.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class DivisionListModel {
    constructor(
        public Data: Division[],
        public Paging: PaginationModel
    ) { }
}