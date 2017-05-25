export class Vendor {
    constructor(
        public Id: string,
        public LastAccess: Date,
        public DateCreated: Date,
        public DateModified: Date,
        public IsActive: boolean,

        public UserName: string,
        public Email: string,

        public SearchName: string,
        public Address: string,
        public PostalCode: string,
        public City: string,
        public Country: string,
        public Tel: string,
        public Fax: string,
        public Homepage: string,
        public PaymentTerm: string,
        public DeliveryTerm: string,

        public Type: string,
        public ProductType:string,

        public checked: boolean
    ) { }
}