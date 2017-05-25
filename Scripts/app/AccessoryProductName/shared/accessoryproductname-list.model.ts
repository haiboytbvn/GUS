import { AccessoryProductName } from "../shared/accessoryproductname.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class AccessoryProductNameListModel {
    constructor(
        public Data: AccessoryProductName[],
        public Paging: PaginationModel
    ) { }
}