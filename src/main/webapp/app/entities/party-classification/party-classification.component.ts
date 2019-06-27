import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { IPartyClassification, PartyClassification } from 'app/shared/model/party-classification.model';
import { PartyClassificationService } from './party-classification.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityComponent } from 'app/shared/base/abstract-entity.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService } from 'primeng/api';
import { ReportUtilService } from 'app/shared/base/report-util.service';

@Component({
    selector: 'jhi-party-classification',
    templateUrl: './party-classification.component.html'
})
export class PartyClassificationComponent extends AbstractEntityComponent<IPartyClassification> {
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
        protected modalService: NgbModal,
        protected confirmationService: ConfirmationService,
        protected reportUtils: ReportUtilService
    ) {
        super(
            partyClassificationService,
            parseLinks,
            accountService,
            activatedRoute,
            dataUtils,
            router,
            eventManager,
            messageService,
            confirmationService
        );

        this.parentRoute = '/party-classification';
        this.listChangeEventName = 'partyClassificationListModification';
        this.entityKeyName = 'idClassification';

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

    trackId(index: number, item: IPartyClassification) {
        return item.idClassification;
    }

    get partyClassifications() {
        return this.items;
    }

    set partyClassifications(partyClassification: IPartyClassification[]) {
        this.items = partyClassification;
    }

    print() {
        this.reportUtils.viewFile('/los/api/report/PartyClassification/pdf');
    }
}
