import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiAlertService, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { ITransactionRule, TransactionRule } from 'app/shared/model/los/transaction-rule.model';
import { TransactionRuleService } from './transaction-rule.service';
import { IRuleType, RuleType } from 'app/shared/model/rule-type.model';
import { RuleTypeService } from 'app/entities/rule-type';
import { IFeatureType, FeatureType } from 'app/shared/model/feature-type.model';
import { FeatureTypeService } from 'app/entities/feature-type';
import { IFeature, Feature } from 'app/shared/model/feature.model';
import { FeatureService } from 'app/entities/feature';
import { map } from 'rxjs/operators';
import { AccountService } from 'app/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityUpdateComponent } from 'app/shared/base/abstract-entity-update.component';
import { ReportUtilService } from 'app/shared/base/report-util.service';

@Component({
    selector: 'jhi-transaction-rule-update',
    templateUrl: './transaction-rule-update.component.html'
})
export class TransactionRuleUpdateComponent extends AbstractEntityUpdateComponent<ITransactionRule> {
    ruletypes: IRuleType[];

    featuretypes: IFeatureType[];

    features: IFeature[];
    parentId: number;
    featureTypeId: number;
    featureId: number;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected transactionRuleService: TransactionRuleService,
        protected ruleTypeService: RuleTypeService,
        protected featureTypeService: FeatureTypeService,
        protected featureService: FeatureService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected confirmationService: ConfirmationService,
        protected eventManager: JhiEventManager,
        protected toastService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService,
        protected reportUtils: ReportUtilService
    ) {
        super(dataUtils, transactionRuleService, elementRef, confirmationService, eventManager, toastService, accountService);
        this.listChangeEventName = 'transactionRuleListModification';
        this.item = new TransactionRule();
    }

    onInit() {
        this.activatedRoute.params.subscribe(params => {
            if (params['parentId']) {
                this.parentId = params['parentId'];
            }
            if (params['featureTypeId']) {
                this.featureTypeId = params['featureTypeId'];
            }
            if (params['featureId']) {
                this.featureId = params['featureId'];
            }
        });
        this.activatedRoute.data.subscribe(({ transactionRule }) => {
            this.transactionRule = transactionRule;
        });
        this.ruleTypeService.query().subscribe(
            (res: HttpResponse<IRuleType[]>) => {
                this.ruletypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.featureTypeService.query().subscribe(
            (res: HttpResponse<IFeatureType[]>) => {
                this.featuretypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.featureService.query().subscribe(
            (res: HttpResponse<IFeature[]>) => {
                this.features = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    trackRuleTypeById(index: number, item: IRuleType) {
        return item.idRuleType;
    }

    trackFeatureTypeById(index: number, item: IFeatureType) {
        return item.idFeatureType;
    }

    trackFeatureById(index: number, item: IFeature) {
        return item.idFeature;
    }

    itemKey() {
        return this.item.idRuleType;
    }

    get transactionRule() {
        return this.item;
    }

    set transactionRule(transactionRule: ITransactionRule) {
        this.item = transactionRule;
        // this.dateFrom = moment(transactionRule.dateFrom).format(DATE_TIME_FORMAT);
        // this.dateThru = moment(transactionRule.dateThru).format(DATE_TIME_FORMAT);
    }

    print() {
        this.reportUtils.viewFile('/los/api/report/TransactionRule/pdf');
        return false;
    }
}
