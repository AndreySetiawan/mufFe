import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IObjectSource } from 'app/shared/model/los/object-source.model';
import { AbstractEntityService } from 'app/shared/base/abstract-entity.service';

@Injectable({ providedIn: 'root' })
export class ObjectSourceService extends AbstractEntityService<IObjectSource> {
    constructor(protected http: HttpClient) {
        super(http);
        this.resourceUrl = SERVER_API_URL + 'los/api/object-sources';
        this.resourceSearchUrl = SERVER_API_URL + 'los/api/_search/object-sources';
    }
}
