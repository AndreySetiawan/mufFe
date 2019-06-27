import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiAlertService, JhiDataUtils, JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { IUom, Uom } from 'app/shared/model/uom.model';
import { UomService } from './uom.service';
import { IUomType, UomType } from 'app/shared/model/uom-type.model';
import { UomTypeService } from 'app/entities/uom-type';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityLovComponent, AbstractEntityLovPopupComponent } from 'app/shared/base/abstract-entity-lov.component';
import { AccountService } from 'app/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-uom-lov-dialog',
    templateUrl: './uom-lov.component.html'
})
export class UomLovDialogComponent extends AbstractEntityLovComponent<IUom> {
    uomtypes: IUomType[];
    uomTypeId: number;

    constructor(
        protected uomService: UomService,
        protected uomTypeService: UomTypeService,
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
            uomService,
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

        this.listChangeEventName = 'uomListModification';
        this.entityKeyName = 'idUom';

        this.predicate = this.entityKeyName;
        this.page = 1;
        this.itemsPerPage = 10;
        this.first = (this.page - 1) * this.itemsPerPage;
    }

    protected onInit() {
        this.uom = new Uom();
        this.uomTypeService.query().subscribe(
            (res: HttpResponse<IUomType[]>) => {
                this.uomtypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    trackId(index: number, item: IUom) {
        return item.idUom;
    }

    setViewNew() {
        this.activeView = 'new-data';
    }

    setViewList() {
        this.activeView = 'list';
    }

    trackUomTypeById(index: number, item: IUomType) {
        return item.idUomType;
    }

    get uom() {
        return this.item;
    }

    set uom(uom: IUom) {
        this.item = uom;
    }
}

@Component({
    selector: 'jhi-uom-lov-popup',
    template: ''
})
export class UomLovPopupComponent extends AbstractEntityLovPopupComponent<IUom> {
    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {
        super(UomLovDialogComponent as Component, activatedRoute, router, modalService);
    }
}
