import { Brand } from "../shared/brand.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class BrandListModel {
    constructor(
        public Data: Brand[],
        public Paging: PaginationModel
    ) { }
}