import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IPartyCategory } from 'app/shared/model/party-category.model';
import { AbstractEntityService } from 'app/shared/base/abstract-entity.service';

@Injectable({ providedIn: 'root' })
export class PartyCategoryService extends AbstractEntityService<IPartyCategory> {
    constructor(protected http: HttpClient) {
        super(http);
        this.resourceUrl = SERVER_API_URL + 'los/api/party-categories';
        this.resourceSearchUrl = SERVER_API_URL + 'los/api/_search/party-categories';
    }
}
