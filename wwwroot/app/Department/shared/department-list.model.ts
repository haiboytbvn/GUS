import { Department } from "../shared/department.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class DepartmentListModel {
    constructor(
        public Data: Department[],
        public Paging: PaginationModel
    ) { }
}