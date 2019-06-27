import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IRoleType } from 'app/shared/model/role-type.model';
import { AbstractEntityService } from 'app/shared/base/abstract-entity.service';

@Injectable({ providedIn: 'root' })
export class RoleTypeService extends AbstractEntityService<IRoleType> {
    constructor(protected http: HttpClient) {
        super(http);
        this.resourceUrl = SERVER_API_URL + 'los/api/role-types';
        this.resourceSearchUrl = SERVER_API_URL + 'los/api/_search/role-types';
    }
}
