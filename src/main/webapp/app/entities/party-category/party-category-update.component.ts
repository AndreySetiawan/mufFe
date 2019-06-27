import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiAlertService, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { IPartyCategory, PartyCategory } from 'app/shared/model/party-category.model';
import { PartyCategoryService } from './party-category.service';
import { IPartyCategoryType, PartyCategoryType } from 'app/shared/model/party-category-type.model';
import { PartyCategoryTypeService } from 'app/entities/party-category-type';
import { map } from 'rxjs/operators';
import { AccountService } from 'app/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityUpdateComponent } from 'app/shared/base/abstract-entity-update.component';

@Component({
    selector: 'jhi-party-category-update',
    templateUrl: './party-category-update.component.html'
})
export class PartyCategoryUpdateComponent extends AbstractEntityUpdateComponent<IPartyCategory> {
    partycategorytypes: IPartyCategoryType[];
    categoryTypeId: number;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected partyCategoryService: PartyCategoryService,
        protected partyCategoryTypeService: PartyCategoryTypeService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected confirmationService: ConfirmationService,
        protected eventManager: JhiEventManager,
        protected toastService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(dataUtils, partyCategoryService, elementRef, confirmationService, eventManager, toastService, accountService);
        this.listChangeEventName = 'partyCategoryListModification';
        this.item = new PartyCategory();
    }

    onInit() {
        this.activatedRoute.params.subscribe(params => {
            if (params['categoryTypeId']) {
                this.categoryTypeId = params['categoryTypeId'];
            }
        });
        this.activatedRoute.data.subscribe(({ partyCategory }) => {
            this.partyCategory = partyCategory;
        });
        this.partyCategoryTypeService.query().subscribe(
            (res: HttpResponse<IPartyCategoryType[]>) => {
                this.partycategorytypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    trackPartyCategoryTypeById(index: number, item: IPartyCategoryType) {
        return item.idCategoryType;
    }

    itemKey() {
        return this.item.idCategory;
    }

    get partyCategory() {
        return this.item;
    }

    set partyCategory(partyCategory: IPartyCategory) {
        this.item = partyCategory;
    }
}
