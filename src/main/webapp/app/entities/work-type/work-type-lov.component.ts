import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiAlertService, JhiDataUtils, JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { IWorkType, WorkType } from 'app/shared/model/work-type.model';
import { WorkTypeService } from './work-type.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityLovComponent, AbstractEntityLovPopupComponent } from 'app/shared/base/abstract-entity-lov.component';
import { AccountService } from 'app/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-work-type-lov-dialog',
    templateUrl: './work-type-lov.component.html'
})
export class WorkTypeLovDialogComponent extends AbstractEntityLovComponent<IWorkType> {
    constructor(
        protected workTypeService: WorkTypeService,
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
            workTypeService,
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

        this.listChangeEventName = 'workTypeListModification';
        this.entityKeyName = 'idWorkType';

        this.predicate = this.entityKeyName;
        this.page = 1;
        this.itemsPerPage = 10;
        this.first = (this.page - 1) * this.itemsPerPage;
    }

    protected onInit() {
        this.workType = new WorkType();
    }

    trackId(index: number, item: IWorkType) {
        return item.idWorkType;
    }

    setViewNew() {
        this.activeView = 'new-data';
    }

    setViewList() {
        this.activeView = 'list';
    }

    get workType() {
        return this.item;
    }

    set workType(workType: IWorkType) {
        this.item = workType;
    }
}

@Component({
    selector: 'jhi-work-type-lov-popup',
    template: ''
})
export class WorkTypeLovPopupComponent extends AbstractEntityLovPopupComponent<IWorkType> {
    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {
        super(WorkTypeLovDialogComponent as Component, activatedRoute, router, modalService);
    }
}
