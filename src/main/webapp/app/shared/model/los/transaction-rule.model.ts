import { Moment } from 'moment';

export interface ITransactionRule {
    idRuleType?: number;
    ruleCode?: string;
    description?: string;
    dateFrom?: Date;
    dateThru?: Date;
    parentDescription?: string;
    parentId?: number;
    featureTypeDescription?: string;
    featureTypeId?: number;
    featureDescription?: string;
    featureId?: number;
}

export class TransactionRule implements ITransactionRule {
    constructor(
        public idRuleType?: number,
        public ruleCode?: string,
        public description?: string,
        public dateFrom?: Date,
        public dateThru?: Date,
        public parentDescription?: string,
        public parentId?: number,
        public featureTypeDescription?: string,
        public featureTypeId?: number,
        public featureDescription?: string,
        public featureId?: number
    ) {
        this.dateFrom = new Date();
        this.dateThru = new Date('9999-12-31T23:59:59');
    }
}
