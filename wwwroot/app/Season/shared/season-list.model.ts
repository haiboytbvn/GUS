import { Season } from "../shared/season.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class SeasonListModel {
    constructor(
        public Data: Season[],
        public Paging: PaginationModel
    ) { }
}