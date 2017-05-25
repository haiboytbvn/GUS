import { ParentMenuItem} from "../shared/parentmenu.model"; 
export class AncestorMenuItem {
    constructor(  
        public Text: string,
        public Value:string,    
        public Items: ParentMenuItem[]
    ) { }
}