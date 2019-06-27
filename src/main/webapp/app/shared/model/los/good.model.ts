import { Moment } from 'moment';

export interface IGood {
    idProduct?: string;
    name?: string;
    dateIntroduction?: Date;
    dateDiscontinue?: Date;
    taxable?: boolean;
    priceType?: number;
    serialized?: boolean;
    productTypeDescription?: string;
    productTypeId?: number;
    uomDescription?: string;
    uomId?: string;
}

export class Good implements IGood {
    constructor(
        public idProduct?: string,
        public name?: string,
        public dateIntroduction?: Date,
        public dateDiscontinue?: Date,
        public taxable?: boolean,
        public priceType?: number,
        public serialized?: boolean,
        public productTypeDescription?: string,
        public productTypeId?: number,
        public uomDescription?: string,
        public uomId?: string
    ) {
        this.taxable = this.taxable || false;
        this.serialized = this.serialized || false;
    }
}
