import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiAlertService, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { IWorkType, WorkType } from 'app/shared/model/work-type.model';
import { WorkTypeService } from './work-type.service';
import { map } from 'rxjs/operators';
import { AccountService } from 'app/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityUpdateComponent } from 'app/shared/base/abstract-entity-update.component';

@Component({
    selector: 'jhi-work-type-update',
    templateUrl: './work-type-update.component.html'
})
export class WorkTypeUpdateComponent extends AbstractEntityUpdateComponent<IWorkType> {
    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected workTypeService: WorkTypeService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected confirmationService: ConfirmationService,
        protected eventManager: JhiEventManager,
        protected toastService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(dataUtils, workTypeService, elementRef, confirmationService, eventManager, toastService, accountService);
        this.listChangeEventName = 'workTypeListModification';
        this.item = new WorkType();
    }

    onInit() {
        this.activatedRoute.params.subscribe(params => {});
        this.activatedRoute.data.subscribe(({ workType }) => {
            this.workType = workType;
        });
    }

    itemKey() {
        return this.item.idWorkType;
    }

    get workType() {
        return this.item;
    }

    set workType(workType: IWorkType) {
        this.item = workType;
    }
}
