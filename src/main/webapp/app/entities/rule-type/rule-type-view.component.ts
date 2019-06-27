import { Component, OnChanges, SimpleChanges, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IRuleType, RuleType } from 'app/shared/model/rule-type.model';
import { RuleTypeService } from './rule-type.service';
import { AbstractEntityBaseViewComponent } from 'app/shared/base/abstract-entity-view.component';
import { MessageService } from 'primeng/components/common/messageservice';
import { AccountService } from 'app/core';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';

@Component({
    selector: 'jhi-rule-type-view',
    templateUrl: './rule-type-view.component.html'
})
export class RuleTypeViewComponent extends AbstractEntityBaseViewComponent<IRuleType> implements OnChanges {
    @Input() idRuleType: number;

    ruletypes: IRuleType[];
    parentId: number;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected ruleTypeService: RuleTypeService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected messageService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(ruleTypeService, messageService, elementRef, dataUtils, accountService);
        this.item = new RuleType();
    }

    onInit() {
        this.ruleTypeService.query().subscribe(
            (res: HttpResponse<IRuleType[]>) => {
                this.ruletypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    onPrepareView() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idRuleType']) {
            this.item = new RuleType();
            this.ruleTypeService.find(this.idRuleType).subscribe(result => {
                this.item = result.body;
                this.onPrepareView();
            });
        } else if (changes['item']) {
            this.onPrepareView();
        } else if (changes['isSaving'] && this.idRuleType) {
            if (this.isSaving) {
                this.save();
            }
        }
    }

    get ruleType() {
        return this.item;
    }

    set ruleType(ruleType: IRuleType) {
        this.item = ruleType;
    }

    trackRuleTypeById(index: number, item: IRuleType) {
        return item.idRuleType;
    }

    itemKey() {
        return this.item.idRuleType;
    }
}
