import {MenuItem} from "../shared/menuitem.model"; 
export class ParentMenuItem {
    constructor(   
        public Text: string,
        public Value:string,   
        public Items: MenuItem
    ) { }
}