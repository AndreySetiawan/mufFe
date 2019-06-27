import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPartyParameters } from 'app/shared/model/los/party-parameters.model';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    selector: 'jhi-party-parameters-detail',
    templateUrl: './party-parameters-detail.component.html'
})
export class PartyParametersDetailComponent implements OnInit {
    partyParameters: IPartyParameters;

    constructor(private activatedRoute: ActivatedRoute, private toastService: MessageService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ partyParameters }) => {
            this.partyParameters = partyParameters;
        });
    }

    previousState() {
        window.history.back();
    }
}
