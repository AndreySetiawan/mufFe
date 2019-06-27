import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IProductClassification } from 'app/shared/model/product-classification.model';
import { AbstractEntityService } from 'app/shared/base/abstract-entity.service';
import { createRequestOption } from 'app/shared';

@Injectable({ providedIn: 'root' })
export class ProductClassificationService extends AbstractEntityService<IProductClassification> {
    constructor(protected http: HttpClient) {
        super(http);
        this.resourceUrl = SERVER_API_URL + 'los/api/product-classifications';
        this.resourceSearchUrl = SERVER_API_URL + 'los/api/_search/product-classifications';
    }

    protected convertDateFromServer(res: HttpResponse<IProductClassification>): HttpResponse<IProductClassification> {
        res.body.dateFrom = res.body.dateFrom != null ? new Date(res.body.dateFrom) : null;
        res.body.dateThru = res.body.dateThru != null ? new Date(res.body.dateThru) : null;
        return res;
    }

    protected convertDateArrayFromServer(res: HttpResponse<IProductClassification[]>): HttpResponse<IProductClassification[]> {
        res.body.forEach((productClassification: IProductClassification) => {
            productClassification.dateFrom = productClassification.dateFrom != null ? new Date(productClassification.dateFrom) : null;
            productClassification.dateThru = productClassification.dateThru != null ? new Date(productClassification.dateThru) : null;
        });
        return res;
    }
}
