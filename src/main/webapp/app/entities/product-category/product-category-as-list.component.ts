import { Component, ViewChild, ElementRef, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { IProductCategory } from 'app/shared/model/product-category.model';
import { ProductCategoryService } from './product-category.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';
import { AbstractEntityAsListComponent } from 'app/shared/base/abstract-entity-as-list.component';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'jhi-product-category-as-list',
    templateUrl: './product-category-as-list.component.html'
})
export class ProductCategoryAsListComponent extends AbstractEntityAsListComponent<IProductCategory> implements OnChanges {
    @Input() filterName: string;
    @Input() idParent: any;
    @Input() idCategoryType: any;
    @ViewChild('inputFile') inputFile: ElementRef;

    constructor(
        protected productCategoryService: ProductCategoryService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected dataUtils: JhiDataUtils,
        protected router: Router,
        protected eventManager: JhiEventManager,
        protected messageService: MessageService,
        protected confirmationService: ConfirmationService,
        protected webSocket: BaseWebSocketService
    ) {
        super(
            productCategoryService,
            parseLinks,
            jhiAlertService,
            accountService,
            activatedRoute,
            dataUtils,
            router,
            eventManager,
            messageService,
            confirmationService
        );

        this.listChangeEventName = 'productCategoryListModification';
        this.entityKeyName = 'idCategory';
        this.predicate = 'idCategory';
    }

    protected loadAllFilterBy() {
        const queryParams: any = { page: this.page - 1, size: this.itemsPerPage, sort: this.sort() };
        if (this.filterName) {
            queryParams.filterName = this.filterName;
        }
        if (this.idParent) {
            queryParams.idParent = this.idParent;
        }
        if (this.idCategoryType) {
            queryParams.idCategoryType = this.idCategoryType;
        }
        this.productCategoryService
            .queryFilterBy(queryParams)
            .subscribe(
                (res: HttpResponse<IProductCategory[]>) => this.paginateItems(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idParent']) {
            this.loadAll();
        }
        if (changes['idCategoryType']) {
            this.loadAll();
        }
    }

    trackId(index: number, item: IProductCategory) {
        return item.idCategory;
    }

    get productCategories() {
        return this.items;
    }

    set productCategories(productCategory: IProductCategory[]) {
        this.items = productCategory;
    }

    addNewData() {
        const queryParams: any = {};
        if (this.filterName) {
            queryParams.filterName = this.filterName;
        }
        if (this.idParent) {
            queryParams.parentId = this.idParent;
        }
        if (this.idCategoryType) {
            queryParams.categoryTypeId = this.idCategoryType;
        }
        this.router.navigate(['product-category/new', queryParams]);
    }

    onEditComplete(event) {
        this.productCategoryService.update(event.data).subscribe(() => {
            this.messageService.add({ severity: 'info', summary: 'Data Updated', detail: 'Data updated...' });
            this.eventManager.broadcast({
                name: this.listChangeEventName,
                content: 'Completed an item'
            });
        });
    }

    onUploadFile(event) {
        const files: FileList = event.target.files;

        if (files.length > 0) {
            const formData: FormData = new FormData();
            formData.append('file', files[0], files[0].name);
            this.itemService.uploadFile(formData, null).subscribe(res => {
                this.inputFile.nativeElement.value = null;
                this.itemService.process({ fileName: res.body.fileName }, { processName: 'processUploadFile' }).subscribe(() => {
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Upload Done',
                        detail: 'Upload ' + res.body.fileName + ' done process'
                    });
                });
            });
        }
    }
}
