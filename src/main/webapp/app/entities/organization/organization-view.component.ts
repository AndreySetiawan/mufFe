import { Component, OnChanges, SimpleChanges, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IOrganization, Organization } from 'app/shared/model/organization.model';
import { OrganizationService } from './organization.service';
import { AbstractEntityBaseViewComponent } from 'app/shared/base/abstract-entity-view.component';
import { MessageService } from 'primeng/components/common/messageservice';
import { AccountService } from 'app/core';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';

@Component({
    selector: 'jhi-organization-view',
    templateUrl: './organization-view.component.html'
})
export class OrganizationViewComponent extends AbstractEntityBaseViewComponent<IOrganization> implements OnChanges {
    @Input() idParty: string;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected organizationService: OrganizationService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected messageService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(organizationService, messageService, elementRef, dataUtils, accountService);
        this.item = new Organization();
    }

    onInit() {}

    onPrepareView() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idParty']) {
            this.item = new Organization();
            this.organizationService.find(this.idParty).subscribe(result => {
                this.item = result.body;
                this.onPrepareView();
            });
        } else if (changes['item']) {
            this.onPrepareView();
        } else if (changes['isSaving'] && this.idParty) {
            if (this.isSaving) {
                this.save();
            }
        }
    }

    get organization() {
        return this.item;
    }

    set organization(organization: IOrganization) {
        this.item = organization;
    }

    itemKey() {
        return this.item.idParty;
    }
}
