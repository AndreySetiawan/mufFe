import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { IFeature, Feature } from 'app/shared/model/feature.model';
import { FeatureService } from './feature.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityComponent } from 'app/shared/base/abstract-entity.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService } from 'primeng/api';
import { saveAs } from 'file-saver/FileSaver';
import { ReportUtilService } from 'app/shared/base/report-util.service';

@Component({
    selector: 'jhi-feature',
    templateUrl: './feature.component.html'
})
export class FeatureComponent extends AbstractEntityComponent<IFeature> {
    @ViewChild('inputFile') inputFile: ElementRef;

    constructor(
        protected featureService: FeatureService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected dataUtils: JhiDataUtils,
        protected router: Router,
        protected eventManager: JhiEventManager,
        protected messageService: MessageService,
        protected modalService: NgbModal,
        protected confirmationService: ConfirmationService,
        protected reportUtils: ReportUtilService
    ) {
        super(
            featureService,
            parseLinks,
            accountService,
            activatedRoute,
            dataUtils,
            router,
            eventManager,
            messageService,
            confirmationService
        );

        this.parentRoute = '/feature';
        this.listChangeEventName = 'featureListModification';
        this.entityKeyName = 'idFeature';

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

    trackId(index: number, item: IFeature) {
        return item.idFeature;
    }

    get features() {
        return this.items;
    }

    set features(feature: IFeature[]) {
        this.items = feature;
    }

    downloadFile(name: string) {
        this.itemService
            .process(
                {
                    fileName: name,
                    header: 'idFeature',
                    fields: 'idFeature'
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

    print() {
        this.reportUtils.viewFile('/los/api/report/Feature/pdf');
    }
}
