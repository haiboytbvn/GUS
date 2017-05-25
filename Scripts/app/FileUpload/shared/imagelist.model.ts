import { FileUpLoadModel} from "../../FileUpload/shared/fileupload.model";
export class ImageListModel {
    constructor(
        public MainImage: string,
        public MainAlt: string,
        public Images: FileUpLoadModel[]
       
    ) { }
}