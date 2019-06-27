import { Component, OnChanges, SimpleChanges, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IFeatureApplicable, FeatureApplicable } from 'app/shared/model/feature-applicable.model';
import { FeatureApplicableService } from './feature-applicable.service';
import { AbstractEntityBaseViewComponent } from 'app/shared/base/abstract-entity-view.component';
import { IFeatureType, FeatureType } from 'app/shared/model/feature-type.model';
import { FeatureTypeService } from 'app/entities/feature-type';
import { IFeature, Feature } from 'app/shared/model/feature.model';
import { FeatureService } from 'app/entities/feature';
import { IProduct, Product } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product';
import { MessageService } from 'primeng/components/common/messageservice';
import { AccountService } from 'app/core';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';

@Component({
    selector: 'jhi-feature-applicable-view',
    templateUrl: './feature-applicable-view.component.html'
})
export class FeatureApplicableViewComponent extends AbstractEntityBaseViewComponent<IFeatureApplicable> implements OnChanges {
    @Input() idApplicability: string;

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
        protected messageService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(featureApplicableService, messageService, elementRef, dataUtils, accountService);
        this.item = new FeatureApplicable();
    }

    onInit() {
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

    onPrepareView() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idApplicability']) {
            this.item = new FeatureApplicable();
            this.featureApplicableService.find(this.idApplicability).subscribe(result => {
                this.item = result.body;
                this.onPrepareView();
            });
        } else if (changes['item']) {
            this.onPrepareView();
        } else if (changes['isSaving'] && this.idApplicability) {
            if (this.isSaving) {
                this.save();
            }
        }
    }

    get featureApplicable() {
        return this.item;
    }

    set featureApplicable(featureApplicable: IFeatureApplicable) {
        this.item = featureApplicable;
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
}
