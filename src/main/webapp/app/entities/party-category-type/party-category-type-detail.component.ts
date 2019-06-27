import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPartyCategoryType } from 'app/shared/model/party-category-type.model';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    selector: 'jhi-party-category-type-detail',
    templateUrl: './party-category-type-detail.component.html'
})
export class PartyCategoryTypeDetailComponent implements OnInit {
    partyCategoryType: IPartyCategoryType;

    constructor(private activatedRoute: ActivatedRoute, private toastService: MessageService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ partyCategoryType }) => {
            this.partyCategoryType = partyCategoryType;
        });
    }

    previousState() {
        window.history.back();
    }
}
