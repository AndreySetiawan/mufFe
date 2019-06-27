import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFeature } from 'app/shared/model/feature.model';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    selector: 'jhi-feature-detail',
    templateUrl: './feature-detail.component.html'
})
export class FeatureDetailComponent implements OnInit {
    feature: IFeature;

    constructor(private activatedRoute: ActivatedRoute, private toastService: MessageService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ feature }) => {
            this.feature = feature;
        });
    }

    previousState() {
        window.history.back();
    }
}
