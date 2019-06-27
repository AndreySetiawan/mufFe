import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IRuleType } from 'app/shared/model/rule-type.model';
import { AbstractEntityService } from 'app/shared/base/abstract-entity.service';

@Injectable({ providedIn: 'root' })
export class RuleTypeService extends AbstractEntityService<IRuleType> {
    constructor(protected http: HttpClient) {
        super(http);
        this.resourceUrl = SERVER_API_URL + 'los/api/rule-types';
        this.resourceSearchUrl = SERVER_API_URL + 'los/api/_search/rule-types';
    }
}
