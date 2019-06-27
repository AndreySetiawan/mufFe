export interface IFeature {
    idFeature?: number;
    featureCode?: string;
    refkey?: string;
    description?: string;
    featureTypeDescription?: string;
    featureTypeId?: number;
}

export class Feature implements IFeature {
    constructor(
        public idFeature?: number,
        public featureCode?: string,
        public refkey?: string,
        public description?: string,
        public featureTypeDescription?: string,
        public featureTypeId?: number
    ) {}
}
