import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiAlertService, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { IGood, Good } from 'app/shared/model/los/good.model';
import { GoodService } from './good.service';
import { IProductType, ProductType } from 'app/shared/model/los/product-type.model';
import { ProductTypeService } from 'app/entities/product-type';
import { IUom, Uom } from 'app/shared/model/uom.model';
import { UomService } from 'app/entities/uom';
import { map } from 'rxjs/operators';
import { AccountService } from 'app/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityUpdateComponent } from 'app/shared/base/abstract-entity-update.component';

@Component({
    selector: 'jhi-good-update',
    templateUrl: './good-update.component.html'
})
export class GoodUpdateComponent extends AbstractEntityUpdateComponent<IGood> {
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
        protected confirmationService: ConfirmationService,
        protected eventManager: JhiEventManager,
        protected toastService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(dataUtils, goodService, elementRef, confirmationService, eventManager, toastService, accountService);
        this.listChangeEventName = 'goodListModification';
        this.item = new Good();
    }

    onInit() {
        this.activatedRoute.params.subscribe(params => {
            if (params['productTypeId']) {
                this.productTypeId = params['productTypeId'];
            }
            if (params['uomId']) {
                this.uomId = params['uomId'];
            }
        });
        this.activatedRoute.data.subscribe(({ good }) => {
            this.good = good;
        });
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

    trackProductTypeById(index: number, item: IProductType) {
        return item.idProductType;
    }

    trackUomById(index: number, item: IUom) {
        return item.idUom;
    }

    itemKey() {
        return this.item.idProduct;
    }

    get good() {
        return this.item;
    }

    set good(good: IGood) {
        this.item = good;
        // this.dateIntroduction = moment(good.dateIntroduction).format(DATE_TIME_FORMAT);
        // this.dateDiscontinue = moment(good.dateDiscontinue).format(DATE_TIME_FORMAT);
    }
}
