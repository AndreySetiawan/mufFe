import { Component, OnChanges, SimpleChanges, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IPartyParameters, PartyParameters } from 'app/shared/model/los/party-parameters.model';
import { PartyParametersService } from './party-parameters.service';
import { AbstractEntityBaseViewComponent } from 'app/shared/base/abstract-entity-view.component';
import { ICategoryScheme, CategoryScheme } from 'app/shared/model/category-scheme.model';
import { CategorySchemeService } from 'app/entities/category-scheme';
import { IRoleType, RoleType } from 'app/shared/model/role-type.model';
import { RoleTypeService } from 'app/entities/role-type';
import { MessageService } from 'primeng/components/common/messageservice';
import { AccountService } from 'app/core';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';
import { ObjectSourceService } from '../object-source';
import { IObjectSource } from 'app/shared/model/los/object-source.model';

@Component({
    selector: 'jhi-party-parameters-view',
    templateUrl: './party-parameters-view.component.html'
})
export class PartyParametersViewComponent extends AbstractEntityBaseViewComponent<IPartyParameters> implements OnChanges {
    @Input() idParameter: number;

    categoryschemes: ICategoryScheme[];
    objectSources: IObjectSource[];

    roletypes: IRoleType[];
    schemeId: number;
    roleId: number;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected partyParametersService: PartyParametersService,
        protected categorySchemeService: CategorySchemeService,
        protected roleTypeService: RoleTypeService,
        protected objectSourceService: ObjectSourceService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected messageService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(partyParametersService, messageService, elementRef, dataUtils, accountService);
        this.item = new PartyParameters();
    }

    onInit() {
        this.categorySchemeService.query({size: 9999}).subscribe(
            (res: HttpResponse<ICategoryScheme[]>) => {
                this.categoryschemes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.objectSourceService.query({size: 9999}).subscribe(
            (res: HttpResponse<IObjectSource[]>) => {
                this.objectSources = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.roleTypeService.query({size: 9999}).subscribe(
            (res: HttpResponse<IRoleType[]>) => {
                this.roletypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    onPrepareView() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idParameter']) {
            this.item = new PartyParameters();
            this.partyParametersService.find(this.idParameter).subscribe(result => {
                this.item = result.body;
                this.onPrepareView();
            });
        } else if (changes['item']) {
            this.onPrepareView();
        } else if (changes['isSaving'] && this.idParameter) {
            if (this.isSaving) {
                this.save();
            }
        }
    }

    get partyParameters() {
        return this.item;
    }

    set partyParameters(partyParameters: IPartyParameters) {
        this.item = partyParameters;
    }

    trackCategorySchemeById(index: number, item: ICategoryScheme) {
        return item.idScheme;
    }

    trackObjectSourceById(index: number, item: IObjectSource) {
        return item.idObjectSource;
    }

    trackRoleTypeById(index: number, item: IRoleType) {
        return item.idRoleType;
    }

    itemKey() {
        return this.item.idParameter;
    }
}
