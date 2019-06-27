import { Moment } from 'moment';

export interface IProductClassification {
    idClassification?: number;
    dateFrom?: Date;
    dateThru?: Date;
    categoryTypeDescription?: string;
    categoryTypeId?: number;
    categoryDescription?: string;
    categoryId?: number;
    productName?: string;
    productId?: string;
}

export class ProductClassification implements IProductClassification {
    constructor(
        public idClassification?: number,
        public dateFrom?: Date,
        public dateThru?: Date,
        public categoryTypeDescription?: string,
        public categoryTypeId?: number,
        public categoryDescription?: string,
        public categoryId?: number,
        public productName?: string,
        public productId?: string
    ) {}
}
