export interface IProductType {
    idProductType?: number;
    description?: string;
}

export class ProductType implements IProductType {
    constructor(public idProductType?: number, public description?: string) {}
}
