import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiAlertService, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { IProductCategory, ProductCategory } from 'app/shared/model/product-category.model';
import { ProductCategoryService } from './product-category.service';
import { IProductCategoryType, ProductCategoryType } from 'app/shared/model/product-category-type.model';
import { ProductCategoryTypeService } from 'app/entities/product-category-type';
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
    selector: 'jhi-product-category-update',
    templateUrl: './product-category-update.component.html'
})
export class ProductCategoryUpdateComponent extends AbstractEntityUpdateComponent<IProductCategory> {
    productcategories: IProductCategory[];

    productcategorytypes: IProductCategoryType[];
    parentId: number;
    categoryTypeId: number;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected productCategoryService: ProductCategoryService,
        protected productCategoryTypeService: ProductCategoryTypeService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected confirmationService: ConfirmationService,
        protected eventManager: JhiEventManager,
        protected toastService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService,
        protected reportUtils: ReportUtilService
    ) {
        super(dataUtils, productCategoryService, elementRef, confirmationService, eventManager, toastService, accountService);
        this.listChangeEventName = 'productCategoryListModification';
        this.item = new ProductCategory();
    }

    onInit() {
        this.activatedRoute.params.subscribe(params => {
            if (params['parentId']) {
                this.parentId = params['parentId'];
            }
            if (params['categoryTypeId']) {
                this.categoryTypeId = params['categoryTypeId'];
            }
        });
        this.activatedRoute.data.subscribe(({ productCategory }) => {
            this.productCategory = productCategory;
        });
        this.productCategoryService.query().subscribe(
            (res: HttpResponse<IProductCategory[]>) => {
                this.productcategories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.productCategoryTypeService.query().subscribe(
            (res: HttpResponse<IProductCategoryType[]>) => {
                this.productcategorytypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    trackProductCategoryById(index: number, item: IProductCategory) {
        return item.idCategory;
    }

    trackProductCategoryTypeById(index: number, item: IProductCategoryType) {
        return item.idCategoryType;
    }

    itemKey() {
        return this.item.idCategory;
    }

    get productCategory() {
        return this.item;
    }

    set productCategory(productCategory: IProductCategory) {
        this.item = productCategory;
    }

    print() {
        this.reportUtils.viewFile('/api/report/ProductCategory/pdf');
        return false;
    }
}
