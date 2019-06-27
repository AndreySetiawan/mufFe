import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiAlertService, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { IFeatureType, FeatureType } from 'app/shared/model/feature-type.model';
import { FeatureTypeService } from './feature-type.service';
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
    selector: 'jhi-feature-type-update',
    templateUrl: './feature-type-update.component.html'
})
export class FeatureTypeUpdateComponent extends AbstractEntityUpdateComponent<IFeatureType> {
    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected featureTypeService: FeatureTypeService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected confirmationService: ConfirmationService,
        protected eventManager: JhiEventManager,
        protected toastService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService,
        protected reportUtils: ReportUtilService
    ) {
        super(dataUtils, featureTypeService, elementRef, confirmationService, eventManager, toastService, accountService);
        this.listChangeEventName = 'featureTypeListModification';
        this.item = new FeatureType();
    }

    onInit() {
        this.activatedRoute.params.subscribe(params => {});
        this.activatedRoute.data.subscribe(({ featureType }) => {
            this.featureType = featureType;
        });
    }

    itemKey() {
        return this.item.idFeatureType;
    }

    get featureType() {
        return this.item;
    }

    set featureType(featureType: IFeatureType) {
        this.item = featureType;
    }

    print() {
        this.reportUtils.viewFile('/api/report/FeatureType/pdf');
        return false;
    }
}
