import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiAlertService, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { IProductCategoryType, ProductCategoryType } from 'app/shared/model/product-category-type.model';
import { ProductCategoryTypeService } from './product-category-type.service';
import { ICategoryScheme, CategoryScheme } from 'app/shared/model/category-scheme.model';
import { CategorySchemeService } from 'app/entities/category-scheme';
import { map } from 'rxjs/operators';
import { AccountService } from 'app/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityUpdateComponent } from 'app/shared/base/abstract-entity-update.component';

@Component({
    selector: 'jhi-product-category-type-update',
    templateUrl: './product-category-type-update.component.html'
})
export class ProductCategoryTypeUpdateComponent extends AbstractEntityUpdateComponent<IProductCategoryType> {
    categoryschemes: ICategoryScheme[];
    schemeId: number;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected productCategoryTypeService: ProductCategoryTypeService,
        protected categorySchemeService: CategorySchemeService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected confirmationService: ConfirmationService,
        protected eventManager: JhiEventManager,
        protected toastService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(dataUtils, productCategoryTypeService, elementRef, confirmationService, eventManager, toastService, accountService);
        this.listChangeEventName = 'productCategoryTypeListModification';
        this.item = new ProductCategoryType();
    }

    onInit() {
        this.activatedRoute.params.subscribe(params => {
            if (params['schemeId']) {
                this.schemeId = params['schemeId'];
            }
        });
        this.activatedRoute.data.subscribe(({ productCategoryType }) => {
            this.productCategoryType = productCategoryType;
        });
        this.categorySchemeService.query().subscribe(
            (res: HttpResponse<ICategoryScheme[]>) => {
                this.categoryschemes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    trackCategorySchemeById(index: number, item: ICategoryScheme) {
        return item.idScheme;
    }

    itemKey() {
        return this.item.idCategoryType;
    }

    get productCategoryType() {
        return this.item;
    }

    set productCategoryType(productCategoryType: IProductCategoryType) {
        this.item = productCategoryType;
    }
}
