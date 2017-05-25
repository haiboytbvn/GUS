import { Accessory } from "../shared/accessories.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class AccessoryListModel {
    constructor(
        public Data: Accessory[],
        public Paging: PaginationModel
    ) { }
}