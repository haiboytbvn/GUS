import { FabricsCategory } from "../shared/fabricscategory.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class FabricsCategoryListModel {
    constructor(
        public Data: FabricsCategory[],
        public Paging: PaginationModel
    ) { }
}