export interface IWorkType {
    idWorkType?: number;
    description?: string;
    fixedIncome?: boolean;
    sensitive?: boolean;
}

export class WorkType implements IWorkType {
    constructor(public idWorkType?: number, public description?: string, public fixedIncome?: boolean, public sensitive?: boolean) {
        this.fixedIncome = this.fixedIncome || false;
        this.sensitive = this.sensitive || false;
    }
}
