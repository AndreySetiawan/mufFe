import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICategoryScheme } from 'app/shared/model/category-scheme.model';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    selector: 'jhi-category-scheme-detail',
    templateUrl: './category-scheme-detail.component.html'
})
export class CategorySchemeDetailComponent implements OnInit {
    categoryScheme: ICategoryScheme;

    constructor(private activatedRoute: ActivatedRoute, private toastService: MessageService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ categoryScheme }) => {
            this.categoryScheme = categoryScheme;
        });
    }

    previousState() {
        window.history.back();
    }
}
