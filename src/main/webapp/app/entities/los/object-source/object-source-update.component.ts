import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiAlertService, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { IObjectSource, ObjectSource } from 'app/shared/model/los/object-source.model';
import { ObjectSourceService } from './object-source.service';
import { map } from 'rxjs/operators';
import { AccountService } from 'app/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityUpdateComponent } from 'app/shared/base/abstract-entity-update.component';

@Component({
    selector: 'jhi-object-source-update',
    templateUrl: './object-source-update.component.html'
})
export class ObjectSourceUpdateComponent extends AbstractEntityUpdateComponent<IObjectSource> {
    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected objectSourceService: ObjectSourceService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected confirmationService: ConfirmationService,
        protected eventManager: JhiEventManager,
        protected toastService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(dataUtils, objectSourceService, elementRef, confirmationService, eventManager, toastService, accountService);
        this.listChangeEventName = 'objectSourceListModification';
        this.item = new ObjectSource();
    }

    onInit() {
        this.activatedRoute.params.subscribe(params => {});
        this.activatedRoute.data.subscribe(({ objectSource }) => {
            this.objectSource = objectSource;
        });
    }

    itemKey() {
        return this.item.idObjectSource;
    }

    get objectSource() {
        return this.item;
    }

    set objectSource(objectSource: IObjectSource) {
        this.item = objectSource;
    }
}
