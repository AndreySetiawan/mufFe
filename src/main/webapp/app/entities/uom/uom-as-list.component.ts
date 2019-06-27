import { Component, ViewChild, ElementRef, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { AccountService } from 'app/core';
import { ITEMS_PER_PAGE } from 'app/shared';
import { IUom } from 'app/shared/model/uom.model';
import { UomService } from './uom.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';
import { AbstractEntityAsListComponent } from 'app/shared/base/abstract-entity-as-list.component';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'jhi-uom-as-list',
    templateUrl: './uom-as-list.component.html'
})
export class UomAsListComponent extends AbstractEntityAsListComponent<IUom> implements OnChanges {
    @Input() filterName: string;
    @Input() idUomType: any;
    @ViewChild('inputFile') inputFile: ElementRef;

    constructor(
        protected uomService: UomService,
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
            uomService,
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

        this.listChangeEventName = 'uomListModification';
        this.entityKeyName = 'idUom';
        this.predicate = 'idUom';
    }

    protected loadAllFilterBy() {
        const queryParams: any = { page: this.page - 1, size: this.itemsPerPage, sort: this.sort() };
        if (this.filterName) {
            queryParams.filterName = this.filterName;
        }
        if (this.idUomType) {
            queryParams.idUomType = this.idUomType;
        }
        this.uomService
            .queryFilterBy(queryParams)
            .subscribe(
                (res: HttpResponse<IUom[]>) => this.paginateItems(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idUomType']) {
            this.loadAll();
        }
    }

    trackId(index: number, item: IUom) {
        return item.idUom;
    }

    get uoms() {
        return this.items;
    }

    set uoms(uom: IUom[]) {
        this.items = uom;
    }

    addNewData() {
        const queryParams: any = {};
        if (this.filterName) {
            queryParams.filterName = this.filterName;
        }
        if (this.idUomType) {
            queryParams.uomTypeId = this.idUomType;
        }
        this.router.navigate(['uom/new', queryParams]);
    }

    onEditComplete(event) {
        this.uomService.update(event.data).subscribe(() => {
            this.messageService.add({ severity: 'info', summary: 'Data Updated', detail: 'Data updated...' });
            this.eventManager.broadcast({
                name: this.listChangeEventName,
                content: 'Completed an item'
            });
        });
    }

    onUploadFile(event) {
        const files: FileList = event.target.files;

        if (files.length > 0) {
            const formData: FormData = new FormData();
            formData.append('file', files[0], files[0].name);
            this.itemService.uploadFile(formData, null).subscribe(res => {
                this.inputFile.nativeElement.value = null;
                this.itemService.process({ fileName: res.body.fileName }, { processName: 'processUploadFile' }).subscribe(() => {
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
