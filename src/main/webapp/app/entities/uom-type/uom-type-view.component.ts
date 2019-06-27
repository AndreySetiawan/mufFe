import { Component, OnChanges, SimpleChanges, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IUomType, UomType } from 'app/shared/model/uom-type.model';
import { UomTypeService } from './uom-type.service';
import { AbstractEntityBaseViewComponent } from 'app/shared/base/abstract-entity-view.component';
import { MessageService } from 'primeng/components/common/messageservice';
import { AccountService } from 'app/core';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';

@Component({
    selector: 'jhi-uom-type-view',
    templateUrl: './uom-type-view.component.html'
})
export class UomTypeViewComponent extends AbstractEntityBaseViewComponent<IUomType> implements OnChanges {
    @Input() idUomType: number;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected uomTypeService: UomTypeService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected messageService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(uomTypeService, messageService, elementRef, dataUtils, accountService);
        this.item = new UomType();
    }

    onInit() {}

    onPrepareView() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idUomType']) {
            this.item = new UomType();
            this.uomTypeService.find(this.idUomType).subscribe(result => {
                this.item = result.body;
                this.onPrepareView();
            });
        } else if (changes['item']) {
            this.onPrepareView();
        } else if (changes['isSaving'] && this.idUomType) {
            if (this.isSaving) {
                this.save();
            }
        }
    }

    get uomType() {
        return this.item;
    }

    set uomType(uomType: IUomType) {
        this.item = uomType;
    }

    itemKey() {
        return this.item.idUomType;
    }
}
