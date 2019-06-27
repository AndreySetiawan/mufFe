import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IGood } from 'app/shared/model/los/good.model';
import { AbstractEntityService } from 'app/shared/base/abstract-entity.service';
import { createRequestOption } from 'app/shared';

@Injectable({ providedIn: 'root' })
export class GoodService extends AbstractEntityService<IGood> {
    constructor(protected http: HttpClient) {
        super(http);
        this.resourceUrl = SERVER_API_URL + 'los/api/goods';
        this.resourceSearchUrl = SERVER_API_URL + 'los/api/_search/goods';
    }

    protected convertDateFromServer(res: HttpResponse<IGood>): HttpResponse<IGood> {
        res.body.dateIntroduction = res.body.dateIntroduction != null ? new Date(res.body.dateIntroduction) : null;
        res.body.dateDiscontinue = res.body.dateDiscontinue != null ? new Date(res.body.dateDiscontinue) : null;
        return res;
    }

    protected convertDateArrayFromServer(res: HttpResponse<IGood[]>): HttpResponse<IGood[]> {
        res.body.forEach((good: IGood) => {
            good.dateIntroduction = good.dateIntroduction != null ? new Date(good.dateIntroduction) : null;
            good.dateDiscontinue = good.dateDiscontinue != null ? new Date(good.dateDiscontinue) : null;
        });
        return res;
    }
}
