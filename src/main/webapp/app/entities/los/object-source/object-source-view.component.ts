import { Component, OnChanges, SimpleChanges, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IObjectSource, ObjectSource } from 'app/shared/model/los/object-source.model';
import { ObjectSourceService } from './object-source.service';
import { AbstractEntityBaseViewComponent } from 'app/shared/base/abstract-entity-view.component';
import { MessageService } from 'primeng/components/common/messageservice';
import { AccountService } from 'app/core';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';

@Component({
    selector: 'jhi-object-source-view',
    templateUrl: './object-source-view.component.html'
})
export class ObjectSourceViewComponent extends AbstractEntityBaseViewComponent<IObjectSource> implements OnChanges {
    @Input() idObjectSource: number;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected objectSourceService: ObjectSourceService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected messageService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(objectSourceService, messageService, elementRef, dataUtils, accountService);
        this.item = new ObjectSource();
    }

    onInit() {}

    onPrepareView() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idObjectSource']) {
            this.item = new ObjectSource();
            this.objectSourceService.find(this.idObjectSource).subscribe(result => {
                this.item = result.body;
                this.onPrepareView();
            });
        } else if (changes['item']) {
            this.onPrepareView();
        } else if (changes['isSaving'] && this.idObjectSource) {
            if (this.isSaving) {
                this.save();
            }
        }
    }

    get objectSource() {
        return this.item;
    }

    set objectSource(objectSource: IObjectSource) {
        this.item = objectSource;
    }

    itemKey() {
        return this.item.idObjectSource;
    }
}
