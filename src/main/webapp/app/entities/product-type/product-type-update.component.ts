import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiAlertService, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { IProductType, ProductType } from 'app/shared/model/product-type.model';
import { ProductTypeService } from './product-type.service';
import { map } from 'rxjs/operators';
import { AccountService } from 'app/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityUpdateComponent } from 'app/shared/base/abstract-entity-update.component';

@Component({
    selector: 'jhi-product-type-update',
    templateUrl: './product-type-update.component.html'
})
export class ProductTypeUpdateComponent extends AbstractEntityUpdateComponent<IProductType> {
    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected productTypeService: ProductTypeService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected confirmationService: ConfirmationService,
        protected eventManager: JhiEventManager,
        protected toastService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(dataUtils, productTypeService, elementRef, confirmationService, eventManager, toastService, accountService);
        this.listChangeEventName = 'productTypeListModification';
        this.item = new ProductType();
    }

    onInit() {
        this.activatedRoute.params.subscribe(params => {});
        this.activatedRoute.data.subscribe(({ productType }) => {
            this.productType = productType;
        });
    }

    itemKey() {
        return this.item.idProductType;
    }

    get productType() {
        return this.item;
    }

    set productType(productType: IProductType) {
        this.item = productType;
    }
}
