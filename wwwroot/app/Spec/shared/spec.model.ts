export class Spec {
    constructor(
        public Id: string,
        public DateCreated: Date,
        public DateModified: Date,
        public IsActive: boolean,
        public CompanyId: string,
        public Name: string,
        public Code: string,
        public Slug: string,
        public BuyerCode: string,
        public SizeRange: string,
        public GuidedSpecSize: string,
        public checked: boolean
    ) { }
}