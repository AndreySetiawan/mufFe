import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiAlertService, JhiDataUtils, JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { IPartyCategory, PartyCategory } from 'app/shared/model/party-category.model';
import { PartyCategoryService } from './party-category.service';
import { IPartyCategoryType, PartyCategoryType } from 'app/shared/model/party-category-type.model';
import { PartyCategoryTypeService } from 'app/entities/party-category-type';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityLovComponent, AbstractEntityLovPopupComponent } from 'app/shared/base/abstract-entity-lov.component';
import { AccountService } from 'app/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-party-category-lov-dialog',
    templateUrl: './party-category-lov.component.html'
})
export class PartyCategoryLovDialogComponent extends AbstractEntityLovComponent<IPartyCategory> {
    partycategorytypes: IPartyCategoryType[];
    categoryTypeId: number;

    constructor(
        protected partyCategoryService: PartyCategoryService,
        protected partyCategoryTypeService: PartyCategoryTypeService,
        protected confirmationService: ConfirmationService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected dataUtils: JhiDataUtils,
        protected router: Router,
        protected eventManager: JhiEventManager,
        protected toastService: MessageService,
        public activeModal: NgbActiveModal
    ) {
        super(
            partyCategoryService,
            parseLinks,
            jhiAlertService,
            accountService,
            activatedRoute,
            dataUtils,
            router,
            eventManager,
            toastService,
            activeModal,
            confirmationService
        );

        this.listChangeEventName = 'partyCategoryListModification';
        this.entityKeyName = 'idCategory';

        this.predicate = this.entityKeyName;
        this.page = 1;
        this.itemsPerPage = 10;
        this.first = (this.page - 1) * this.itemsPerPage;
    }

    protected onInit() {
        this.partyCategory = new PartyCategory();
        this.partyCategoryTypeService.query().subscribe(
            (res: HttpResponse<IPartyCategoryType[]>) => {
                this.partycategorytypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    trackId(index: number, item: IPartyCategory) {
        return item.idCategory;
    }

    setViewNew() {
        this.activeView = 'new-data';
    }

    setViewList() {
        this.activeView = 'list';
    }

    trackPartyCategoryTypeById(index: number, item: IPartyCategoryType) {
        return item.idCategoryType;
    }

    get partyCategory() {
        return this.item;
    }

    set partyCategory(partyCategory: IPartyCategory) {
        this.item = partyCategory;
    }
}

@Component({
    selector: 'jhi-party-category-lov-popup',
    template: ''
})
export class PartyCategoryLovPopupComponent extends AbstractEntityLovPopupComponent<IPartyCategory> {
    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {
        super(PartyCategoryLovDialogComponent as Component, activatedRoute, router, modalService);
    }
}
