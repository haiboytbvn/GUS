import { WashCategory } from "../shared/washcategory.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class WashCategoryListModel {
    constructor(
        public Data: WashCategory[],
        public Paging: PaginationModel
    ) { }
}