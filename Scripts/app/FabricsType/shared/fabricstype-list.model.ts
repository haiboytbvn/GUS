import { FabricsType } from "../shared/fabricstype.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class FabricsTypeListModel {
    constructor(
        public Data: FabricsType[],
        public Paging: PaginationModel
    ) { }
}