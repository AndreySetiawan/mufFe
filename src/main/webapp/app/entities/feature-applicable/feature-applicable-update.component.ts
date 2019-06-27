import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiAlertService, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { IFeatureApplicable, FeatureApplicable } from 'app/shared/model/feature-applicable.model';
import { FeatureApplicableService } from './feature-applicable.service';
import { IFeatureType, FeatureType } from 'app/shared/model/feature-type.model';
import { FeatureTypeService } from 'app/entities/feature-type';
import { IFeature, Feature } from 'app/shared/model/feature.model';
import { FeatureService } from 'app/entities/feature';
import { IProduct, Product } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product';
import { map } from 'rxjs/operators';
import { AccountService } from 'app/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityUpdateComponent } from 'app/shared/base/abstract-entity-update.component';

@Component({
    selector: 'jhi-feature-applicable-update',
    templateUrl: './feature-applicable-update.component.html'
})
export class FeatureApplicableUpdateComponent extends AbstractEntityUpdateComponent<IFeatureApplicable> {
    featuretypes: IFeatureType[];

    features: IFeature[];

    products: IProduct[];
    featureTypeId: number;
    featureId: number;
    productId: string;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected featureApplicableService: FeatureApplicableService,
        protected featureTypeService: FeatureTypeService,
        protected featureService: FeatureService,
        protected productService: ProductService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected confirmationService: ConfirmationService,
        protected eventManager: JhiEventManager,
        protected toastService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(dataUtils, featureApplicableService, elementRef, confirmationService, eventManager, toastService, accountService);
        this.listChangeEventName = 'featureApplicableListModification';
        this.item = new FeatureApplicable();
    }

    onInit() {
        this.activatedRoute.params.subscribe(params => {
            if (params['featureTypeId']) {
                this.featureTypeId = params['featureTypeId'];
            }
            if (params['featureId']) {
                this.featureId = params['featureId'];
            }
            if (params['productId']) {
                this.productId = params['productId'];
            }
        });
        this.activatedRoute.data.subscribe(({ featureApplicable }) => {
            this.featureApplicable = featureApplicable;
        });
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
        this.productService.query().subscribe(
            (res: HttpResponse<IProduct[]>) => {
                this.products = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    trackFeatureTypeById(index: number, item: IFeatureType) {
        return item.idFeatureType;
    }

    trackFeatureById(index: number, item: IFeature) {
        return item.idFeature;
    }

    trackProductById(index: number, item: IProduct) {
        return item.idProduct;
    }

    itemKey() {
        return this.item.idApplicability;
    }

    get featureApplicable() {
        return this.item;
    }

    set featureApplicable(featureApplicable: IFeatureApplicable) {
        this.item = featureApplicable;
        // this.dateFrom = moment(featureApplicable.dateFrom).format(DATE_TIME_FORMAT);
        // this.dateThru = moment(featureApplicable.dateThru).format(DATE_TIME_FORMAT);
    }
}
