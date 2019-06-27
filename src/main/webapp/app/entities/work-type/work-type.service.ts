import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IWorkType } from 'app/shared/model/work-type.model';
import { AbstractEntityService } from 'app/shared/base/abstract-entity.service';

@Injectable({ providedIn: 'root' })
export class WorkTypeService extends AbstractEntityService<IWorkType> {
    constructor(protected http: HttpClient) {
        super(http);
        this.resourceUrl = SERVER_API_URL + 'los/api/work-types';
        this.resourceSearchUrl = SERVER_API_URL + 'los/api/_search/work-types';
    }
}
