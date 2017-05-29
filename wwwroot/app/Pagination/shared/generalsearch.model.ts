import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class GeneralSearchModel extends SearchGeneralFilter {
    constructor(
        public Name: string,
        public Code: string,
        public BuyerCode: string,
        public CompanyId: string,
        public Paging: PaginationModel
    ) {
        super(Name, Code, BuyerCode, CompanyId);
    }
}