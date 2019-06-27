import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IProduct } from 'app/shared/model/product.model';
import { AbstractEntityService } from 'app/shared/base/abstract-entity.service';
import { createRequestOption } from 'app/shared';

@Injectable({ providedIn: 'root' })
export class ProductService extends AbstractEntityService<IProduct> {
    constructor(protected http: HttpClient) {
        super(http);
        this.resourceUrl = SERVER_API_URL + 'los/api/products';
        this.resourceSearchUrl = SERVER_API_URL + 'los/api/_search/products';
    }

    protected convertDateFromServer(res: HttpResponse<IProduct>): HttpResponse<IProduct> {
        res.body.dateIntroduction = res.body.dateIntroduction != null ? new Date(res.body.dateIntroduction) : null;
        res.body.dateDiscontinue = res.body.dateDiscontinue != null ? new Date(res.body.dateDiscontinue) : null;
        return res;
    }

    protected convertDateArrayFromServer(res: HttpResponse<IProduct[]>): HttpResponse<IProduct[]> {
        res.body.forEach((product: IProduct) => {
            product.dateIntroduction = product.dateIntroduction != null ? new Date(product.dateIntroduction) : null;
            product.dateDiscontinue = product.dateDiscontinue != null ? new Date(product.dateDiscontinue) : null;
        });
        return res;
    }
}
