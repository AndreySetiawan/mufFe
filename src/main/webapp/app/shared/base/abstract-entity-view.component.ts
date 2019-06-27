import { OnInit, OnDestroy, Input, ContentChild, TemplateRef, ElementRef } from '@angular/core';
import { AbstractEntityService } from 'app/shared/base/abstract-entity.service';
import { AccountService, Account } from 'app/core';
import {
    CardViewDirective,
    EditViewDirective,
    ItemViewDirective,
    SimpleViewDirective,
    HeaderViewDirective,
    FooterViewDirective
} from 'app/shared/base/abstract-entity-view.directive';
import { MessageService } from 'primeng/components/common/messageservice';
import { JhiDataUtils } from 'ng-jhipster';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { saveAs } from 'file-saver/FileSaver';

export class AbstractEntityBaseViewComponent<T> implements OnInit, OnDestroy {
    @Input() mode: 'card' | 'item' | 'edit' | 'simple' = 'edit';
    @Input() isSaving: boolean;
    @Input() viewLabel: string;

    @Input() hiddenDefaultEdit = false;
    @Input() hiddenDefaultCard = false;
    @Input() hiddenDefaultItem = false;
    @Input() hiddenDefaultSimple = false;
    @Input() hiddenFooter = true;
    @Input() hiddenHeader = true;

    @ContentChild(CardViewDirective, { read: TemplateRef })
    cardViewTemplate;
    @ContentChild(EditViewDirective, { read: TemplateRef })
    editViewTemplate;
    @ContentChild(ItemViewDirective, { read: TemplateRef })
    itemViewTemplate;
    @ContentChild(SimpleViewDirective, { read: TemplateRef })
    simpleViewTemplate;
    @ContentChild(HeaderViewDirective, { read: TemplateRef })
    headerViewTemplate;
    @ContentChild(FooterViewDirective, { read: TemplateRef })
    footerViewTemplate;

    protected stompClient = null;

    protected currentAccount: Account;
    protected _item: T;

    constructor(
        protected entityService: AbstractEntityService<T>,
        protected messageService: MessageService,
        protected elementRef: ElementRef,
        protected dataUtils: JhiDataUtils,
        protected accountService: AccountService
    ) {}

    protected onInit() {}

    protected onDestroy() {}

    protected registerSubscriber() {}

    protected unRegisterSubscriber() {}

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
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
            this.stompClient = null;
        }
    }

    @Input()
    get item() {
        return this._item;
    }

    set item(item: T) {
        this._item = item;
    }

    protected onError(errorMessage: string) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
    }

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

    itemKey(): any {}

    protected preSave() {}

    protected buildDependencies(): Observable<T> {
        return of(this.item);
    }

    itemToSave() {
        if (this.itemKey() !== undefined) {
            return this.buildDependencies().pipe(mergeMap(() => this.entityService.update(this.item)));
        } else {
            return this.buildDependencies().pipe(mergeMap(() => this.entityService.create(this.item)));
        }
    }

    save() {
        this.preSave();
        this.itemToSave().subscribe(() => {});
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
