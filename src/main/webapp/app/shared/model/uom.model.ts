export interface IUom {
    idUom?: string;
    description?: string;
    abbreviation?: string;
    uomTypeDescription?: string;
    uomTypeId?: number;
}

export class Uom implements IUom {
    constructor(
        public idUom?: string,
        public description?: string,
        public abbreviation?: string,
        public uomTypeDescription?: string,
        public uomTypeId?: number
    ) {}
}
