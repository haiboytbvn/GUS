import { Year } from "../shared/year.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class YearListModel {
    constructor(
        public Data: Year[],
        public Paging: PaginationModel
    ) { }
}