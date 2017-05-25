export class VendorProductType {
    constructor(
        public Id: string,
        public DateCreated: Date,
        public DateModified: Date,
        public IsActive: boolean,
        public Name: string,
        public checked: boolean
    ) { }
}