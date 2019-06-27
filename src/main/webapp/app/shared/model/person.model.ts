import { Moment } from 'moment';

export interface IPerson {
    idParty?: string;
    firstName?: string;
    lastName?: string;
    pob?: string;
    dob?: Date;
    bloodType?: string;
    gender?: string;
    personalIdNumber?: string;
    familyIdNumber?: string;
    taxIdNumber?: string;
    idWorkType?: number;
    idReligionType?: number;
    cellPhone1?: string;
    cellPhone2?: string;
    homePhone?: string;
    personalEmail?: string;
    mothersName?: string;
    notes?: string;
}

export class Person implements IPerson {
    constructor(
        public idParty?: string,
        public firstName?: string,
        public lastName?: string,
        public pob?: string,
        public dob?: Date,
        public bloodType?: string,
        public gender?: string,
        public personalIdNumber?: string,
        public familyIdNumber?: string,
        public taxIdNumber?: string,
        public idWorkType?: number,
        public idReligionType?: number,
        public cellPhone1?: string,
        public cellPhone2?: string,
        public homePhone?: string,
        public personalEmail?: string,
        public mothersName?: string,
        public notes?: string
    ) {}
}
