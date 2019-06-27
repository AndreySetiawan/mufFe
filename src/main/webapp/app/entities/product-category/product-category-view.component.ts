import { Component, OnChanges, SimpleChanges, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IProductCategory, ProductCategory } from 'app/shared/model/product-category.model';
import { ProductCategoryService } from './product-category.service';
import { AbstractEntityBaseViewComponent } from 'app/shared/base/abstract-entity-view.component';
import { IProductCategoryType, ProductCategoryType } from 'app/shared/model/product-category-type.model';
import { ProductCategoryTypeService } from 'app/entities/product-category-type';
import { MessageService } from 'primeng/components/common/messageservice';
import { AccountService } from 'app/core';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';

@Component({
    selector: 'jhi-product-category-view',
    templateUrl: './product-category-view.component.html'
})
export class ProductCategoryViewComponent extends AbstractEntityBaseViewComponent<IProductCategory> implements OnChanges {
    @Input() idCategory: number;

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
        protected messageService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(productCategoryService, messageService, elementRef, dataUtils, accountService);
        this.item = new ProductCategory();
    }

    onInit() {
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

    onPrepareView() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idCategory']) {
            this.item = new ProductCategory();
            this.productCategoryService.find(this.idCategory).subscribe(result => {
                this.item = result.body;
                this.onPrepareView();
            });
        } else if (changes['item']) {
            this.onPrepareView();
        } else if (changes['isSaving'] && this.idCategory) {
            if (this.isSaving) {
                this.save();
            }
        }
    }

    get productCategory() {
        return this.item;
    }

    set productCategory(productCategory: IProductCategory) {
        this.item = productCategory;
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
}
