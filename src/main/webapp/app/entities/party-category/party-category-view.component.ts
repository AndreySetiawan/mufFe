import { Component, OnChanges, SimpleChanges, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IPartyCategory, PartyCategory } from 'app/shared/model/party-category.model';
import { PartyCategoryService } from './party-category.service';
import { AbstractEntityBaseViewComponent } from 'app/shared/base/abstract-entity-view.component';
import { IPartyCategoryType, PartyCategoryType } from 'app/shared/model/party-category-type.model';
import { PartyCategoryTypeService } from 'app/entities/party-category-type';
import { MessageService } from 'primeng/components/common/messageservice';
import { AccountService } from 'app/core';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';

@Component({
    selector: 'jhi-party-category-view',
    templateUrl: './party-category-view.component.html'
})
export class PartyCategoryViewComponent extends AbstractEntityBaseViewComponent<IPartyCategory> implements OnChanges {
    @Input() idCategory: number;

    partycategorytypes: IPartyCategoryType[];
    categoryTypeId: number;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected partyCategoryService: PartyCategoryService,
        protected partyCategoryTypeService: PartyCategoryTypeService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected messageService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(partyCategoryService, messageService, elementRef, dataUtils, accountService);
        this.item = new PartyCategory();
    }

    onInit() {
        this.partyCategoryTypeService.query().subscribe(
            (res: HttpResponse<IPartyCategoryType[]>) => {
                this.partycategorytypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    onPrepareView() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idCategory']) {
            this.item = new PartyCategory();
            this.partyCategoryService.find(this.idCategory).subscribe(result => {
                this.item = result.body;
                this.onPrepareView();
            });
        } else if (changes['item']) {
            this.onPrepareView();
        } else if (changes['isSaving'] && this.idCategory) {
            if (this.isSaving) {
                this.save();
            }
        }
    }

    get partyCategory() {
        return this.item;
    }

    set partyCategory(partyCategory: IPartyCategory) {
        this.item = partyCategory;
    }

    trackPartyCategoryTypeById(index: number, item: IPartyCategoryType) {
        return item.idCategoryType;
    }

    itemKey() {
        return this.item.idCategory;
    }
}
