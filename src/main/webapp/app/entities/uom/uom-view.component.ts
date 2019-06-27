import { Component, OnChanges, SimpleChanges, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IUom, Uom } from 'app/shared/model/uom.model';
import { UomService } from './uom.service';
import { AbstractEntityBaseViewComponent } from 'app/shared/base/abstract-entity-view.component';
import { IUomType, UomType } from 'app/shared/model/uom-type.model';
import { UomTypeService } from 'app/entities/uom-type';
import { MessageService } from 'primeng/components/common/messageservice';
import { AccountService } from 'app/core';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';

@Component({
    selector: 'jhi-uom-view',
    templateUrl: './uom-view.component.html'
})
export class UomViewComponent extends AbstractEntityBaseViewComponent<IUom> implements OnChanges {
    @Input() idUom: string;

    uomtypes: IUomType[];
    uomTypeId: number;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected uomService: UomService,
        protected uomTypeService: UomTypeService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected messageService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(uomService, messageService, elementRef, dataUtils, accountService);
        this.item = new Uom();
    }

    onInit() {
        this.uomTypeService.query().subscribe(
            (res: HttpResponse<IUomType[]>) => {
                this.uomtypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    onPrepareView() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idUom']) {
            this.item = new Uom();
            this.uomService.find(this.idUom).subscribe(result => {
                this.item = result.body;
                this.onPrepareView();
            });
        } else if (changes['item']) {
            this.onPrepareView();
        } else if (changes['isSaving'] && this.idUom) {
            if (this.isSaving) {
                this.save();
            }
        }
    }

    get uom() {
        return this.item;
    }

    set uom(uom: IUom) {
        this.item = uom;
    }

    trackUomTypeById(index: number, item: IUomType) {
        return item.idUomType;
    }

    itemKey() {
        return this.item.idUom;
    }
}
