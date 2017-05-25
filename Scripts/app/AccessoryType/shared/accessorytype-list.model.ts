import { AccessoryType } from "../shared/accessorytype.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class AccessoryTypeListModel {
    constructor(
        public Data: AccessoryType[],
        public Paging: PaginationModel
    ) { }
}