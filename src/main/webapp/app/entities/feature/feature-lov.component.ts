import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiAlertService, JhiDataUtils, JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { IFeature, Feature } from 'app/shared/model/feature.model';
import { FeatureService } from './feature.service';
import { IFeatureType, FeatureType } from 'app/shared/model/feature-type.model';
import { FeatureTypeService } from 'app/entities/feature-type';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityLovComponent, AbstractEntityLovPopupComponent } from 'app/shared/base/abstract-entity-lov.component';
import { AccountService } from 'app/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-feature-lov-dialog',
    templateUrl: './feature-lov.component.html'
})
export class FeatureLovDialogComponent extends AbstractEntityLovComponent<IFeature> {
    featuretypes: IFeatureType[];
    featureTypeId: number;

    constructor(
        protected featureService: FeatureService,
        protected featureTypeService: FeatureTypeService,
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
            featureService,
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

        this.listChangeEventName = 'featureListModification';
        this.entityKeyName = 'idFeature';

        this.predicate = this.entityKeyName;
        this.page = 1;
        this.itemsPerPage = 10;
        this.first = (this.page - 1) * this.itemsPerPage;
    }

    protected onInit() {
        this.feature = new Feature();
        this.featureTypeService.query().subscribe(
            (res: HttpResponse<IFeatureType[]>) => {
                this.featuretypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    trackId(index: number, item: IFeature) {
        return item.idFeature;
    }

    setViewNew() {
        this.activeView = 'new-data';
    }

    setViewList() {
        this.activeView = 'list';
    }

    trackFeatureTypeById(index: number, item: IFeatureType) {
        return item.idFeatureType;
    }

    get feature() {
        return this.item;
    }

    set feature(feature: IFeature) {
        this.item = feature;
    }
}

@Component({
    selector: 'jhi-feature-lov-popup',
    template: ''
})
export class FeatureLovPopupComponent extends AbstractEntityLovPopupComponent<IFeature> {
    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {
        super(FeatureLovDialogComponent as Component, activatedRoute, router, modalService);
    }
}
