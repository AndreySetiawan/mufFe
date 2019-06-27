import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IPartyCategoryType } from 'app/shared/model/party-category-type.model';
import { AbstractEntityService } from 'app/shared/base/abstract-entity.service';

@Injectable({ providedIn: 'root' })
export class PartyCategoryTypeService extends AbstractEntityService<IPartyCategoryType> {
    constructor(protected http: HttpClient) {
        super(http);
        this.resourceUrl = SERVER_API_URL + 'los/api/party-category-types';
        this.resourceSearchUrl = SERVER_API_URL + 'los/api/_search/party-category-types';
    }
}
