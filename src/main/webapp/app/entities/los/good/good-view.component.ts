import { Component, OnChanges, SimpleChanges, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IGood, Good } from 'app/shared/model/los/good.model';
import { GoodService } from './good.service';
import { AbstractEntityBaseViewComponent } from 'app/shared/base/abstract-entity-view.component';
import { IProductType, ProductType } from 'app/shared/model/los/product-type.model';
import { ProductTypeService } from 'app/entities/product-type';
import { IUom, Uom } from 'app/shared/model/uom.model';
import { UomService } from 'app/entities/uom';
import { MessageService } from 'primeng/components/common/messageservice';
import { AccountService } from 'app/core';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';

@Component({
    selector: 'jhi-good-view',
    templateUrl: './good-view.component.html'
})
export class GoodViewComponent extends AbstractEntityBaseViewComponent<IGood> implements OnChanges {
    @Input() idProduct: string;

    producttypes: IProductType[];

    uoms: IUom[];
    productTypeId: number;
    uomId: string;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected goodService: GoodService,
        protected productTypeService: ProductTypeService,
        protected uomService: UomService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected messageService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(goodService, messageService, elementRef, dataUtils, accountService);
        this.item = new Good();
    }

    onInit() {
        this.productTypeService.query().subscribe(
            (res: HttpResponse<IProductType[]>) => {
                this.producttypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.uomService.query().subscribe(
            (res: HttpResponse<IUom[]>) => {
                this.uoms = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    onPrepareView() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idProduct']) {
            this.item = new Good();
            this.goodService.find(this.idProduct).subscribe(result => {
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

    get good() {
        return this.item;
    }

    set good(good: IGood) {
        this.item = good;
    }

    trackProductTypeById(index: number, item: IProductType) {
        return item.idProductType;
    }

    trackUomById(index: number, item: IUom) {
        return item.idUom;
    }

    itemKey() {
        return this.item.idProduct;
    }
}
