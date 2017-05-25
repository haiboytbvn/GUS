import { FabricsFinishing } from "../shared/fabricsfinishing.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class FabricsFinishingListModel {
    constructor(
        public Data: FabricsFinishing[],
        public Paging: PaginationModel
    ) { }
}