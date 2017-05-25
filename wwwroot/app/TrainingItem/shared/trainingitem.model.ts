export class TrainingItem {
    constructor(
        public Id: string,
        public IsActive: boolean,
        public Value: string,
        public DateCreated: Date,
        public DateModified: Date
    ) { }
}