export interface IParty {
    idParty?: string;
    dType?: number;
}

export class Party implements IParty {
    constructor(public idParty?: string, public dType?: number) {}
}
