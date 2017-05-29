import { AccessoryCategory } from "../shared/accessorycategory.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class AccessoryCategoryListModel {
    constructor(
        public Data: AccessoryCategory[],
        public Paging: PaginationModel
    ) { }
}