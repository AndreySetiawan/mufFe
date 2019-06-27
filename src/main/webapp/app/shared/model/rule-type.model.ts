export interface IRuleType {
    idRuleType?: number;
    description?: string;
    parentDescription?: string;
    parentId?: number;
}

export class RuleType implements IRuleType {
    constructor(public idRuleType?: number, public description?: string, public parentDescription?: string, public parentId?: number) {}
}
