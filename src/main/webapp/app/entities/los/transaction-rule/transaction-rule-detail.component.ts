import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransactionRule } from 'app/shared/model/los/transaction-rule.model';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    selector: 'jhi-transaction-rule-detail',
    templateUrl: './transaction-rule-detail.component.html'
})
export class TransactionRuleDetailComponent implements OnInit {
    transactionRule: ITransactionRule;

    constructor(private activatedRoute: ActivatedRoute, private toastService: MessageService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transactionRule }) => {
            this.transactionRule = transactionRule;
        });
    }

    previousState() {
        window.history.back();
    }
}
