import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IFeatureApplicable } from 'app/shared/model/feature-applicable.model';
import { AbstractEntityService } from 'app/shared/base/abstract-entity.service';
import { createRequestOption } from 'app/shared';

@Injectable({ providedIn: 'root' })
export class FeatureApplicableService extends AbstractEntityService<IFeatureApplicable> {
    constructor(protected http: HttpClient) {
        super(http);
        this.resourceUrl = SERVER_API_URL + 'los/api/feature-applicables';
        this.resourceSearchUrl = SERVER_API_URL + 'los/api/_search/feature-applicables';
    }

    protected convertDateFromServer(res: HttpResponse<IFeatureApplicable>): HttpResponse<IFeatureApplicable> {
        res.body.dateFrom = res.body.dateFrom != null ? new Date(res.body.dateFrom) : null;
        res.body.dateThru = res.body.dateThru != null ? new Date(res.body.dateThru) : null;
        return res;
    }

    protected convertDateArrayFromServer(res: HttpResponse<IFeatureApplicable[]>): HttpResponse<IFeatureApplicable[]> {
        res.body.forEach((featureApplicable: IFeatureApplicable) => {
            featureApplicable.dateFrom = featureApplicable.dateFrom != null ? new Date(featureApplicable.dateFrom) : null;
            featureApplicable.dateThru = featureApplicable.dateThru != null ? new Date(featureApplicable.dateThru) : null;
        });
        return res;
    }
}
