import { Component, ViewChild, ElementRef, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { IProductClassification } from 'app/shared/model/product-classification.model';
import { ProductClassificationService } from './product-classification.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';
import { AbstractEntityAsListComponent } from 'app/shared/base/abstract-entity-as-list.component';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'jhi-product-classification-as-list',
    templateUrl: './product-classification-as-list.component.html'
})
export class ProductClassificationAsListComponent extends AbstractEntityAsListComponent<IProductClassification> implements OnChanges {
    @Input() filterName: string;
    @Input() idCategoryType: any;
    @Input() idCategory: any;
    @Input() idProduct: any;
    @ViewChild('inputFile') inputFile: ElementRef;

    constructor(
        protected productClassificationService: ProductClassificationService,
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
            productClassificationService,
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

        this.listChangeEventName = 'productClassificationListModification';
        this.entityKeyName = 'idClassification';
        this.predicate = 'idClassification';
    }

    protected loadAllFilterBy() {
        const queryParams: any = { page: this.page - 1, size: this.itemsPerPage, sort: this.sort() };
        if (this.filterName) {
            queryParams.filterName = this.filterName;
        }
        if (this.idCategoryType) {
            queryParams.idCategoryType = this.idCategoryType;
        }
        if (this.idCategory) {
            queryParams.idCategory = this.idCategory;
        }
        if (this.idProduct) {
            queryParams.idProduct = this.idProduct;
        }
        this.productClassificationService
            .queryFilterBy(queryParams)
            .subscribe(
                (res: HttpResponse<IProductClassification[]>) => this.paginateItems(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idCategoryType']) {
            this.loadAll();
        }
        if (changes['idCategory']) {
            this.loadAll();
        }
        if (changes['idProduct']) {
            this.loadAll();
        }
    }

    trackId(index: number, item: IProductClassification) {
        return item.idClassification;
    }

    get productClassifications() {
        return this.items;
    }

    set productClassifications(productClassification: IProductClassification[]) {
        this.items = productClassification;
    }

    addNewData() {
        const queryParams: any = {};
        if (this.filterName) {
            queryParams.filterName = this.filterName;
        }
        if (this.idCategoryType) {
            queryParams.categoryTypeId = this.idCategoryType;
        }
        if (this.idCategory) {
            queryParams.categoryId = this.idCategory;
        }
        if (this.idProduct) {
            queryParams.productId = this.idProduct;
        }
        this.router.navigate(['product-classification/new', queryParams]);
    }

    onEditComplete(event) {
        this.productClassificationService.update(event.data).subscribe(() => {
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
