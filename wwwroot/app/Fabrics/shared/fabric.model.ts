export class Fabrics {
    constructor(
        public Id: string,
        public IsActive: boolean,
        public Code: string,
        public BuyerCode: string,
        public FabCategory: string,
        public Image: string,
        public FabYarnCount: string,
        public FabFibreContent: string,
        public FabFinishing: string,
        public FabricWeight: string,
        public Supplier: string,
        public SupplierCode: string,
        public FabType: string,
        public Brand: string,
        public Department: string,
        public Division: string,
        public Remark: string,
        public Color: string,
        public FabProductType: string,
        public FabProductName: string,
        public Description: string,
        public Images: string[],
        public Thumbnail: string
    ) { }
}