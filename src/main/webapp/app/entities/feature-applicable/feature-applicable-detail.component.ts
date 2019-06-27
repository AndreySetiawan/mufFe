import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFeatureApplicable } from 'app/shared/model/feature-applicable.model';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    selector: 'jhi-feature-applicable-detail',
    templateUrl: './feature-applicable-detail.component.html'
})
export class FeatureApplicableDetailComponent implements OnInit {
    featureApplicable: IFeatureApplicable;

    constructor(private activatedRoute: ActivatedRoute, private toastService: MessageService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ featureApplicable }) => {
            this.featureApplicable = featureApplicable;
        });
    }

    previousState() {
        window.history.back();
    }
}
