export interface IFeatureType {
    idFeatureType?: number;
    typeCode?: string;
    refkey?: string;
    description?: string;
}

export class FeatureType implements IFeatureType {
    constructor(public idFeatureType?: number, public typeCode?: string, public refkey?: string, public description?: string) {}
}
