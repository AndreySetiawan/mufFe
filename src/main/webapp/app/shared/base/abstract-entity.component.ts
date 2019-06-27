import { OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiDataUtils } from 'ng-jhipster';
import { AccountService, Account } from 'app/core';
import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityService } from './abstract-entity.service';

export class AbstractEntityComponent<T> implements OnInit, OnDestroy {
    protected stompClient = null;
    protected stompConnection: Promise<any>;
    protected stompConnectedPromise: any;

    protected currentAccount: Account;
    protected eventSubscriber: Subscription;
    protected links: any;
    protected previousPage: any;
    protected reverse: any;
    protected routeData: any;

    public items: T[];
    public selectedItems: T[];
    public currentSearch: string;
    public totalItems: any;
    public itemsPerPage: any;
    public page: number;
    public predicate: string;
    public first: number;
    public loading: boolean;

    protected parentRoute: string;
    protected listChangeEventName: string;
    protected entityKeyName: string;

    constructor(
        protected itemService: AbstractEntityService<T>,
        protected parseLinks: JhiParseLinks,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected dataUtils: JhiDataUtils,
        protected router: Router,
        protected eventManager: JhiEventManager,
        protected messageService: MessageService,
        protected confirmationService: ConfirmationService
    ) {}

    protected createStompConnection(): Promise<any> {
        return new Promise((resolve, reject) => (this.stompConnectedPromise = resolve));
    }

    loadAll() {
        this.loading = true;
        if (this.currentSearch) {
            this.itemService
                .search({
                    page: this.page - 1,
                    query: this.currentSearch,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<T[]>) => this.paginateItems(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
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

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate([this.parentRoute], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                search: this.currentSearch,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate([
            this.parentRoute,
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.page = 0;
        this.currentSearch = query;
        this.router.navigate([
            this.parentRoute,
            {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    protected onInit() {}

    protected onDestroy() {}

    ngOnInit() {
        this.eventSubscriber = this.eventManager.subscribe(this.listChangeEventName, response => this.loadAll());
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.onInit();
        this.registerSubscriber();
    }

    ngOnDestroy() {
        this.unRegisterSubscriber();
        this.eventManager.destroy(this.eventSubscriber);
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

    sort() {
        if (this.currentSearch) {
            return [];
        }
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
            this.reverse = event.sortOrder;
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

    rebuildIndex() {
        this.itemService.process({}, { processName: 'initializeIndex' }).subscribe(r => {
            this.messageService.add({
                severity: 'info',
                summary: 'Rebuild Index',
                detail: 'Rebuild Index Queue, wait until background process done .......'
            });
        });
    }

    deleteItem(id) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to remove ?',
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
