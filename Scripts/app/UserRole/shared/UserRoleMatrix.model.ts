export class UserRoleMatrix {
    constructor(
        public Id: string,
        public DateCreated: Date,
        public DateModified: Date,
        public IsActive: boolean,
        public Name: string,

        public MatrixId: string,
        //public PremissionName: string,
        public PremissionLevel: string,

        public checked: boolean
    ) { }
}