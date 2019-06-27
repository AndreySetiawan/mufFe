export interface IOrganization {
    idParty?: string;
    name?: string;
    phoneNumber?: string;
    faxNumber?: string;
    taxIdNumber?: string;
}

export class Organization implements IOrganization {
    constructor(
        public idParty?: string,
        public name?: string,
        public phoneNumber?: string,
        public faxNumber?: string,
        public taxIdNumber?: string
    ) {}
}
