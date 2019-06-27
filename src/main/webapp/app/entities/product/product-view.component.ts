import { Component, OnChanges, SimpleChanges, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IProduct, Product } from 'app/shared/model/product.model';
import { ProductService } from './product.service';
import { AbstractEntityBaseViewComponent } from 'app/shared/base/abstract-entity-view.component';
import { IProductType, ProductType } from 'app/shared/model/product-type.model';
import { ProductTypeService } from 'app/entities/product-type';
import { MessageService } from 'primeng/components/common/messageservice';
import { AccountService } from 'app/core';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';

@Component({
    selector: 'jhi-product-view',
    templateUrl: './product-view.component.html'
})
export class ProductViewComponent extends AbstractEntityBaseViewComponent<IProduct> implements OnChanges {
    @Input() idProduct: string;

    producttypes: IProductType[];
    productTypeId: number;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected productService: ProductService,
        protected productTypeService: ProductTypeService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected messageService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(productService, messageService, elementRef, dataUtils, accountService);
        this.item = new Product();
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
            this.item = new Product();
            this.productService.find(this.idProduct).subscribe(result => {
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

    get product() {
        return this.item;
    }

    set product(product: IProduct) {
        this.item = product;
    }

    trackProductTypeById(index: number, item: IProductType) {
        return item.idProductType;
    }

    itemKey() {
        return this.item.idProduct;
    }
}
