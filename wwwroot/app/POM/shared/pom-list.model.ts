import { POM } from "../shared/pom.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class POMListModel {
    constructor(
        public Data: POM[],
        public Paging: PaginationModel
    ) { }
}