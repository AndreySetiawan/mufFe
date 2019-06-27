import { Component, ViewChild, ElementRef, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { IPartyClassification } from 'app/shared/model/party-classification.model';
import { PartyClassificationService } from './party-classification.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';
import { AbstractEntityAsListComponent } from 'app/shared/base/abstract-entity-as-list.component';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'jhi-party-classification-as-list',
    templateUrl: './party-classification-as-list.component.html'
})
export class PartyClassificationAsListComponent extends AbstractEntityAsListComponent<IPartyClassification> implements OnChanges {
    @Input() filterName: string;
    @Input() idCategoryType: any;
    @Input() idCategory: any;
    @Input() idParty: any;

    constructor(
        protected partyClassificationService: PartyClassificationService,
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
            partyClassificationService,
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

        this.listChangeEventName = 'partyClassificationListModification';
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
        if (this.idParty) {
            queryParams.idParty = this.idParty;
        }
        this.partyClassificationService
            .queryFilterBy(queryParams)
            .subscribe(
                (res: HttpResponse<IPartyClassification[]>) => this.paginateItems(res.body, res.headers),
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
        if (changes['idParty']) {
            this.loadAll();
        }
    }

    trackId(index: number, item: IPartyClassification) {
        return item.idClassification;
    }

    get partyClassifications() {
        return this.items;
    }

    set partyClassifications(partyClassification: IPartyClassification[]) {
        this.items = partyClassification;
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
        if (this.idParty) {
            queryParams.partyId = this.idParty;
        }
        this.router.navigate(['party-classification/new', queryParams]);
    }

    onEditComplete(event) {
        this.partyClassificationService.update(event.data).subscribe(() => {
            this.messageService.add({ severity: 'info', summary: 'Data Updated', detail: 'Data updated...' });
            this.eventManager.broadcast({
                name: this.listChangeEventName,
                content: 'Completed an item'
            });
        });
    }
}
