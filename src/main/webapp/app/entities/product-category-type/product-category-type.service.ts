import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IProductCategoryType } from 'app/shared/model/product-category-type.model';
import { AbstractEntityService } from 'app/shared/base/abstract-entity.service';

@Injectable({ providedIn: 'root' })
export class ProductCategoryTypeService extends AbstractEntityService<IProductCategoryType> {
    constructor(protected http: HttpClient) {
        super(http);
        this.resourceUrl = SERVER_API_URL + 'los/api/product-category-types';
        this.resourceSearchUrl = SERVER_API_URL + 'los/api/_search/product-category-types';
    }
}
