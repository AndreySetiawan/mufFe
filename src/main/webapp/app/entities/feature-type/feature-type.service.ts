import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IFeatureType } from 'app/shared/model/feature-type.model';
import { AbstractEntityService } from 'app/shared/base/abstract-entity.service';

@Injectable({ providedIn: 'root' })
export class FeatureTypeService extends AbstractEntityService<IFeatureType> {
    constructor(protected http: HttpClient) {
        super(http);
        this.resourceUrl = SERVER_API_URL + 'los/api/feature-types';
        this.resourceSearchUrl = SERVER_API_URL + 'los/api/_search/feature-types';
    }
}
