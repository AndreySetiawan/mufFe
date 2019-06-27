import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { ICategoryScheme } from 'app/shared/model/category-scheme.model';
import { AbstractEntityService } from 'app/shared/base/abstract-entity.service';

@Injectable({ providedIn: 'root' })
export class CategorySchemeService extends AbstractEntityService<ICategoryScheme> {
    constructor(protected http: HttpClient) {
        super(http);
        this.resourceUrl = SERVER_API_URL + 'los/api/category-schemes';
        this.resourceSearchUrl = SERVER_API_URL + 'los/api/_search/category-schemes';
    }
}
