import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { IWorkType, WorkType } from 'app/shared/model/work-type.model';
import { WorkTypeService } from './work-type.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityComponent } from 'app/shared/base/abstract-entity.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'jhi-work-type',
    templateUrl: './work-type.component.html'
})
export class WorkTypeComponent extends AbstractEntityComponent<IWorkType> {
    constructor(
        protected workTypeService: WorkTypeService,
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
            workTypeService,
            parseLinks,
            accountService,
            activatedRoute,
            dataUtils,
            router,
            eventManager,
            messageService,
            confirmationService
        );

        this.parentRoute = '/work-type';
        this.listChangeEventName = 'workTypeListModification';
        this.entityKeyName = 'idWorkType';

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

    trackId(index: number, item: IWorkType) {
        return item.idWorkType;
    }

    get workTypes() {
        return this.items;
    }

    set workTypes(workType: IWorkType[]) {
        this.items = workType;
    }
}
