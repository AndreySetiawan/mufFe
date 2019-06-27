import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPartyCategory } from 'app/shared/model/party-category.model';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    selector: 'jhi-party-category-detail',
    templateUrl: './party-category-detail.component.html'
})
export class PartyCategoryDetailComponent implements OnInit {
    partyCategory: IPartyCategory;

    constructor(private activatedRoute: ActivatedRoute, private toastService: MessageService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ partyCategory }) => {
            this.partyCategory = partyCategory;
        });
    }

    previousState() {
        window.history.back();
    }
}
