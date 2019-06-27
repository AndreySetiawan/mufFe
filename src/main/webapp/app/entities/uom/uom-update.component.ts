import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiAlertService, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { IUom, Uom } from 'app/shared/model/uom.model';
import { UomService } from './uom.service';
import { IUomType, UomType } from 'app/shared/model/uom-type.model';
import { UomTypeService } from 'app/entities/uom-type';
import { map } from 'rxjs/operators';
import { AccountService } from 'app/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityUpdateComponent } from 'app/shared/base/abstract-entity-update.component';
import { ReportUtilService } from 'app/shared/base/report-util.service';

@Component({
    selector: 'jhi-uom-update',
    templateUrl: './uom-update.component.html'
})
export class UomUpdateComponent extends AbstractEntityUpdateComponent<IUom> {
    uomtypes: IUomType[];
    uomTypeId: number;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected uomService: UomService,
        protected uomTypeService: UomTypeService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected confirmationService: ConfirmationService,
        protected eventManager: JhiEventManager,
        protected toastService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService,
        protected reportUtils: ReportUtilService
    ) {
        super(dataUtils, uomService, elementRef, confirmationService, eventManager, toastService, accountService);
        this.listChangeEventName = 'uomListModification';
        this.item = new Uom();
    }

    onInit() {
        this.activatedRoute.params.subscribe(params => {
            if (params['uomTypeId']) {
                this.uomTypeId = params['uomTypeId'];
            }
        });
        this.activatedRoute.data.subscribe(({ uom }) => {
            this.uom = uom;
        });
        this.uomTypeService.query().subscribe(
            (res: HttpResponse<IUomType[]>) => {
                this.uomtypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    trackUomTypeById(index: number, item: IUomType) {
        return item.idUomType;
    }

    itemKey() {
        return this.item.idUom;
    }

    get uom() {
        return this.item;
    }

    set uom(uom: IUom) {
        this.item = uom;
    }

    print() {
        this.reportUtils.viewFile('/api/report/Uom/pdf');
        return false;
    }
}
