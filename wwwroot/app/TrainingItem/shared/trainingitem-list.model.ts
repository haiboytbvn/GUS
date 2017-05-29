import { TrainingItem } from "../shared/trainingitem.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class TrainingItemListModel {
    constructor(
        public Data: TrainingItem[],
        public Paging: PaginationModel
    ) { }
}