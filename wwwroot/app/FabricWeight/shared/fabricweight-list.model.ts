import { FabricWeight } from "../shared/fabricweight.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class FabricWeightListModel {
    constructor(
        public Data: FabricWeight[],
        public Paging: PaginationModel
    ) { }
}