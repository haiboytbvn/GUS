import { Fabrics } from "../shared/fabric.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class FabricListModel {
    constructor(
        public Data: Fabrics[],
        public Paging: PaginationModel
    ) { }
}