import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductClassification } from 'app/shared/model/product-classification.model';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    selector: 'jhi-product-classification-detail',
    templateUrl: './product-classification-detail.component.html'
})
export class ProductClassificationDetailComponent implements OnInit {
    productClassification: IProductClassification;

    constructor(private activatedRoute: ActivatedRoute, private toastService: MessageService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productClassification }) => {
            this.productClassification = productClassification;
        });
    }

    previousState() {
        window.history.back();
    }
}
