export interface IRoleType {
    idRoleType?: number;
    description?: string;
    parentDescription?: string;
    parentId?: number;
}

export class RoleType implements IRoleType {
    constructor(public idRoleType?: number, public description?: string, public parentDescription?: string, public parentId?: number) {}
}
