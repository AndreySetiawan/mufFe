export interface ICategoryScheme {
    idScheme?: number;
    description?: string;
    parentDescription?: string;
    parentId?: number;
}

export class CategoryScheme implements ICategoryScheme {
    constructor(public idScheme?: number, public description?: string, public parentDescription?: string, public parentId?: number) {}
}
