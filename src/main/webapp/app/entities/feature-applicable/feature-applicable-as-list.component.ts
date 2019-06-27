import { Component, ViewChild, ElementRef, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { IFeatureApplicable } from 'app/shared/model/feature-applicable.model';
import { FeatureApplicableService } from './feature-applicable.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';
import { AbstractEntityAsListComponent } from 'app/shared/base/abstract-entity-as-list.component';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'jhi-feature-applicable-as-list',
    templateUrl: './feature-applicable-as-list.component.html'
})
export class FeatureApplicableAsListComponent extends AbstractEntityAsListComponent<IFeatureApplicable> implements OnChanges {
    @Input() filterName: string;
    @Input() idFeatureType: any;
    @Input() idFeature: any;
    @Input() idProduct: any;
    @ViewChild('inputFile') inputFile: ElementRef;

    rowGroupMetadata: any;

    constructor(
        protected featureApplicableService: FeatureApplicableService,
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
            featureApplicableService,
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
        this.itemsPerPage = 9999;

        this.listChangeEventName = 'featureApplicableListModification';
        this.entityKeyName = 'idApplicability';
        this.predicate = 'feature.featureCode';
    }

    sort() {
        const result = ['feature.featureType.typeCode,' + (this.reverse ? 'asc' : 'desc')];
        result.push('feature.featureCode');
        result.push('idApplicability');
        return result;
    }

    protected loadAllFilterBy() {
        const queryParams: any = { page: this.page - 1, size: this.itemsPerPage, sort: this.sort() };
        if (this.filterName) {
            queryParams.filterName = this.filterName;
        }
        if (this.idFeatureType) {
            queryParams.idFeatureType = this.idFeatureType;
        }
        if (this.idFeature) {
            queryParams.idFeature = this.idFeature;
        }
        if (this.idProduct) {
            queryParams.idProduct = this.idProduct;
        }
        this.featureApplicableService
            .queryFilterBy(queryParams)
            .subscribe(
                (res: HttpResponse<IFeatureApplicable[]>) => {
                    this.paginateItems(res.body, res.headers);
                    this.updateRowGroupMetaData();
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};
        if (this.items) {
            for (let i = 0; i < this.items.length; i++) {
                const rowData = this.items[i];
                const category = rowData.featureTypeDescription;
                if (i === 0) {
                    this.rowGroupMetadata[category] = { index: 0, size: 1 };
                } else {
                    const previousRowData = this.items[i - 1];
                    const previousRowGroup = previousRowData.featureTypeDescription;
                    if (category === previousRowGroup) {
                        this.rowGroupMetadata[category].size++;
                    } else {
                        this.rowGroupMetadata[category] = { index: i, size: 1 };
                    }
                }
            }
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idFeatureType']) {
            this.loadAll();
        }
        if (changes['idFeature']) {
            this.loadAll();
        }
        if (changes['idProduct']) {
            this.loadAll();
        }
    }

    trackId(index: number, item: IFeatureApplicable) {
        return item.idApplicability;
    }

    get featureApplicables() {
        return this.items;
    }

    set featureApplicables(featureApplicable: IFeatureApplicable[]) {
        this.items = featureApplicable;
    }

    addNewData() {
        const queryParams: any = {};
        if (this.filterName) {
            queryParams.filterName = this.filterName;
        }
        if (this.idFeatureType) {
            queryParams.featureTypeId = this.idFeatureType;
        }
        if (this.idFeature) {
            queryParams.featureId = this.idFeature;
        }
        if (this.idProduct) {
            queryParams.productId = this.idProduct;
        }
        this.router.navigate(['feature-applicable/new', queryParams]);
    }

    onEditComplete(event) {
        console.log('xxxxx 1', event);
        this.featureApplicableService.update(event.data).subscribe(() => {
            this.messageService.add({ severity: 'info', summary: 'Data Updated', detail: 'Data updated...' });
            this.eventManager.broadcast({
                name: this.listChangeEventName,
                content: 'Completed an item'
            });
        });
    }

    onChange(value) {
        console.log('xxxx 2', value);
    }

    processValue(rowData) {
        rowData.value = !rowData.value;
        console.log('xxxxx 1', rowData);
        this.featureApplicableService.update(rowData).subscribe(() => {
            this.messageService.add({ severity: 'info', summary: 'Data Value changed', detail: 'Data Value changed...' });
            this.eventManager.broadcast({
                name: this.listChangeEventName,
                content: 'Completed an item'
            });
        });
    }

}
