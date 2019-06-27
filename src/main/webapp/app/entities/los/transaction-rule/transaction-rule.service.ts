import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { ITransactionRule } from 'app/shared/model/los/transaction-rule.model';
import { AbstractEntityService } from 'app/shared/base/abstract-entity.service';
import { createRequestOption } from 'app/shared';

@Injectable({ providedIn: 'root' })
export class TransactionRuleService extends AbstractEntityService<ITransactionRule> {
    constructor(protected http: HttpClient) {
        super(http);
        this.resourceUrl = SERVER_API_URL + 'los/api/transaction-rules';
        this.resourceSearchUrl = SERVER_API_URL + 'los/api/_search/transaction-rules';
    }

    protected convertDateFromServer(res: HttpResponse<ITransactionRule>): HttpResponse<ITransactionRule> {
        res.body.dateFrom = res.body.dateFrom != null ? new Date(res.body.dateFrom) : null;
        res.body.dateThru = res.body.dateThru != null ? new Date(res.body.dateThru) : null;
        return res;
    }

    protected convertDateArrayFromServer(res: HttpResponse<ITransactionRule[]>): HttpResponse<ITransactionRule[]> {
        res.body.forEach((transactionRule: ITransactionRule) => {
            transactionRule.dateFrom = transactionRule.dateFrom != null ? new Date(transactionRule.dateFrom) : null;
            transactionRule.dateThru = transactionRule.dateThru != null ? new Date(transactionRule.dateThru) : null;
        });
        return res;
    }
}
