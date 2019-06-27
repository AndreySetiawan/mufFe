import { Component, ViewChild, ElementRef, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { ICategoryScheme } from 'app/shared/model/category-scheme.model';
import { CategorySchemeService } from './category-scheme.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';
import { AbstractEntityAsListComponent } from 'app/shared/base/abstract-entity-as-list.component';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'jhi-category-scheme-as-list',
    templateUrl: './category-scheme-as-list.component.html'
})
export class CategorySchemeAsListComponent extends AbstractEntityAsListComponent<ICategoryScheme> implements OnChanges {
    @Input() filterName: string;
    @Input() idParent: any;

    constructor(
        protected categorySchemeService: CategorySchemeService,
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
            categorySchemeService,
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

        this.listChangeEventName = 'categorySchemeListModification';
        this.entityKeyName = 'idScheme';
        this.predicate = 'idScheme';
    }

    protected loadAllFilterBy() {
        const queryParams: any = { page: this.page - 1, size: this.itemsPerPage, sort: this.sort() };
        if (this.filterName) {
            queryParams.filterName = this.filterName;
        }
        if (this.idParent) {
            queryParams.idParent = this.idParent;
        }
        this.categorySchemeService
            .queryFilterBy(queryParams)
            .subscribe(
                (res: HttpResponse<ICategoryScheme[]>) => this.paginateItems(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idParent']) {
            this.loadAll();
        }
    }

    trackId(index: number, item: ICategoryScheme) {
        return item.idScheme;
    }

    get categorySchemes() {
        return this.items;
    }

    set categorySchemes(categoryScheme: ICategoryScheme[]) {
        this.items = categoryScheme;
    }

    addNewData() {
        const queryParams: any = {};
        if (this.filterName) {
            queryParams.filterName = this.filterName;
        }
        if (this.idParent) {
            queryParams.parentId = this.idParent;
        }
        this.router.navigate(['category-scheme/new', queryParams]);
    }

    onEditComplete(event) {
        this.categorySchemeService.update(event.data).subscribe(() => {
            this.messageService.add({ severity: 'info', summary: 'Data Updated', detail: 'Data updated...' });
            this.eventManager.broadcast({
                name: this.listChangeEventName,
                content: 'Completed an item'
            });
        });
    }
}
