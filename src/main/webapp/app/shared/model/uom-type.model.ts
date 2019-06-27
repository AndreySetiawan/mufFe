export interface IUomType {
    idUomType?: number;
    description?: string;
}

export class UomType implements IUomType {
    constructor(public idUomType?: number, public description?: string) {}
}
