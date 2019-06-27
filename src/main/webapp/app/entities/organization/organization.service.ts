import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IOrganization } from 'app/shared/model/organization.model';
import { AbstractEntityService } from 'app/shared/base/abstract-entity.service';

@Injectable({ providedIn: 'root' })
export class OrganizationService extends AbstractEntityService<IOrganization> {
    constructor(protected http: HttpClient) {
        super(http);
        this.resourceUrl = SERVER_API_URL + 'los/api/organizations';
        this.resourceSearchUrl = SERVER_API_URL + 'los/api/_search/organizations';
    }
}
