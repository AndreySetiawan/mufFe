import { Moment } from 'moment';

export interface IProduct {
    idProduct?: string;
    name?: string;
    dateIntroduction?: Date;
    dateDiscontinue?: Date;
    taxable?: boolean;
    priceType?: number;
    productTypeDescription?: string;
    productTypeId?: number;
}

export class Product implements IProduct {
    constructor(
        public idProduct?: string,
        public name?: string,
        public dateIntroduction?: Date,
        public dateDiscontinue?: Date,
        public taxable?: boolean,
        public priceType?: number,
        public productTypeDescription?: string,
        public productTypeId?: number
    ) {
        this.taxable = this.taxable || false;
    }
}
