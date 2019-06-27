import { Component, OnChanges, SimpleChanges, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IFinancialProduct, FinancialProduct } from 'app/shared/model/los/financial-product.model';
import { FinancialProductService } from './financial-product.service';
import { AbstractEntityBaseViewComponent } from 'app/shared/base/abstract-entity-view.component';
import { IProductType, ProductType } from 'app/shared/model/los/product-type.model';
import { ProductTypeService } from 'app/entities/product-type';
import { MessageService } from 'primeng/components/common/messageservice';
import { AccountService } from 'app/core';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';

@Component({
    selector: 'jhi-financial-product-view',
    templateUrl: './financial-product-view.component.html'
})
export class FinancialProductViewComponent extends AbstractEntityBaseViewComponent<IFinancialProduct> implements OnChanges {
    @Input() idProduct: string;

    producttypes: IProductType[];
    productTypeId: number;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected financialProductService: FinancialProductService,
        protected productTypeService: ProductTypeService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected messageService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(financialProductService, messageService, elementRef, dataUtils, accountService);
        this.financialProduct = new FinancialProduct();
    }

    onInit() {
        this.productTypeService.query().subscribe(
            (res: HttpResponse<IProductType[]>) => {
                this.producttypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    onPrepareView() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idProduct']) {
            this.item = new FinancialProduct();
            this.financialProductService.find(this.idProduct).subscribe(result => {
                this.item = result.body;
                this.onPrepareView();
            });
        } else if (changes['item']) {
            this.onPrepareView();
        } else if (changes['isSaving'] && this.idProduct) {
            if (this.isSaving) {
                this.save();
            }
        }
    }

    get financialProduct() {
        return this.item;
    }

    set financialProduct(financialProduct: IFinancialProduct) {
        this.item = financialProduct;
    }

    trackProductTypeById(index: number, item: IProductType) {
        return item.idProductType;
    }

    itemKey() {
        return this.item.idProduct;
    }

    protected preSave() {
        super.preSave();
        if (this.item.idProduct) {
            this.item.idProduct = this.item.idProduct.toUpperCase();
        }
    }
}
