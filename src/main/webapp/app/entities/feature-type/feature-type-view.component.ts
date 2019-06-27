import { Component, OnChanges, SimpleChanges, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IFeatureType, FeatureType } from 'app/shared/model/feature-type.model';
import { FeatureTypeService } from './feature-type.service';
import { AbstractEntityBaseViewComponent } from 'app/shared/base/abstract-entity-view.component';
import { MessageService } from 'primeng/components/common/messageservice';
import { AccountService } from 'app/core';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';

@Component({
    selector: 'jhi-feature-type-view',
    templateUrl: './feature-type-view.component.html'
})
export class FeatureTypeViewComponent extends AbstractEntityBaseViewComponent<IFeatureType> implements OnChanges {
    @Input() idFeatureType: number;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected featureTypeService: FeatureTypeService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected messageService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(featureTypeService, messageService, elementRef, dataUtils, accountService);
        this.item = new FeatureType();
    }

    onInit() {}

    onPrepareView() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idFeatureType']) {
            this.item = new FeatureType();
            this.featureTypeService.find(this.idFeatureType).subscribe(result => {
                this.item = result.body;
                this.onPrepareView();
            });
        } else if (changes['item']) {
            this.onPrepareView();
        } else if (changes['isSaving'] && this.idFeatureType) {
            if (this.isSaving) {
                this.save();
            }
        }
    }

    get featureType() {
        return this.item;
    }

    set featureType(featureType: IFeatureType) {
        this.item = featureType;
    }

    itemKey() {
        return this.item.idFeatureType;
    }
}
