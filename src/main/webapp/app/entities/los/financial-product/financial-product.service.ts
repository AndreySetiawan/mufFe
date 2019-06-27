import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IFinancialProduct } from 'app/shared/model/los/financial-product.model';
import { AbstractEntityService } from 'app/shared/base/abstract-entity.service';
import { createRequestOption } from 'app/shared';

@Injectable({ providedIn: 'root' })
export class FinancialProductService extends AbstractEntityService<IFinancialProduct> {
    constructor(protected http: HttpClient) {
        super(http);
        this.resourceUrl = SERVER_API_URL + 'los/api/financial-products';
        this.resourceSearchUrl = SERVER_API_URL + 'los/api/_search/financial-products';
    }

    protected convertDateFromServer(res: HttpResponse<IFinancialProduct>): HttpResponse<IFinancialProduct> {
        res.body.dateIntroduction = res.body.dateIntroduction != null ? new Date(res.body.dateIntroduction) : null;
        res.body.dateDiscontinue = res.body.dateDiscontinue != null ? new Date(res.body.dateDiscontinue) : null;
        return res;
    }

    protected convertDateArrayFromServer(res: HttpResponse<IFinancialProduct[]>): HttpResponse<IFinancialProduct[]> {
        res.body.forEach((financialProduct: IFinancialProduct) => {
            financialProduct.dateIntroduction =
                financialProduct.dateIntroduction != null ? new Date(financialProduct.dateIntroduction) : null;
            financialProduct.dateDiscontinue = financialProduct.dateDiscontinue != null ? new Date(financialProduct.dateDiscontinue) : null;
        });
        return res;
    }
}
