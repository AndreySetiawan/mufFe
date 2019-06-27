import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IFeature } from 'app/shared/model/feature.model';
import { AbstractEntityService } from 'app/shared/base/abstract-entity.service';

@Injectable({ providedIn: 'root' })
export class FeatureService extends AbstractEntityService<IFeature> {
    constructor(protected http: HttpClient) {
        super(http);
        this.resourceUrl = SERVER_API_URL + 'los/api/features';
        this.resourceSearchUrl = SERVER_API_URL + 'los/api/_search/features';
    }
}
