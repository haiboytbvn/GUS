export class ApplicationUser {
    constructor(
        public Id: string,
        public LastAccess: Date,
        public DateCreated: Date,
        public DateModified: Date,
        public IsActive: boolean,
        public UserName: string,
        public Email: string,
        public UserCode: string,
        public Slug: string,
        public CompanyId: string,
        public RoleId: string,
        public FirstName: string,
        public LastName: string,
        public checked: boolean
    ) { }
}