import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityService } from 'app/shared/base/abstract-entity.service';
import { AccountService, Account } from 'app/core';
import { AbstractEntityAsListComponent } from 'app/shared/base/abstract-entity-as-list.component';
import { HttpResponse } from '@angular/common/http';
import { ConfirmationService } from 'primeng/components/common/api';

export class AbstractEntityLovComponent<T> extends AbstractEntityAsListComponent<T> {
    protected item: T;
    protected currentAccount: Account;

    public activeView: string;
    public selectionMode: string;
    public enableAdd: boolean;

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
        public activeModal: NgbActiveModal,
        protected confirmationService: ConfirmationService
    ) {
        super(
            itemService,
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
        this.activeView = 'list';
        this.selectionMode = 'single';
        this.enableAdd = true;
    }

    confirmSelect() {
        if (this.activeView === 'new-data') {
            this.itemService.create(this.item).subscribe((res: HttpResponse<T>) => {
                this.selectedItems = [];
                this.selectedItems.push(res.body);
            });
        }
        if (this.selectedItems && this.selectedItems.length > 0) {
            this.itemService.pushItems(this.selectedItems);
        }
        this.activeModal.dismiss('cancel');
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }
}

export class AbstractEntityLovPopupComponent<T> implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(
        public component: Component,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        protected modalService: NgbModal
    ) {}

    protected setComponent() {
        this.ngbModalRef = this.modalService.open(this.component, {
            size: 'lg',
            backdrop: 'static'
        });
    }

    ngOnInit() {
        setTimeout(() => {
            this.setComponent();
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
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
