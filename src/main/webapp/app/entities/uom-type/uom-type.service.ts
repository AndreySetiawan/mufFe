import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IUomType } from 'app/shared/model/uom-type.model';
import { AbstractEntityService } from 'app/shared/base/abstract-entity.service';

@Injectable({ providedIn: 'root' })
export class UomTypeService extends AbstractEntityService<IUomType> {
    constructor(protected http: HttpClient) {
        super(http);
        this.resourceUrl = SERVER_API_URL + 'los/api/uom-types';
        this.resourceSearchUrl = SERVER_API_URL + 'los/api/_search/uom-types';
    }
}
