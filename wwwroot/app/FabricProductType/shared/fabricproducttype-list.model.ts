import { FabricProductType } from "../shared/fabricproducttype.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class FabricProductTypeListModel {
    constructor(
        public Data: FabricProductType[],
        public Paging: PaginationModel
    ) { }
}