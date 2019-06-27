import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiAlertService, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { IFinancialProduct, FinancialProduct } from 'app/shared/model/los/financial-product.model';
import { FinancialProductService } from './financial-product.service';
import { IProductType, ProductType } from 'app/shared/model/los/product-type.model';
import { ProductTypeService } from 'app/entities/product-type';
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
    selector: 'jhi-financial-product-update',
    templateUrl: './financial-product-update.component.html'
})
export class FinancialProductUpdateComponent extends AbstractEntityUpdateComponent<IFinancialProduct> {
    producttypes: IProductType[];
    productTypeId: number;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected financialProductService: FinancialProductService,
        protected productTypeService: ProductTypeService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected confirmationService: ConfirmationService,
        protected eventManager: JhiEventManager,
        protected toastService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService,
        protected reportUtils: ReportUtilService
    ) {
        super(dataUtils, financialProductService, elementRef, confirmationService, eventManager, toastService, accountService);
        this.listChangeEventName = 'financialProductListModification';
        this.financialProduct = new FinancialProduct();
    }

    onInit() {
        this.activatedRoute.params.subscribe(params => {
            if (params['productTypeId']) {
                this.productTypeId = params['productTypeId'];
            }
        });
        this.activatedRoute.data.subscribe(({ financialProduct }) => {
            this.financialProduct = financialProduct;
        });
        this.productTypeService.query().subscribe(
            (res: HttpResponse<IProductType[]>) => {
                this.producttypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    trackProductTypeById(index: number, item: IProductType) {
        return item.idProductType;
    }

    itemKey() {
        return this.item.idProduct;
    }

    get financialProduct() {
        return this.item;
    }

    set financialProduct(financialProduct: IFinancialProduct) {
        this.item = financialProduct;
    }

    print() {
        this.reportUtils.viewFile('/los/api/report/FinancialProduct/pdf');
        return false;
    }

    protected preSave() {
        super.preSave();
        if (this.item.idProduct) {
            this.item.idProduct = this.item.idProduct.toUpperCase();
        }

    }
}
