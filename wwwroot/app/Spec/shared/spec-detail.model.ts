import { Spec } from "../shared/spec.model";
import { POMofSpecModel } from "../shared/pomofspec.model";
export class SpecDetailModel{
    constructor(
        public Spec: Spec,
        public POMs: POMofSpecModel
      
    ) {
       
    }
}