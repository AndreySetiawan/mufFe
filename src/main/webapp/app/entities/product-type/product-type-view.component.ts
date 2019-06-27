import { Component, OnChanges, SimpleChanges, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IProductType, ProductType } from 'app/shared/model/product-type.model';
import { ProductTypeService } from './product-type.service';
import { AbstractEntityBaseViewComponent } from 'app/shared/base/abstract-entity-view.component';
import { MessageService } from 'primeng/components/common/messageservice';
import { AccountService } from 'app/core';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';

@Component({
    selector: 'jhi-product-type-view',
    templateUrl: './product-type-view.component.html'
})
export class ProductTypeViewComponent extends AbstractEntityBaseViewComponent<IProductType> implements OnChanges {
    @Input() idProductType: number;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected productTypeService: ProductTypeService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected messageService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(productTypeService, messageService, elementRef, dataUtils, accountService);
        this.item = new ProductType();
    }

    onInit() {}

    onPrepareView() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idProductType']) {
            this.item = new ProductType();
            this.productTypeService.find(this.idProductType).subscribe(result => {
                this.item = result.body;
                this.onPrepareView();
            });
        } else if (changes['item']) {
            this.onPrepareView();
        } else if (changes['isSaving'] && this.idProductType) {
            if (this.isSaving) {
                this.save();
            }
        }
    }

    get productType() {
        return this.item;
    }

    set productType(productType: IProductType) {
        this.item = productType;
    }

    itemKey() {
        return this.item.idProductType;
    }
}
