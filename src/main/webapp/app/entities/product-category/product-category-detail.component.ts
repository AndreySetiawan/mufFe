import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductCategory } from 'app/shared/model/product-category.model';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    selector: 'jhi-product-category-detail',
    templateUrl: './product-category-detail.component.html'
})
export class ProductCategoryDetailComponent implements OnInit {
    productCategory: IProductCategory;

    constructor(private activatedRoute: ActivatedRoute, private toastService: MessageService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productCategory }) => {
            this.productCategory = productCategory;
        });
    }

    previousState() {
        window.history.back();
    }
}
