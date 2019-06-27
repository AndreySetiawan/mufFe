import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiAlertService, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { IFeature, Feature } from 'app/shared/model/feature.model';
import { FeatureService } from './feature.service';
import { IFeatureType, FeatureType } from 'app/shared/model/feature-type.model';
import { FeatureTypeService } from 'app/entities/feature-type';
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
    selector: 'jhi-feature-update',
    templateUrl: './feature-update.component.html'
})
export class FeatureUpdateComponent extends AbstractEntityUpdateComponent<IFeature> {
    featuretypes: IFeatureType[];
    featureTypeId: number;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected featureService: FeatureService,
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
        super(dataUtils, featureService, elementRef, confirmationService, eventManager, toastService, accountService);
        this.listChangeEventName = 'featureListModification';
        this.item = new Feature();
    }

    onInit() {
        this.activatedRoute.params.subscribe(params => {
            if (params['featureTypeId']) {
                this.featureTypeId = params['featureTypeId'];
            }
        });
        this.activatedRoute.data.subscribe(({ feature }) => {
            this.feature = feature;
        });
        this.featureTypeService.query().subscribe(
            (res: HttpResponse<IFeatureType[]>) => {
                this.featuretypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    trackFeatureTypeById(index: number, item: IFeatureType) {
        return item.idFeatureType;
    }

    itemKey() {
        return this.item.idFeature;
    }

    get feature() {
        return this.item;
    }

    set feature(feature: IFeature) {
        this.item = feature;
    }

    print() {
        this.reportUtils.viewFile('/los/api/report/Feature/pdf');
        return false;
    }
}
