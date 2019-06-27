import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { IProductType, ProductType } from 'app/shared/model/product-type.model';
import { ProductTypeService } from './product-type.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityComponent } from 'app/shared/base/abstract-entity.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'jhi-product-type',
    templateUrl: './product-type.component.html'
})
export class ProductTypeComponent extends AbstractEntityComponent<IProductType> {
    constructor(
        protected productTypeService: ProductTypeService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected dataUtils: JhiDataUtils,
        protected router: Router,
        protected eventManager: JhiEventManager,
        protected messageService: MessageService,
        protected modalService: NgbModal,
        protected confirmationService: ConfirmationService
    ) {
        super(
            productTypeService,
            parseLinks,
            accountService,
            activatedRoute,
            dataUtils,
            router,
            eventManager,
            messageService,
            confirmationService
        );

        this.parentRoute = '/product-type';
        this.listChangeEventName = 'productTypeListModification';
        this.entityKeyName = 'idProductType';

        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
            activatedRoute.queryParams.subscribe(params => {
                this.itemsPerPage = params['size'] || ITEMS_PER_PAGE;
                this.first = (this.page - 1) * this.itemsPerPage || 0;
            });
        });
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    trackId(index: number, item: IProductType) {
        return item.idProductType;
    }

    get productTypes() {
        return this.items;
    }

    set productTypes(productType: IProductType[]) {
        this.items = productType;
    }
}
