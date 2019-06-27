import { Component, OnChanges, SimpleChanges, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IWorkType, WorkType } from 'app/shared/model/work-type.model';
import { WorkTypeService } from './work-type.service';
import { AbstractEntityBaseViewComponent } from 'app/shared/base/abstract-entity-view.component';
import { MessageService } from 'primeng/components/common/messageservice';
import { AccountService } from 'app/core';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';

@Component({
    selector: 'jhi-work-type-view',
    templateUrl: './work-type-view.component.html'
})
export class WorkTypeViewComponent extends AbstractEntityBaseViewComponent<IWorkType> implements OnChanges {
    @Input() idWorkType: number;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected workTypeService: WorkTypeService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected messageService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(workTypeService, messageService, elementRef, dataUtils, accountService);
        this.item = new WorkType();
    }

    onInit() {}

    onPrepareView() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idWorkType']) {
            this.item = new WorkType();
            this.workTypeService.find(this.idWorkType).subscribe(result => {
                this.item = result.body;
                this.onPrepareView();
            });
        } else if (changes['item']) {
            this.onPrepareView();
        } else if (changes['isSaving'] && this.idWorkType) {
            if (this.isSaving) {
                this.save();
            }
        }
    }

    get workType() {
        return this.item;
    }

    set workType(workType: IWorkType) {
        this.item = workType;
    }

    itemKey() {
        return this.item.idWorkType;
    }
}
