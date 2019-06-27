import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiAlertService, JhiDataUtils, JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { IProductCategory, ProductCategory } from 'app/shared/model/product-category.model';
import { ProductCategoryService } from './product-category.service';
import { IProductCategoryType, ProductCategoryType } from 'app/shared/model/product-category-type.model';
import { ProductCategoryTypeService } from 'app/entities/product-category-type';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityLovComponent, AbstractEntityLovPopupComponent } from 'app/shared/base/abstract-entity-lov.component';
import { AccountService } from 'app/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-product-category-lov-dialog',
    templateUrl: './product-category-lov.component.html'
})
export class ProductCategoryLovDialogComponent extends AbstractEntityLovComponent<IProductCategory> {
    productcategories: IProductCategory[];

    productcategorytypes: IProductCategoryType[];
    parentId: number;
    categoryTypeId: number;

    constructor(
        protected productCategoryService: ProductCategoryService,
        protected productCategoryTypeService: ProductCategoryTypeService,
        protected confirmationService: ConfirmationService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected dataUtils: JhiDataUtils,
        protected router: Router,
        protected eventManager: JhiEventManager,
        protected toastService: MessageService,
        public activeModal: NgbActiveModal
    ) {
        super(
            productCategoryService,
            parseLinks,
            jhiAlertService,
            accountService,
            activatedRoute,
            dataUtils,
            router,
            eventManager,
            toastService,
            activeModal,
            confirmationService
        );

        this.listChangeEventName = 'productCategoryListModification';
        this.entityKeyName = 'idCategory';

        this.predicate = this.entityKeyName;
        this.page = 1;
        this.itemsPerPage = 10;
        this.first = (this.page - 1) * this.itemsPerPage;
    }

    protected onInit() {
        this.productCategory = new ProductCategory();
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

    trackId(index: number, item: IProductCategory) {
        return item.idCategory;
    }

    setViewNew() {
        this.activeView = 'new-data';
    }

    setViewList() {
        this.activeView = 'list';
    }

    trackProductCategoryById(index: number, item: IProductCategory) {
        return item.idCategory;
    }

    trackProductCategoryTypeById(index: number, item: IProductCategoryType) {
        return item.idCategoryType;
    }

    get productCategory() {
        return this.item;
    }

    set productCategory(productCategory: IProductCategory) {
        this.item = productCategory;
    }
}

@Component({
    selector: 'jhi-product-category-lov-popup',
    template: ''
})
export class ProductCategoryLovPopupComponent extends AbstractEntityLovPopupComponent<IProductCategory> {
    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {
        super(ProductCategoryLovDialogComponent as Component, activatedRoute, router, modalService);
    }
}
