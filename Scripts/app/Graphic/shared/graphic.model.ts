export class Graphic {
    constructor(
        public Id: string,
        public IsActive: boolean,
        public BuyerCode: string,
        public Brand: string,
        public Department: string,
        public Division: string,
        public Image: string,
        public GraphicProductName: string,
        public GraphicType: string,
        public GraphicCategory: string,
        public Description: string,
        public ItemSize: string,
        public Supplier: string,
        public SupplierCode: string,
        public Remark: string,
        public Color: string,
        public Images: string[],
        public Thumbnail: string
    ) { }
}