import { GraphicType } from "../shared/graphictype.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class GraphicTypeListModel {
    constructor(
        public Data: GraphicType[],
        public Paging: PaginationModel
    ) { }
}