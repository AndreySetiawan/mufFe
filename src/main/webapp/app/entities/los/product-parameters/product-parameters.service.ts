import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IProductParameters } from 'app/shared/model/los/product-parameters.model';
import { AbstractEntityService } from 'app/shared/base/abstract-entity.service';
import { createRequestOption } from 'app/shared';

@Injectable({ providedIn: 'root' })
export class ProductParametersService extends AbstractEntityService<IProductParameters> {
    constructor(protected http: HttpClient) {
        super(http);
        this.resourceUrl = SERVER_API_URL + 'los/api/product-parameters';
        this.resourceSearchUrl = SERVER_API_URL + 'los/api/_search/product-parameters';
    }

    protected convertDateFromServer(res: HttpResponse<IProductParameters>): HttpResponse<IProductParameters> {
        res.body.dateFrom = res.body.dateFrom != null ? new Date(res.body.dateFrom) : null;
        res.body.dateThru = res.body.dateThru != null ? new Date(res.body.dateThru) : null;
        return res;
    }

    protected convertDateArrayFromServer(res: HttpResponse<IProductParameters[]>): HttpResponse<IProductParameters[]> {
        res.body.forEach((productParameters: IProductParameters) => {
            productParameters.dateFrom = productParameters.dateFrom != null ? new Date(productParameters.dateFrom) : null;
            productParameters.dateThru = productParameters.dateThru != null ? new Date(productParameters.dateThru) : null;
        });
        return res;
    }
}
