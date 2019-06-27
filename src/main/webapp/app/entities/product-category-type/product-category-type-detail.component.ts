import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductCategoryType } from 'app/shared/model/product-category-type.model';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    selector: 'jhi-product-category-type-detail',
    templateUrl: './product-category-type-detail.component.html'
})
export class ProductCategoryTypeDetailComponent implements OnInit {
    productCategoryType: IProductCategoryType;

    constructor(private activatedRoute: ActivatedRoute, private toastService: MessageService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productCategoryType }) => {
            this.productCategoryType = productCategoryType;
        });
    }

    previousState() {
        window.history.back();
    }
}
