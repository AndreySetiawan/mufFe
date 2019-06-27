import { Component, OnChanges, SimpleChanges, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IProductCategoryType, ProductCategoryType } from 'app/shared/model/product-category-type.model';
import { ProductCategoryTypeService } from './product-category-type.service';
import { AbstractEntityBaseViewComponent } from 'app/shared/base/abstract-entity-view.component';
import { ICategoryScheme, CategoryScheme } from 'app/shared/model/category-scheme.model';
import { CategorySchemeService } from 'app/entities/category-scheme';
import { MessageService } from 'primeng/components/common/messageservice';
import { AccountService } from 'app/core';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';

@Component({
    selector: 'jhi-product-category-type-view',
    templateUrl: './product-category-type-view.component.html'
})
export class ProductCategoryTypeViewComponent extends AbstractEntityBaseViewComponent<IProductCategoryType> implements OnChanges {
    @Input() idCategoryType: number;

    categoryschemes: ICategoryScheme[];
    schemeId: number;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected productCategoryTypeService: ProductCategoryTypeService,
        protected categorySchemeService: CategorySchemeService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected messageService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(productCategoryTypeService, messageService, elementRef, dataUtils, accountService);
        this.item = new ProductCategoryType();
    }

    onInit() {
        this.categorySchemeService.query().subscribe(
            (res: HttpResponse<ICategoryScheme[]>) => {
                this.categoryschemes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    onPrepareView() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idCategoryType']) {
            this.item = new ProductCategoryType();
            this.productCategoryTypeService.find(this.idCategoryType).subscribe(result => {
                this.item = result.body;
                this.onPrepareView();
            });
        } else if (changes['item']) {
            this.onPrepareView();
        } else if (changes['isSaving'] && this.idCategoryType) {
            if (this.isSaving) {
                this.save();
            }
        }
    }

    get productCategoryType() {
        return this.item;
    }

    set productCategoryType(productCategoryType: IProductCategoryType) {
        this.item = productCategoryType;
    }

    trackCategorySchemeById(index: number, item: ICategoryScheme) {
        return item.idScheme;
    }

    itemKey() {
        return this.item.idCategoryType;
    }
}
