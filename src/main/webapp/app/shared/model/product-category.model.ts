export interface IProductCategory {
    idCategory?: number;
    categoryCode?: string;
    refkey?: string;
    description?: string;
    parentDescription?: string;
    parentId?: number;
    categoryTypeDescription?: string;
    categoryTypeId?: number;
}

export class ProductCategory implements IProductCategory {
    constructor(
        public idCategory?: number,
        public categoryCode?: string,
        public refkey?: string,
        public description?: string,
        public parentDescription?: string,
        public parentId?: number,
        public categoryTypeDescription?: string,
        public categoryTypeId?: number
    ) {}
}
