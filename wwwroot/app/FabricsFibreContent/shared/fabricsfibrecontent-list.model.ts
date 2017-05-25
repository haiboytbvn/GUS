import { FabricsFibreContent } from "../shared/fabricsfibrecontent.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class FabricsFibreContentListModel {
    constructor(
        public Data: FabricsFibreContent[],
        public Paging: PaginationModel
    ) { }
}