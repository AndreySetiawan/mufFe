import { Component, OnChanges, SimpleChanges, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IPartyClassification, PartyClassification } from 'app/shared/model/party-classification.model';
import { PartyClassificationService } from './party-classification.service';
import { AbstractEntityBaseViewComponent } from 'app/shared/base/abstract-entity-view.component';
import { IPartyCategoryType, PartyCategoryType } from 'app/shared/model/party-category-type.model';
import { PartyCategoryTypeService } from 'app/entities/party-category-type';
import { IPartyCategory, PartyCategory } from 'app/shared/model/party-category.model';
import { PartyCategoryService } from 'app/entities/party-category';
import { IParty, Party } from 'app/shared/model/party.model';
import { PartyService } from 'app/entities/party';
import { MessageService } from 'primeng/components/common/messageservice';
import { AccountService } from 'app/core';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';

@Component({
    selector: 'jhi-party-classification-view',
    templateUrl: './party-classification-view.component.html'
})
export class PartyClassificationViewComponent extends AbstractEntityBaseViewComponent<IPartyClassification> implements OnChanges {
    @Input() idClassification: number;

    partycategorytypes: IPartyCategoryType[];

    partycategories: IPartyCategory[];

    parties: IParty[];
    categoryTypeId: number;
    categoryId: number;
    partyId: string;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected partyClassificationService: PartyClassificationService,
        protected partyCategoryTypeService: PartyCategoryTypeService,
        protected partyCategoryService: PartyCategoryService,
        protected partyService: PartyService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected messageService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(partyClassificationService, messageService, elementRef, dataUtils, accountService);
        this.item = new PartyClassification();
    }

    onInit() {
        this.partyCategoryTypeService.query().subscribe(
            (res: HttpResponse<IPartyCategoryType[]>) => {
                this.partycategorytypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.partyCategoryService.query().subscribe(
            (res: HttpResponse<IPartyCategory[]>) => {
                this.partycategories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.partyService.query().subscribe(
            (res: HttpResponse<IParty[]>) => {
                this.parties = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    onPrepareView() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idClassification']) {
            this.item = new PartyClassification();
            this.partyClassificationService.find(this.idClassification).subscribe(result => {
                this.item = result.body;
                this.onPrepareView();
            });
        } else if (changes['item']) {
            this.onPrepareView();
        } else if (changes['isSaving'] && this.idClassification) {
            if (this.isSaving) {
                this.save();
            }
        }
    }

    get partyClassification() {
        return this.item;
    }

    set partyClassification(partyClassification: IPartyClassification) {
        this.item = partyClassification;
    }

    trackPartyCategoryTypeById(index: number, item: IPartyCategoryType) {
        return item.idCategoryType;
    }

    trackPartyCategoryById(index: number, item: IPartyCategory) {
        return item.idCategory;
    }

    trackPartyById(index: number, item: IParty) {
        return item.idParty;
    }

    itemKey() {
        return this.item.idClassification;
    }
}
