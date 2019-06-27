import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiAlertService, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { IPartyClassification, PartyClassification } from 'app/shared/model/party-classification.model';
import { PartyClassificationService } from './party-classification.service';
import { IPartyCategoryType, PartyCategoryType } from 'app/shared/model/party-category-type.model';
import { PartyCategoryTypeService } from 'app/entities/party-category-type';
import { IPartyCategory, PartyCategory } from 'app/shared/model/party-category.model';
import { PartyCategoryService } from 'app/entities/party-category';
import { IParty, Party } from 'app/shared/model/party.model';
import { PartyService } from 'app/entities/party';
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
    selector: 'jhi-party-classification-update',
    templateUrl: './party-classification-update.component.html'
})
export class PartyClassificationUpdateComponent extends AbstractEntityUpdateComponent<IPartyClassification> {
    partycategorytypes: IPartyCategoryType[];

    partycategories: IPartyCategory[];

    parties: IParty[];
    categoryTypeId: number;
    categoryId: number;
    partyId: string;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected partyClassificationService: PartyClassificationService,
        protected partyCategoryTypeService: PartyCategoryTypeService,
        protected partyCategoryService: PartyCategoryService,
        protected partyService: PartyService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected confirmationService: ConfirmationService,
        protected eventManager: JhiEventManager,
        protected toastService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService,
        protected reportUtils: ReportUtilService
    ) {
        super(dataUtils, partyClassificationService, elementRef, confirmationService, eventManager, toastService, accountService);
        this.listChangeEventName = 'partyClassificationListModification';
        this.item = new PartyClassification();
    }

    onInit() {
        this.activatedRoute.params.subscribe(params => {
            if (params['categoryTypeId']) {
                this.categoryTypeId = params['categoryTypeId'];
            }
            if (params['categoryId']) {
                this.categoryId = params['categoryId'];
            }
            if (params['partyId']) {
                this.partyId = params['partyId'];
            }
        });
        this.activatedRoute.data.subscribe(({ partyClassification }) => {
            this.partyClassification = partyClassification;
        });
        this.partyCategoryTypeService.query().subscribe(
            (res: HttpResponse<IPartyCategoryType[]>) => {
                this.partycategorytypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.partyCategoryService.query().subscribe(
            (res: HttpResponse<IPartyCategory[]>) => {
                this.partycategories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.partyService.query().subscribe(
            (res: HttpResponse<IParty[]>) => {
                this.parties = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    trackPartyCategoryTypeById(index: number, item: IPartyCategoryType) {
        return item.idCategoryType;
    }

    trackPartyCategoryById(index: number, item: IPartyCategory) {
        return item.idCategory;
    }

    trackPartyById(index: number, item: IParty) {
        return item.idParty;
    }

    itemKey() {
        return this.item.idClassification;
    }

    get partyClassification() {
        return this.item;
    }

    set partyClassification(partyClassification: IPartyClassification) {
        this.item = partyClassification;
        // this.dateFrom = moment(partyClassification.dateFrom).format(DATE_TIME_FORMAT);
        // this.dateThru = moment(partyClassification.dateThru).format(DATE_TIME_FORMAT);
    }

    print() {
        this.reportUtils.viewFile('/api/report/PartyClassification/pdf');
        return false;
    }
}
