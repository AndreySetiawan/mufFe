import { Moment } from 'moment';

export interface IPartyClassification {
    idClassification?: number;
    dateFrom?: Date;
    dateThru?: Date;
    categoryTypeDescription?: string;
    categoryTypeId?: number;
    categoryDescription?: string;
    categoryId?: number;
    partyName?: string;
    partyId?: string;
}

export class PartyClassification implements IPartyClassification {
    constructor(
        public idClassification?: number,
        public dateFrom?: Date,
        public dateThru?: Date,
        public categoryTypeDescription?: string,
        public categoryTypeId?: number,
        public categoryDescription?: string,
        public categoryId?: number,
        public partyName?: string,
        public partyId?: string
    ) {
        this.dateFrom = new Date();
        this.dateThru = new Date('9999-12-31T23:59:59');
    }
}
