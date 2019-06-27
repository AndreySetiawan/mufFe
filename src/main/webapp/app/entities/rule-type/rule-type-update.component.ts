import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiAlertService, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { IRuleType, RuleType } from 'app/shared/model/rule-type.model';
import { RuleTypeService } from './rule-type.service';
import { map } from 'rxjs/operators';
import { AccountService } from 'app/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityUpdateComponent } from 'app/shared/base/abstract-entity-update.component';

@Component({
    selector: 'jhi-rule-type-update',
    templateUrl: './rule-type-update.component.html'
})
export class RuleTypeUpdateComponent extends AbstractEntityUpdateComponent<IRuleType> {
    ruletypes: IRuleType[];
    parentId: number;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected ruleTypeService: RuleTypeService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected confirmationService: ConfirmationService,
        protected eventManager: JhiEventManager,
        protected toastService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(dataUtils, ruleTypeService, elementRef, confirmationService, eventManager, toastService, accountService);
        this.listChangeEventName = 'ruleTypeListModification';
        this.item = new RuleType();
    }

    onInit() {
        this.activatedRoute.params.subscribe(params => {
            if (params['parentId']) {
                this.parentId = params['parentId'];
            }
        });
        this.activatedRoute.data.subscribe(({ ruleType }) => {
            this.ruleType = ruleType;
        });
        this.ruleTypeService.query().subscribe(
            (res: HttpResponse<IRuleType[]>) => {
                this.ruletypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    trackRuleTypeById(index: number, item: IRuleType) {
        return item.idRuleType;
    }

    itemKey() {
        return this.item.idRuleType;
    }

    get ruleType() {
        return this.item;
    }

    set ruleType(ruleType: IRuleType) {
        this.item = ruleType;
    }
}
