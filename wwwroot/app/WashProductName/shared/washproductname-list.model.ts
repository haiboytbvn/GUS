import { WashProductName } from "../shared/washproductname.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class WashProductNameListModel {
    constructor(
        public Data: WashProductName[],
        public Paging: PaginationModel
    ) { }
}