import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IProductCategory } from 'app/shared/model/product-category.model';
import { AbstractEntityService } from 'app/shared/base/abstract-entity.service';

@Injectable({ providedIn: 'root' })
export class ProductCategoryService extends AbstractEntityService<IProductCategory> {
    constructor(protected http: HttpClient) {
        super(http);
        this.resourceUrl = SERVER_API_URL + 'los/api/product-categories';
        this.resourceSearchUrl = SERVER_API_URL + 'los/api/_search/product-categories';
    }
}
