import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IPerson } from 'app/shared/model/person.model';
import { AbstractEntityService } from 'app/shared/base/abstract-entity.service';
import { createRequestOption } from 'app/shared';

@Injectable({ providedIn: 'root' })
export class PersonService extends AbstractEntityService<IPerson> {
    constructor(protected http: HttpClient) {
        super(http);
        this.resourceUrl = SERVER_API_URL + 'los/api/people';
        this.resourceSearchUrl = SERVER_API_URL + 'los/api/_search/people';
    }

    protected convertDateFromServer(res: HttpResponse<IPerson>): HttpResponse<IPerson> {
        res.body.dob = res.body.dob != null ? new Date(res.body.dob) : null;
        return res;
    }

    protected convertDateArrayFromServer(res: HttpResponse<IPerson[]>): HttpResponse<IPerson[]> {
        res.body.forEach((person: IPerson) => {
            person.dob = person.dob != null ? new Date(person.dob) : null;
        });
        return res;
    }
}
