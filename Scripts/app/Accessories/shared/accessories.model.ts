export class Accessory {
    constructor(
        public Id: string,
        public IsActive: boolean,
        public BuyerCode: string,
        public AccType: string,
        public AccCategory: string,
        public Description: string,
        public Brand: string,
        public Department: string,
        public Division:string,
        public ItemSize: string,
        public Supplier: string,
        public SupplierCode: string,
        public Image: string,
        public Color:string,
        public Remark:string,
        public AccProductName: string,
        public Images: string[],
        public Thumbnail:string
         
    ) { }
}