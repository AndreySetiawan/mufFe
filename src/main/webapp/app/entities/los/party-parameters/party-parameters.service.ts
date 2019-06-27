import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IPartyParameters } from 'app/shared/model/los/party-parameters.model';
import { AbstractEntityService } from 'app/shared/base/abstract-entity.service';
import { createRequestOption } from 'app/shared';

@Injectable({ providedIn: 'root' })
export class PartyParametersService extends AbstractEntityService<IPartyParameters> {
    constructor(protected http: HttpClient) {
        super(http);
        this.resourceUrl = SERVER_API_URL + 'los/api/party-parameters';
        this.resourceSearchUrl = SERVER_API_URL + 'los/api/_search/party-parameters';
    }

    protected convertDateFromServer(res: HttpResponse<IPartyParameters>): HttpResponse<IPartyParameters> {
        res.body.dateFrom = res.body.dateFrom != null ? new Date(res.body.dateFrom) : null;
        res.body.dateThru = res.body.dateThru != null ? new Date(res.body.dateThru) : null;
        return res;
    }

    protected convertDateArrayFromServer(res: HttpResponse<IPartyParameters[]>): HttpResponse<IPartyParameters[]> {
        res.body.forEach((partyParameters: IPartyParameters) => {
            partyParameters.dateFrom = partyParameters.dateFrom != null ? new Date(partyParameters.dateFrom) : null;
            partyParameters.dateThru = partyParameters.dateThru != null ? new Date(partyParameters.dateThru) : null;
        });
        return res;
    }
}
