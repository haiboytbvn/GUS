import { GraphicProductName } from "../shared/graphicproductname.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class GraphicProductNameListModel {
    constructor(
        public Data: GraphicProductName[],
        public Paging: PaginationModel
    ) { }
}