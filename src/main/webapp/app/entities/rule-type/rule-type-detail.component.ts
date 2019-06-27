import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRuleType } from 'app/shared/model/rule-type.model';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    selector: 'jhi-rule-type-detail',
    templateUrl: './rule-type-detail.component.html'
})
export class RuleTypeDetailComponent implements OnInit {
    ruleType: IRuleType;

    constructor(private activatedRoute: ActivatedRoute, private toastService: MessageService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ruleType }) => {
            this.ruleType = ruleType;
        });
    }

    previousState() {
        window.history.back();
    }
}
