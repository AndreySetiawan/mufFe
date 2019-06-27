import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFeatureType } from 'app/shared/model/feature-type.model';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    selector: 'jhi-feature-type-detail',
    templateUrl: './feature-type-detail.component.html'
})
export class FeatureTypeDetailComponent implements OnInit {
    featureType: IFeatureType;

    constructor(private activatedRoute: ActivatedRoute, private toastService: MessageService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ featureType }) => {
            this.featureType = featureType;
        });
    }

    previousState() {
        window.history.back();
    }
}
