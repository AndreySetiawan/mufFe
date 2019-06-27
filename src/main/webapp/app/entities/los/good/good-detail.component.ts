import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGood } from 'app/shared/model/los/good.model';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    selector: 'jhi-good-detail',
    templateUrl: './good-detail.component.html'
})
export class GoodDetailComponent implements OnInit {
    good: IGood;

    constructor(private activatedRoute: ActivatedRoute, private toastService: MessageService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ good }) => {
            this.good = good;
        });
    }

    previousState() {
        window.history.back();
    }
}
