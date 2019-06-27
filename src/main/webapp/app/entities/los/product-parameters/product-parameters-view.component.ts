import { Component, OnChanges, SimpleChanges, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IProductParameters, ProductParameters } from 'app/shared/model/los/product-parameters.model';
import { ProductParametersService } from './product-parameters.service';
import { AbstractEntityBaseViewComponent } from 'app/shared/base/abstract-entity-view.component';
import { ICategoryScheme, CategoryScheme } from 'app/shared/model/category-scheme.model';
import { CategorySchemeService } from 'app/entities/category-scheme';
import { IProductType, ProductType } from 'app/shared/model/product-type.model';
import { ProductTypeService } from 'app/entities/product-type';
import { MessageService } from 'primeng/components/common/messageservice';
import { AccountService } from 'app/core';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';
import { ObjectSourceService } from '../object-source';
import { IObjectSource } from 'app/shared/model/los/object-source.model';

@Component({
    selector: 'jhi-product-parameters-view',
    templateUrl: './product-parameters-view.component.html'
})
export class ProductParametersViewComponent extends AbstractEntityBaseViewComponent<IProductParameters> implements OnChanges {
    @Input() idParameter: number;

    categoryschemes: ICategoryScheme[];
    objectSources: IObjectSource[];

    producttypes: IProductType[];
    schemeId: number;
    productTypeId: number;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected productParametersService: ProductParametersService,
        protected categorySchemeService: CategorySchemeService,
        protected productTypeService: ProductTypeService,
        protected objectSourceService: ObjectSourceService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected messageService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(productParametersService, messageService, elementRef, dataUtils, accountService);
        this.item = new ProductParameters();
    }

    onInit() {
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
        this.objectSourceService.query({size: 9999}).subscribe(
            (res: HttpResponse<IObjectSource[]>) => {
                this.objectSources = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    onPrepareView() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idParameter']) {
            this.item = new ProductParameters();
            this.productParametersService.find(this.idParameter).subscribe(result => {
                this.item = result.body;
                this.onPrepareView();
            });
        } else if (changes['item']) {
            this.onPrepareView();
        } else if (changes['isSaving'] && this.idParameter) {
            if (this.isSaving) {
                this.save();
            }
        }
    }

    get productParameters() {
        return this.item;
    }

    set productParameters(productParameters: IProductParameters) {
        this.item = productParameters;
    }

    trackCategorySchemeById(index: number, item: ICategoryScheme) {
        return item.idScheme;
    }

    trackObjectSourceById(index: number, item: IObjectSource) {
        return item.idObjectSource;
    }

    trackProductTypeById(index: number, item: IProductType) {
        return item.idProductType;
    }

    itemKey() {
        return this.item.idParameter;
    }
}
