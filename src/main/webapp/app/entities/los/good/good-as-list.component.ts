import { Component, ViewChild, ElementRef, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { IGood } from 'app/shared/model/los/good.model';
import { GoodService } from './good.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';
import { AbstractEntityAsListComponent } from 'app/shared/base/abstract-entity-as-list.component';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'jhi-good-as-list',
    templateUrl: './good-as-list.component.html'
})
export class GoodAsListComponent extends AbstractEntityAsListComponent<IGood> implements OnChanges {
    @Input() filterName: string;
    @Input() idProductType: any;
    @Input() idUom: any;

    constructor(
        protected goodService: GoodService,
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
            goodService,
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

        this.listChangeEventName = 'goodListModification';
        this.entityKeyName = 'idProduct';
        this.predicate = 'idProduct';
    }

    protected loadAllFilterBy() {
        const queryParams: any = { page: this.page - 1, size: this.itemsPerPage, sort: this.sort() };
        if (this.filterName) {
            queryParams.filterName = this.filterName;
        }
        if (this.idProductType) {
            queryParams.idProductType = this.idProductType;
        }
        if (this.idUom) {
            queryParams.idUom = this.idUom;
        }
        this.goodService
            .queryFilterBy(queryParams)
            .subscribe(
                (res: HttpResponse<IGood[]>) => this.paginateItems(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idProductType']) {
            this.loadAll();
        }
        if (changes['idUom']) {
            this.loadAll();
        }
    }

    trackId(index: number, item: IGood) {
        return item.idProduct;
    }

    get goods() {
        return this.items;
    }

    set goods(good: IGood[]) {
        this.items = good;
    }

    addNewData() {
        const queryParams: any = {};
        if (this.filterName) {
            queryParams.filterName = this.filterName;
        }
        if (this.idProductType) {
            queryParams.productTypeId = this.idProductType;
        }
        if (this.idUom) {
            queryParams.uomId = this.idUom;
        }
        this.router.navigate(['good/new', queryParams]);
    }

    onEditComplete(event) {
        this.goodService.update(event.data).subscribe(() => {
            this.messageService.add({ severity: 'info', summary: 'Data Updated', detail: 'Data updated...' });
            this.eventManager.broadcast({
                name: this.listChangeEventName,
                content: 'Completed an item'
            });
        });
    }
}
