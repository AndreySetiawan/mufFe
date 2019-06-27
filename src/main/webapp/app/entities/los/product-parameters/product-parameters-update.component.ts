import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiAlertService, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { IProductParameters, ProductParameters } from 'app/shared/model/los/product-parameters.model';
import { ProductParametersService } from './product-parameters.service';
import { ICategoryScheme, CategoryScheme } from 'app/shared/model/category-scheme.model';
import { CategorySchemeService } from 'app/entities/category-scheme';
import { IProductType, ProductType } from 'app/shared/model/product-type.model';
import { ProductTypeService } from 'app/entities/product-type';
import { map } from 'rxjs/operators';
import { AccountService } from 'app/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityUpdateComponent } from 'app/shared/base/abstract-entity-update.component';

@Component({
    selector: 'jhi-product-parameters-update',
    templateUrl: './product-parameters-update.component.html'
})
export class ProductParametersUpdateComponent extends AbstractEntityUpdateComponent<IProductParameters> {
    categoryschemes: ICategoryScheme[];

    producttypes: IProductType[];
    schemeId: number;
    productTypeId: number;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected productParametersService: ProductParametersService,
        protected categorySchemeService: CategorySchemeService,
        protected productTypeService: ProductTypeService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected confirmationService: ConfirmationService,
        protected eventManager: JhiEventManager,
        protected toastService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(dataUtils, productParametersService, elementRef, confirmationService, eventManager, toastService, accountService);
        this.listChangeEventName = 'productParametersListModification';
        this.item = new ProductParameters();
    }

    onInit() {
        this.activatedRoute.params.subscribe(params => {
            if (params['schemeId']) {
                this.schemeId = params['schemeId'];
            }
            if (params['productTypeId']) {
                this.productTypeId = params['productTypeId'];
            }
        });
        this.activatedRoute.data.subscribe(({ productParameters }) => {
            this.productParameters = productParameters;
        });
        this.categorySchemeService.query().subscribe(
            (res: HttpResponse<ICategoryScheme[]>) => {
                this.categoryschemes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.productTypeService.query().subscribe(
            (res: HttpResponse<IProductType[]>) => {
                this.producttypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    trackCategorySchemeById(index: number, item: ICategoryScheme) {
        return item.idScheme;
    }

    trackProductTypeById(index: number, item: IProductType) {
        return item.idProductType;
    }

    itemKey() {
        return this.item.idParameter;
    }

    get productParameters() {
        return this.item;
    }

    set productParameters(productParameters: IProductParameters) {
        this.item = productParameters;
        // this.dateFrom = moment(productParameters.dateFrom).format(DATE_TIME_FORMAT);
        // this.dateThru = moment(productParameters.dateThru).format(DATE_TIME_FORMAT);
    }
}
