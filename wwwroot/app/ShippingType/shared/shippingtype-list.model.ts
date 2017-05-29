import { ShippingType } from "../shared/shippingtype.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class ShippingTypeListModel {
    constructor(
        public Data: ShippingType[],
        public Paging: PaginationModel
    ) { }
}