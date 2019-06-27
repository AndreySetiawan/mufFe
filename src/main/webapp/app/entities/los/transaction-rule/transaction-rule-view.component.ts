import { Component, OnChanges, SimpleChanges, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ITransactionRule, TransactionRule } from 'app/shared/model/los/transaction-rule.model';
import { TransactionRuleService } from './transaction-rule.service';
import { AbstractEntityBaseViewComponent } from 'app/shared/base/abstract-entity-view.component';
import { IRuleType, RuleType } from 'app/shared/model/rule-type.model';
import { RuleTypeService } from 'app/entities/rule-type';
import { IFeatureType, FeatureType } from 'app/shared/model/feature-type.model';
import { FeatureTypeService } from 'app/entities/feature-type';
import { IFeature, Feature } from 'app/shared/model/feature.model';
import { FeatureService } from 'app/entities/feature';
import { MessageService } from 'primeng/components/common/messageservice';
import { AccountService } from 'app/core';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';

@Component({
    selector: 'jhi-transaction-rule-view',
    templateUrl: './transaction-rule-view.component.html'
})
export class TransactionRuleViewComponent extends AbstractEntityBaseViewComponent<ITransactionRule> implements OnChanges {
    @Input() idRuleType: number;

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
        protected messageService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(transactionRuleService, messageService, elementRef, dataUtils, accountService);
        this.item = new TransactionRule();
    }

    onInit() {
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

    onPrepareView() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idRuleType']) {
            this.item = new TransactionRule();
            this.transactionRuleService.find(this.idRuleType).subscribe(result => {
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

    get transactionRule() {
        return this.item;
    }

    set transactionRule(transactionRule: ITransactionRule) {
        this.item = transactionRule;
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
}
