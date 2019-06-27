import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { IRuleType, RuleType } from 'app/shared/model/rule-type.model';
import { RuleTypeService } from './rule-type.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityComponent } from 'app/shared/base/abstract-entity.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'jhi-rule-type',
    templateUrl: './rule-type.component.html'
})
export class RuleTypeComponent extends AbstractEntityComponent<IRuleType> {
    constructor(
        protected ruleTypeService: RuleTypeService,
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
            ruleTypeService,
            parseLinks,
            accountService,
            activatedRoute,
            dataUtils,
            router,
            eventManager,
            messageService,
            confirmationService
        );

        this.parentRoute = '/rule-type';
        this.listChangeEventName = 'ruleTypeListModification';
        this.entityKeyName = 'idRuleType';

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

    trackId(index: number, item: IRuleType) {
        return item.idRuleType;
    }

    get ruleTypes() {
        return this.items;
    }

    set ruleTypes(ruleType: IRuleType[]) {
        this.items = ruleType;
    }
}
