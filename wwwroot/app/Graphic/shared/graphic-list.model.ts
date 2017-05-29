import { Graphic } from "../shared/graphic.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class GraphicListModel {
    constructor(
        public Data: Graphic[],
        public Paging: PaginationModel
    ) { }
}