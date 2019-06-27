export interface IPartyCategory {
    idCategory?: number;
    categoryCode?: string;
    refkey?: string;
    description?: string;
    categoryTypeDescription?: string;
    categoryTypeId?: number;
}

export class PartyCategory implements IPartyCategory {
    constructor(
        public idCategory?: number,
        public categoryCode?: string,
        public refkey?: string,
        public description?: string,
        public categoryTypeDescription?: string,
        public categoryTypeId?: number
    ) {}
}
