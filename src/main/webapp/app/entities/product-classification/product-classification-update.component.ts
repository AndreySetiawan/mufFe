import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiAlertService, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { IProductClassification, ProductClassification } from 'app/shared/model/product-classification.model';
import { ProductClassificationService } from './product-classification.service';
import { IProductCategoryType, ProductCategoryType } from 'app/shared/model/product-category-type.model';
import { ProductCategoryTypeService } from 'app/entities/product-category-type';
import { IProductCategory, ProductCategory } from 'app/shared/model/product-category.model';
import { ProductCategoryService } from 'app/entities/product-category';
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
import { ReportUtilService } from 'app/shared/base/report-util.service';

@Component({
    selector: 'jhi-product-classification-update',
    templateUrl: './product-classification-update.component.html'
})
export class ProductClassificationUpdateComponent extends AbstractEntityUpdateComponent<IProductClassification> {
    productcategorytypes: IProductCategoryType[];
    categoryTypeId: number;
    categoryItems: IProductCategory[];
    categorySelect: IProductCategory;
    categoryId: number;
    productItems: IProduct[];
    productSelect: IProduct;
    productId: string;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected productClassificationService: ProductClassificationService,
        protected productCategoryTypeService: ProductCategoryTypeService,
        protected productCategoryService: ProductCategoryService,
        protected productService: ProductService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected confirmationService: ConfirmationService,
        protected eventManager: JhiEventManager,
        protected toastService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService,
        protected reportUtils: ReportUtilService
    ) {
        super(dataUtils, productClassificationService, elementRef, confirmationService, eventManager, toastService, accountService);
        this.categorySelect = new ProductCategory();
        this.productSelect = new Product();
        this.listChangeEventName = 'productClassificationListModification';
        this.item = new ProductClassification();
    }

    onInit() {
        this.activatedRoute.params.subscribe(params => {
            if (params['categoryTypeId']) {
                this.categoryTypeId = params['categoryTypeId'];
            }
            if (params['categoryId']) {
                this.categoryId = params['categoryId'];
            }
            if (params['productId']) {
                this.productId = params['productId'];
            }
        });
        this.activatedRoute.data.subscribe(({ productClassification }) => {
            this.productClassification = productClassification;
            if (this.productClassification.categoryId) {
                this.productCategoryService
                    .find(this.productClassification.categoryId)
                    .subscribe((value: HttpResponse<IProductCategory>) => {
                        this.categorySelect = value.body;
                    });
            }
            if (this.productClassification.productId) {
                this.productService.find(this.productClassification.productId).subscribe((value: HttpResponse<IProduct>) => {
                    this.productSelect = value.body;
                });
            }
        });
        this.productCategoryTypeService.query().subscribe(
            (res: HttpResponse<IProductCategoryType[]>) => {
                this.productcategorytypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    trackProductCategoryTypeById(index: number, item: IProductCategoryType) {
        return item.idCategoryType;
    }

    itemKey() {
        return this.item.idClassification;
    }

    get productClassification() {
        return this.item;
    }

    set productClassification(productClassification: IProductClassification) {
        this.item = productClassification;
        // this.dateFrom = moment(productClassification.dateFrom).format(DATE_TIME_FORMAT);
        // this.dateThru = moment(productClassification.dateThru).format(DATE_TIME_FORMAT);
    }

    searchcategory(event) {
        this.categoryItems = [];
        this.productCategoryService.search({ query: event.query + '*' }).subscribe((res: HttpResponse<IProductCategory[]>) => {
            this.categoryItems = res.body;
        });
    }

    selectcategory(value) {
        this.item.categoryId = this.categorySelect.idCategory;
    }

    searchproduct(event) {
        this.productItems = [];
        this.productService.search({ query: event.query + '*' }).subscribe((res: HttpResponse<IProduct[]>) => {
            this.productItems = res.body;
        });
    }

    selectproduct(value) {
        this.item.productId = this.productSelect.idProduct;
    }

    print() {
        this.reportUtils.viewFile('/api/report/ProductClassification/pdf');
        return false;
    }
}
