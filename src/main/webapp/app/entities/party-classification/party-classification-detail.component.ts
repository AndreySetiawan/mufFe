import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPartyClassification } from 'app/shared/model/party-classification.model';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    selector: 'jhi-party-classification-detail',
    templateUrl: './party-classification-detail.component.html'
})
export class PartyClassificationDetailComponent implements OnInit {
    partyClassification: IPartyClassification;

    constructor(private activatedRoute: ActivatedRoute, private toastService: MessageService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ partyClassification }) => {
            this.partyClassification = partyClassification;
        });
    }

    previousState() {
        window.history.back();
    }
}
