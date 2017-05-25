import { GraphicCategory } from "../shared/graphiccategory.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class GraphicCategoryListModel {
    constructor(
        public Data: GraphicCategory[],
        public Paging: PaginationModel
    ) { }
}