import { Component, OnChanges, SimpleChanges, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IPartyCategoryType, PartyCategoryType } from 'app/shared/model/party-category-type.model';
import { PartyCategoryTypeService } from './party-category-type.service';
import { AbstractEntityBaseViewComponent } from 'app/shared/base/abstract-entity-view.component';
import { ICategoryScheme, CategoryScheme } from 'app/shared/model/category-scheme.model';
import { CategorySchemeService } from 'app/entities/category-scheme';
import { MessageService } from 'primeng/components/common/messageservice';
import { AccountService } from 'app/core';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';

@Component({
    selector: 'jhi-party-category-type-view',
    templateUrl: './party-category-type-view.component.html'
})
export class PartyCategoryTypeViewComponent extends AbstractEntityBaseViewComponent<IPartyCategoryType> implements OnChanges {
    @Input() idCategoryType: number;

    categoryschemes: ICategoryScheme[];
    schemeId: number;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected partyCategoryTypeService: PartyCategoryTypeService,
        protected categorySchemeService: CategorySchemeService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected messageService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(partyCategoryTypeService, messageService, elementRef, dataUtils, accountService);
        this.item = new PartyCategoryType();
    }

    onInit() {
        this.categorySchemeService.query().subscribe(
            (res: HttpResponse<ICategoryScheme[]>) => {
                this.categoryschemes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    onPrepareView() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idCategoryType']) {
            this.item = new PartyCategoryType();
            this.partyCategoryTypeService.find(this.idCategoryType).subscribe(result => {
                this.item = result.body;
                this.onPrepareView();
            });
        } else if (changes['item']) {
            this.onPrepareView();
        } else if (changes['isSaving'] && this.idCategoryType) {
            if (this.isSaving) {
                this.save();
            }
        }
    }

    get partyCategoryType() {
        return this.item;
    }

    set partyCategoryType(partyCategoryType: IPartyCategoryType) {
        this.item = partyCategoryType;
    }

    trackCategorySchemeById(index: number, item: ICategoryScheme) {
        return item.idScheme;
    }

    itemKey() {
        return this.item.idCategoryType;
    }
}
