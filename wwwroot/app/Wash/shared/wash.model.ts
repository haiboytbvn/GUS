export class Wash {
    constructor(
        public Id: string,
        public IsActive: boolean,
        public BuyerCode: string,
        public WashCategory: string,
        public WashProductName: string,
        public WashType: string,
        public Description: string,
        public Brand: string,
        public Department: string,
        public Division: string,
        public Color: string,
        public Supplier: string,
        public SupplierCode: string,
        public Recipe: string,
        public Remark:string,
        public Image:string,
        public Images: string[],
        public Thumbnail:string
    ) { }
}