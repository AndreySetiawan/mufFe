import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFinancialProduct } from 'app/shared/model/los/financial-product.model';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    selector: 'jhi-financial-product-detail',
    templateUrl: './financial-product-detail.component.html'
})
export class FinancialProductDetailComponent implements OnInit {
    financialProduct: IFinancialProduct;

    constructor(private activatedRoute: ActivatedRoute, private toastService: MessageService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ financialProduct }) => {
            this.financialProduct = financialProduct;
        });
    }

    previousState() {
        window.history.back();
    }
}
