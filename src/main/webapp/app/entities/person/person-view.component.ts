import { Component, OnChanges, SimpleChanges, ElementRef, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IPerson, Person } from 'app/shared/model/person.model';
import { PersonService } from './person.service';
import { AbstractEntityBaseViewComponent } from 'app/shared/base/abstract-entity-view.component';
import { MessageService } from 'primeng/components/common/messageservice';
import { AccountService } from 'app/core';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';

@Component({
    selector: 'jhi-person-view',
    templateUrl: './person-view.component.html'
})
export class PersonViewComponent extends AbstractEntityBaseViewComponent<IPerson> implements OnChanges {
    @Input() idParty: string;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected personService: PersonService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected messageService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(personService, messageService, elementRef, dataUtils, accountService);
        this.item = new Person();
    }

    onInit() {}

    onPrepareView() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['idParty']) {
            this.item = new Person();
            this.personService.find(this.idParty).subscribe(result => {
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

    get person() {
        return this.item;
    }

    set person(person: IPerson) {
        this.item = person;
    }

    itemKey() {
        return this.item.idParty;
    }
}
