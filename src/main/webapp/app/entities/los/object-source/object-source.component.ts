import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { IObjectSource, ObjectSource } from 'app/shared/model/los/object-source.model';
import { ObjectSourceService } from './object-source.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityComponent } from 'app/shared/base/abstract-entity.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService } from 'primeng/api';
import { saveAs } from 'file-saver/FileSaver';

@Component({
    selector: 'jhi-object-source',
    templateUrl: './object-source.component.html'
})
export class ObjectSourceComponent extends AbstractEntityComponent<IObjectSource> {
    @ViewChild('inputFile') inputFile: ElementRef;

    constructor(
        protected objectSourceService: ObjectSourceService,
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
            objectSourceService,
            parseLinks,
            accountService,
            activatedRoute,
            dataUtils,
            router,
            eventManager,
            messageService,
            confirmationService
        );

        this.parentRoute = '/object-source';
        this.listChangeEventName = 'objectSourceListModification';
        this.entityKeyName = 'idObjectSource';

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

    trackId(index: number, item: IObjectSource) {
        return item.idObjectSource;
    }

    get objectSources() {
        return this.items;
    }

    set objectSources(objectSource: IObjectSource[]) {
        this.items = objectSource;
    }

    downloadFile(name: string) {
        this.itemService
            .process(
                {
                    fileName: name,
                    header: 'idObjectSource',
                    fields: 'idObjectSource'
                },
                { processName: 'buildDownloadFile' }
            )
            .subscribe(() => {
                this.itemService.downloadFile(name).subscribe(res => {
                    const blobFileName = name;
                    const blob = new Blob([res.body], { type: 'application/octet-stream' });
                    saveAs(blob, blobFileName);
                });
            });
    }

    onUploadFile(event) {
        const files: FileList = event.target.files;

        if (files.length > 0) {
            const formData: FormData = new FormData();
            formData.append('file', files[0], files[0].name);
            this.itemService.uploadFile(formData).subscribe(res => {
                this.inputFile.nativeElement.value = null;
                this.itemService.process({ fileName: res.body.fileName }, { processName: 'processUploadFile' }).subscribe(() => {
                    this.eventManager.broadcast({ name: this.listChangeEventName, content: 'Completed upload data' });
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Upload Done',
                        detail: 'Upload ' + res.body.fileName + ' done process'
                    });
                });
            });
        }
    }
}
