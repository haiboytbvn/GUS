import { FabricsProductName } from "../shared/fabricsproductname.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class FabricsProductNameListModel {
    constructor(
        public Data: FabricsProductName[],
        public Paging: PaginationModel
    ) { }
}