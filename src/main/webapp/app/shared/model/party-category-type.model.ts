export interface IPartyCategoryType {
    idCategoryType?: number;
    typeCode?: string;
    refkey?: string;
    description?: string;
    schemeDescription?: string;
    schemeId?: number;
}

export class PartyCategoryType implements IPartyCategoryType {
    constructor(
        public idCategoryType?: number,
        public typeCode?: string,
        public refkey?: string,
        public description?: string,
        public schemeDescription?: string,
        public schemeId?: number
    ) {}
}
