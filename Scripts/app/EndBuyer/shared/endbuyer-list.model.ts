import { EndBuyer } from "../shared/endbuyer.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class EndBuyerListModel {
    constructor(
        public Data: EndBuyer[],
        public Paging: PaginationModel
    ) { }
}