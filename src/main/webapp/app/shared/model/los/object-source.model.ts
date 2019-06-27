export interface IObjectSource {
    idObjectSource?: number;
    sourceCode?: string;
    sourceType?: number;
    parameterName?: any;
    description?: string;
    queryString?: any;
}

export class ObjectSource implements IObjectSource {
    constructor(
        public idObjectSource?: number,
        public sourceCode?: string,
        public sourceType?: number,
        public description?: string,
        public queryString?: any
    ) {}
}
