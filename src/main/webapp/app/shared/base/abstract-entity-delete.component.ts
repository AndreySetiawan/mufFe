import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityService } from 'app/shared/base/abstract-entity.service';
import { AccountService, Account } from 'app/core';

export class AbstractEntityDeleteDialogComponent<T> implements OnInit, OnDestroy {
    protected stompClient = null;

    private _item: T;
    protected currentAccount: Account;
    protected listChangeEventName: string;

    constructor(
        protected itemService: AbstractEntityService<T>,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager,
        protected messageService: MessageService,
        protected accountService: AccountService
    ) {}

    ngOnInit() {
        this.onInit();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerSubscriber();
    }

    ngOnDestroy() {
        this.unRegisterSubscriber();
        this.onDestroy();
    }

    protected registerSubscriber() {}

    protected unRegisterSubscriber() {}

    protected onInit() {}

    protected onDestroy() {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id) {
        this.itemService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: this.listChangeEventName,
                content: 'Deleted an Item'
            });
            this.activeModal.dismiss(true);
        });
    }

    set item(value: T) {
        this._item = value;
    }

    get item() {
        return this._item;
    }
}

export class AbstractEntityPopupComponent<T> implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(
        protected component: Component,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected modalService: NgbModal
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ item }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(this.component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.item = item;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
