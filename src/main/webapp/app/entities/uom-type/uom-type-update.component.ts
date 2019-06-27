import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiAlertService, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { IUomType, UomType } from 'app/shared/model/uom-type.model';
import { UomTypeService } from './uom-type.service';
import { map } from 'rxjs/operators';
import { AccountService } from 'app/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityUpdateComponent } from 'app/shared/base/abstract-entity-update.component';

@Component({
    selector: 'jhi-uom-type-update',
    templateUrl: './uom-type-update.component.html'
})
export class UomTypeUpdateComponent extends AbstractEntityUpdateComponent<IUomType> {
    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected uomTypeService: UomTypeService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected confirmationService: ConfirmationService,
        protected eventManager: JhiEventManager,
        protected toastService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(dataUtils, uomTypeService, elementRef, confirmationService, eventManager, toastService, accountService);
        this.listChangeEventName = 'uomTypeListModification';
        this.item = new UomType();
    }

    onInit() {
        this.activatedRoute.params.subscribe(params => {});
        this.activatedRoute.data.subscribe(({ uomType }) => {
            this.uomType = uomType;
        });
    }

    itemKey() {
        return this.item.idUomType;
    }

    get uomType() {
        return this.item;
    }

    set uomType(uomType: IUomType) {
        this.item = uomType;
    }
}
