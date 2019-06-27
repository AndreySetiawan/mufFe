import { OnInit, OnDestroy, Input } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { AccountService, Account } from 'app/core';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityService } from './abstract-entity.service';
import { ITEMS_PER_PAGE } from 'app/shared';

export class AbstractEntityAsListComponent<T> implements OnInit, OnDestroy {
    @Input() canSearch: boolean;
    protected stompClient = null;

    protected currentAccount: Account;
    protected eventSubscriber: Subscription;
    protected links: any;
    protected previousPage: any;
    protected listChangeEventName: string;
    protected entityKeyName: string;

    public items: T[];
    public selectedItems: T[];
    public currentSearch: string;
    public totalItems: any;
    public first: number;
    public loading: boolean;
    public itemsPerPage: number;
    public page: number;
    public predicate: string;
    public reverse: string;
    public canAdd: boolean;

    constructor(
        protected itemService: AbstractEntityService<T>,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected dataUtils: JhiDataUtils,
        protected router: Router,
        protected eventManager: JhiEventManager,
        protected messageService: MessageService,
        protected confirmationService: ConfirmationService
    ) {
        this.canSearch = false;
        this.first = 0;
        this.page = 1;
        this.reverse = 'asc';
        this.currentSearch = '';
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.canAdd = true;
        // this.pagingKey = Math.random().toString(36);
    }

    protected loadAllFilterBy() {
        this.itemService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<T[]>) => this.paginateItems(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadAll() {
        this.loading = true;
        if (this.currentSearch) {
            this.itemService
                .search({
                    page: this.page - 1,
                    query: this.currentSearch,
                    size: this.itemsPerPage
                })
                .subscribe(
                    (res: HttpResponse<T[]>) => this.paginateItems(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.loadAllFilterBy();
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.loadAll();
        }
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.loadAll();
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.page = 0;
        this.currentSearch = query;
        this.loadAll();
    }

    protected onInit() {
        this.accountService.identity().then(account => {
            this.currentAccount = account;
            this.loadAll();
        });
        this.registerChangeInItems();
    }

    protected onDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    protected onAccountAssigned() {}

    ngOnInit() {
        this.onInit();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
            this.onAccountAssigned();
        });
        this.registerSubscriber();
    }

    ngOnDestroy() {
        this.unRegisterSubscriber();
        this.onDestroy();
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
            this.stompClient = null;
        }
    }

    protected registerSubscriber() {}

    protected unRegisterSubscriber() {}

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInItems() {
        this.eventSubscriber = this.eventManager.subscribe(this.listChangeEventName, response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== this.entityKeyName) {
            result.push(this.entityKeyName);
        }
        return result;
    }

    protected paginateItems(data: T[], headers: HttpHeaders) {
        this.loading = false;
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.items = data;
    }

    protected onError(errorMessage: string) {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
    }

    loadDataLazy(event: LazyLoadEvent) {
        this.itemsPerPage = event.rows;
        this.page = Math.ceil(event.first / this.itemsPerPage) + 1;

        if (event.sortField !== undefined) {
            this.predicate = event.sortField;
        }

        this.loadPage(this.page);
    }

    pageSizeChanged(event) {
        this.itemsPerPage = event.rows;
        this.page = Math.ceil(event.first / this.itemsPerPage) + 1;
        this.loadPage(this.page);
    }

    processEntity(id) {
        this.itemService.process({ idDocument: id }, { processName: 'processEntity' }).subscribe(r => {});
    }

    deleteItem(id) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to remove?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.itemService.delete(id).subscribe(() => {
                    this.messageService.add({ severity: 'warn', summary: 'Remove Data', detail: 'Remove data done...' });
                    this.eventManager.broadcast({
                        name: this.listChangeEventName,
                        content: 'Completed an item'
                    });
                });
            }
        });
    }
}
