import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
import { PaginationModel } from "../../Pagination/shared/pagination.model";
export class AccessorySearchModel extends SearchGeneralFilter  {
    constructor(
        public Name: string,
        public Code: string,
        public BuyerCode: string,
        public CompanyId: string,
        public Paging: PaginationModel,
        public TypeId: string,
        public CateId: string,
        public ProductNameId: string
      
    ) {
        super(Name,Code,BuyerCode,CompanyId);
    }
}