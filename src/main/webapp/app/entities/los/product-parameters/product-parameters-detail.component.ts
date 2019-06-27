import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductParameters } from 'app/shared/model/los/product-parameters.model';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    selector: 'jhi-product-parameters-detail',
    templateUrl: './product-parameters-detail.component.html'
})
export class ProductParametersDetailComponent implements OnInit {
    productParameters: IProductParameters;

    constructor(private activatedRoute: ActivatedRoute, private toastService: MessageService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productParameters }) => {
            this.productParameters = productParameters;
        });
    }

    previousState() {
        window.history.back();
    }
}
