import { WashType } from "../shared/washtype.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class WashTypeListModel {
    constructor(
        public Data: WashType[],
        public Paging: PaginationModel
    ) { }
}