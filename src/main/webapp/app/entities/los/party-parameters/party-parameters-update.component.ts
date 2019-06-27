import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiAlertService, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { IPartyParameters, PartyParameters } from 'app/shared/model/los/party-parameters.model';
import { PartyParametersService } from './party-parameters.service';
import { ICategoryScheme, CategoryScheme } from 'app/shared/model/category-scheme.model';
import { CategorySchemeService } from 'app/entities/category-scheme';
import { IRoleType, RoleType } from 'app/shared/model/role-type.model';
import { RoleTypeService } from 'app/entities/role-type';
import { map } from 'rxjs/operators';
import { AccountService } from 'app/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityUpdateComponent } from 'app/shared/base/abstract-entity-update.component';

@Component({
    selector: 'jhi-party-parameters-update',
    templateUrl: './party-parameters-update.component.html'
})
export class PartyParametersUpdateComponent extends AbstractEntityUpdateComponent<IPartyParameters> {
    categoryschemes: ICategoryScheme[];

    roletypes: IRoleType[];
    schemeId: number;
    roleId: number;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected partyParametersService: PartyParametersService,
        protected categorySchemeService: CategorySchemeService,
        protected roleTypeService: RoleTypeService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected confirmationService: ConfirmationService,
        protected eventManager: JhiEventManager,
        protected toastService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(dataUtils, partyParametersService, elementRef, confirmationService, eventManager, toastService, accountService);
        this.listChangeEventName = 'partyParametersListModification';
        this.item = new PartyParameters();
    }

    onInit() {
        this.activatedRoute.params.subscribe(params => {
            if (params['schemeId']) {
                this.schemeId = params['schemeId'];
            }
            if (params['roleId']) {
                this.roleId = params['roleId'];
            }
        });
        this.activatedRoute.data.subscribe(({ partyParameters }) => {
            this.partyParameters = partyParameters;
        });
        this.categorySchemeService.query().subscribe(
            (res: HttpResponse<ICategoryScheme[]>) => {
                this.categoryschemes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.roleTypeService.query().subscribe(
            (res: HttpResponse<IRoleType[]>) => {
                this.roletypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    trackCategorySchemeById(index: number, item: ICategoryScheme) {
        return item.idScheme;
    }

    trackRoleTypeById(index: number, item: IRoleType) {
        return item.idRoleType;
    }

    itemKey() {
        return this.item.idParameter;
    }

    get partyParameters() {
        return this.item;
    }

    set partyParameters(partyParameters: IPartyParameters) {
        this.item = partyParameters;
        // this.dateFrom = moment(partyParameters.dateFrom).format(DATE_TIME_FORMAT);
        // this.dateThru = moment(partyParameters.dateThru).format(DATE_TIME_FORMAT);
    }
}
