import { OnInit, OnDestroy, ElementRef } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';
import { AccountService, Account } from 'app/core';
import { mergeMap } from 'rxjs/operators';

import { STATUS } from 'app/shared';
import { map, delay } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityService } from 'app/shared/base/abstract-entity.service';
import { saveAs } from 'file-saver/FileSaver';

export class AbstractEntityUpdateComponent<T> implements OnInit, OnDestroy {
    protected stompClient = null;

    protected _item: T;
    protected currentAccount: Account;
    readonly STATUS: typeof STATUS = STATUS;
    public isSaving: boolean;
    protected listChangeEventName: string;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected entityService: AbstractEntityService<T>,
        protected elementRef: ElementRef,
        protected confirmationService: ConfirmationService,
        protected eventManager: JhiEventManager,
        protected messageService: MessageService,
        protected accountService: AccountService
    ) {}

    protected onInit() {}

    protected onDestroy() {}

    protected onAccountAssigned() {}

    ngOnInit() {
        this.onInit();
        this.accountService.identity(true).then(account => {
            this.currentAccount = account;
            this.onAccountAssigned();
        });
        this.isSaving = false;
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

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.item, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    itemKey(): any {}

    protected buildDependency() {}

    protected preSave() {}

    protected buildDependencies(): Observable<T> {
        return of(this.item);
    }

    protected postProcess(res: T): Observable<T> {
        return of(res);
    }

    itemToSave() {
        if (this.itemKey() !== undefined) {
            return this.buildDependencies().pipe(mergeMap(() => this.entityService.update(this.item)));
        } else {
            return this.buildDependencies().pipe(mergeMap(() => this.entityService.create(this.item)));
        }
    }

    save() {
        this.isSaving = true;
        this.preSave();
        this.itemToSave()
            .pipe(map((value: HttpResponse<T>) => (this.item = value.body)))
            .pipe(mergeMap(res => this.postProcess(res)))
            .subscribe((res: T) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onSaveError(res));
    }

    protected onSaveSuccess(res: T) {
        this.messageService.add({ severity: 'info', summary: 'Data Saved', detail: 'Data saved ...' });
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError(res: HttpErrorResponse) {
        this.messageService.add({ severity: 'warning', summary: 'Data Error', detail: res.message });
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
    }

    get item() {
        return this._item;
    }

    set item(item: T) {
        this._item = item;
    }

    print() {}

    changeStatus() {
        try {
            this.isSaving = true;
            this.entityService
                .update(this.item)
                .pipe(mergeMap(() => this.entityService.changeStatus(this.item)))
                .pipe(mergeMap(() => this.entityService.find(this.itemKey())))
                .pipe(map(res => res.body))
                .subscribe(result => {
                    this.messageService.add({ severity: 'info', summary: 'Changed Status', detail: 'Changed Status done .......' });
                    this.item = result;
                });
        } finally {
            this.isSaving = false;
        }
    }

    canceled() {
        this.isSaving = true;
        try {
            this.confirmationService.confirm({
                message: 'Are you sure that you want to cancel?',
                header: 'Confirmation',
                icon: 'fa fa-question-circle',
                accept: () => {
                    const id = this.itemKey();
                    this.entityService
                        .cancelEntity(this.item)
                        .pipe(delay(1000))
                        .subscribe(r => {
                            this.eventManager.broadcast({
                                name: this.listChangeEventName,
                                content: 'Cancel an item'
                            });
                            this.messageService.add({ severity: 'warning', summary: 'Canceled', detail: `Data ${id} canceled .......` });
                            this.previousState();
                        });
                }
            });
        } finally {
            this.isSaving = false;
        }
    }

    onUploadFile(event) {
        const files: FileList = event.target.files;

        if (files.length > 0) {
            const formData: FormData = new FormData();
            formData.append('file', files[0], files[0].name);
            this.entityService.uploadFile(formData, null).subscribe(res => {
                console.log('xxxx', res);
            });
        }
    }

    downloadFile(fileName: string) {
        this.entityService.downloadFile(fileName).subscribe(res => {
            const contentDisposition = res.headers.get('content-disposition') || '';
            const matches = /filename=([^;]+)/gi.exec(contentDisposition);
            const blobFileName = (matches[1] || 'untitled').trim();

            const blob = new Blob([res.body], { type: 'application/octet-stream' });
            saveAs(blob, blobFileName);
        });
    }
}
