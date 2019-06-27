export interface ITask {
    id?: string;
    definitionKey?: string;
    name?: string;
    formKey?: string;
    taskType?: number;
}

export class Task implements ITask {
    constructor(
        public id?: string,
        public definitionKey?: string,
        public name?: string,
        public formKey?: string,
        public taskType?: number
    ) {}
}
