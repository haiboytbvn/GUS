import { Wash } from "../shared/wash.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class WashListModel {
    constructor(
        public Data: Wash[],
        public Paging: PaginationModel
    ) { }
}