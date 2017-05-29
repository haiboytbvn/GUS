import { Training } from "../shared/training.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class TrainingListModel {
    constructor(
        public Data: Training[],
        public Paging: PaginationModel
    ) { }
}