import { Component, OnChanges, SimpleChanges, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IFeature, Feature } from 'app/shared/model/feature.model';
import { FeatureService } from './feature.service';
import { AbstractEntityBaseViewComponent } from 'app/shared/base/abstract-entity-view.component';
import { IFeatureType, FeatureType } from 'app/shared/model/feature-type.model';
import { FeatureTypeService } from 'app/entities/feature-type';
import { MessageService } from 'primeng/components/common/messageservice';
import { AccountService } from 'app/core';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';

@Component({
    selector: 'jhi-feature-view',
    templateUrl: './feature-view.component.html'
})
export class FeatureViewComponent extends AbstractEntityBaseViewComponent<IFeature> implements OnChanges {
    @Input() idFeature: number;

    featuretypes: IFeatureType[];
    featureTypeId: number;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected featureService: FeatureService,
        protected featureTypeService: FeatureTypeService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected messageService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(featureService, messageService, elementRef, dataUtils, accountService);
        this.item = new Feature();
    }

    onInit() {
        this.featureTypeService.query().subscribe(
            (res: HttpResponse<IFeatureType[]>) => {
                this.featuretypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    onPrepareView() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idFeature']) {
            this.item = new Feature();
            this.featureService.find(this.idFeature).subscribe(result => {
                this.item = result.body;
                this.onPrepareView();
            });
        } else if (changes['item']) {
            this.onPrepareView();
        } else if (changes['isSaving'] && this.idFeature) {
            if (this.isSaving) {
                this.save();
            }
        }
    }

    get feature() {
        return this.item;
    }

    set feature(feature: IFeature) {
        this.item = feature;
    }

    trackFeatureTypeById(index: number, item: IFeatureType) {
        return item.idFeatureType;
    }

    itemKey() {
        return this.item.idFeature;
    }
}
