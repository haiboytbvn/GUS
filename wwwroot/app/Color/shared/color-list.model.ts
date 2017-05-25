import { Color } from "../shared/color.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class ColorListModel {
    constructor(
        public Data: Color[],
        public Paging: PaginationModel
    ) { }
}