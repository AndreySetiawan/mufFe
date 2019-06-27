import { Component, OnChanges, SimpleChanges, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IProductClassification, ProductClassification } from 'app/shared/model/product-classification.model';
import { ProductClassificationService } from './product-classification.service';
import { AbstractEntityBaseViewComponent } from 'app/shared/base/abstract-entity-view.component';
import { IProductCategoryType, ProductCategoryType } from 'app/shared/model/product-category-type.model';
import { ProductCategoryTypeService } from 'app/entities/product-category-type';
import { IProductCategory, ProductCategory } from 'app/shared/model/product-category.model';
import { ProductCategoryService } from 'app/entities/product-category';
import { IProduct, Product } from 'app/shared/model/product.model';
import { ProductService } from 'app/entities/product';
import { MessageService } from 'primeng/components/common/messageservice';
import { AccountService } from 'app/core';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';

@Component({
    selector: 'jhi-product-classification-view',
    templateUrl: './product-classification-view.component.html'
})
export class ProductClassificationViewComponent extends AbstractEntityBaseViewComponent<IProductClassification> implements OnChanges {
    @Input() idClassification: number;

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
        protected messageService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(productClassificationService, messageService, elementRef, dataUtils, accountService);
        this.categorySelect = new ProductCategory();
        this.productSelect = new Product();
        this.item = new ProductClassification();
    }

    onInit() {
        this.productCategoryTypeService.query().subscribe(
            (res: HttpResponse<IProductCategoryType[]>) => {
                this.productcategorytypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    onPrepareView() {
        if (this.productClassification.categoryId) {
            this.productCategoryService.find(this.productClassification.categoryId).subscribe(
                (value: HttpResponse<IProductCategory>) => {
                    this.categorySelect = value.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
        if (this.productClassification.productId) {
            this.productService.find(this.productClassification.productId).subscribe(
                (value: HttpResponse<IProduct>) => {
                    this.productSelect = value.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idClassification']) {
            this.item = new ProductClassification();
            this.productClassificationService.find(this.idClassification).subscribe(result => {
                this.item = result.body;
                this.onPrepareView();
            });
        } else if (changes['item']) {
            this.onPrepareView();
        } else if (changes['isSaving'] && this.idClassification) {
            if (this.isSaving) {
                this.save();
            }
        }
    }

    get productClassification() {
        return this.item;
    }

    set productClassification(productClassification: IProductClassification) {
        this.item = productClassification;
    }

    trackProductCategoryTypeById(index: number, item: IProductCategoryType) {
        return item.idCategoryType;
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

    itemKey() {
        return this.item.idClassification;
    }
}
