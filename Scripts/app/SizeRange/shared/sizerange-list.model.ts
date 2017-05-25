import { SizeRange } from "../shared/sizerange.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class SizeRangeListModel {
    constructor(
        public Data: SizeRange[],
        public Paging: PaginationModel
    ) { }
}