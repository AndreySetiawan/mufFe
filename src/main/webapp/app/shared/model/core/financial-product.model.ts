import { Moment } from 'moment';

export interface IFinancialProduct {
    idProduct?: string;
    name?: string;
    dateIntroduction?: Date;
    dateDiscontinue?: Date;
    taxable?: boolean;
    priceType?: number;
    productTypeDescription?: string;
    productTypeId?: number;
}

export class FinancialProduct implements IFinancialProduct {
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
