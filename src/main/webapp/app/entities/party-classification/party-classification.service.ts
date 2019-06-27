import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IPartyClassification } from 'app/shared/model/party-classification.model';
import { AbstractEntityService } from 'app/shared/base/abstract-entity.service';
import { createRequestOption } from 'app/shared';

@Injectable({ providedIn: 'root' })
export class PartyClassificationService extends AbstractEntityService<IPartyClassification> {
    constructor(protected http: HttpClient) {
        super(http);
        this.resourceUrl = SERVER_API_URL + 'los/api/party-classifications';
        this.resourceSearchUrl = SERVER_API_URL + 'los/api/_search/party-classifications';
    }

    protected convertDateFromServer(res: HttpResponse<IPartyClassification>): HttpResponse<IPartyClassification> {
        res.body.dateFrom = res.body.dateFrom != null ? new Date(res.body.dateFrom) : null;
        res.body.dateThru = res.body.dateThru != null ? new Date(res.body.dateThru) : null;
        return res;
    }

    protected convertDateArrayFromServer(res: HttpResponse<IPartyClassification[]>): HttpResponse<IPartyClassification[]> {
        res.body.forEach((partyClassification: IPartyClassification) => {
            partyClassification.dateFrom = partyClassification.dateFrom != null ? new Date(partyClassification.dateFrom) : null;
            partyClassification.dateThru = partyClassification.dateThru != null ? new Date(partyClassification.dateThru) : null;
        });
        return res;
    }
}
