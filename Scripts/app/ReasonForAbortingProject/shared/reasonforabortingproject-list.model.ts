import { ReasonForAbortingProject } from "../shared/reasonforabortingproject.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class ReasonForAbortingProjectListModel {
    constructor(
        public Data: ReasonForAbortingProject[],
        public Paging: PaginationModel
    ) { }
}