import { Moment } from 'moment';

export interface IPartyParameters {
    idParameter?: number;
    paramCode?: string;
    paramType?: string;
    description?: string;
    dateFrom?: Date;
    dateThru?: Date;
    schemeDescription?: string;
    schemeId?: number;
    sourceDescription?: string;
    sourceId?: number;
    sourceCode?: string;
    roleDescription?: string;
    roleId?: number;
    categoryTypeId?: number;
    categoryTypeDescription?: string;
    variableName?: string;
}

export class PartyParameters implements IPartyParameters {
    constructor(
        public idParameter?: number,
        public paramCode?: string,
        public paramType?: string,
        public description?: string,
        public dateFrom?: Date,
        public dateThru?: Date,
        public schemeDescription?: string,
        public schemeId?: number,
        public roleDescription?: string,
        public roleId?: number
    ) {
        this.dateFrom = new Date();
        this.dateThru = new Date('9999-12-30T23:59:59');
        this.paramType = 'list';
    }
}
