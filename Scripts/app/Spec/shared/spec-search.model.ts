﻿import { SearchGeneralFilter } from "../../SearchGeneralFilter/shared/searchGeneralFilter.model";
export class SpecSearchModel extends SearchGeneralFilter  {
    constructor(
        public Name: string,
        public Code: string,
        public BuyerCode: string,
        public CompanyId: string 
      
    ) {
        super(Name,Code,BuyerCode,CompanyId);
    }
}