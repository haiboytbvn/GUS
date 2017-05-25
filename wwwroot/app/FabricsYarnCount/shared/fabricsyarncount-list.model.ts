import { FabricsYarnCount } from "../shared/fabricsyarncount.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class FabricsYarnCountListModel {
    constructor(
        public Data: FabricsYarnCount[],
        public Paging: PaginationModel
    ) { }
}