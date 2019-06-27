import { Moment } from 'moment';

export interface IFeatureApplicable {
    idApplicability?: string;
    value?: boolean;
    dateFrom?: Date;
    dateThru?: Date;
    featureTypeDescription?: string;
    featureTypeCode?: string;
    featureTypeId?: number;
    featureDescription?: string;
    featureId?: number;
    featureCode?: string;
    productName?: string;
    productId?: string;
}

export class FeatureApplicable implements IFeatureApplicable {
    constructor(
        public idApplicability?: string,
        public value?: boolean,
        public dateFrom?: Date,
        public dateThru?: Date,
        public featureTypeDescription?: string,
        public featureTypeId?: number,
        public featureDescription?: string,
        public featureId?: number,
        public featureCode?: string,
        public featureTypeCode?: string,
        public productName?: string,
        public productId?: string
    ) {
        this.value = this.value || false;
        this.dateFrom = new Date();
        this.dateThru = new Date('9999-12-31T23:59:59');
    }
}
