import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiAlertService, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { ICategoryScheme, CategoryScheme } from 'app/shared/model/category-scheme.model';
import { CategorySchemeService } from './category-scheme.service';
import { map } from 'rxjs/operators';
import { AccountService } from 'app/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityUpdateComponent } from 'app/shared/base/abstract-entity-update.component';

@Component({
    selector: 'jhi-category-scheme-update',
    templateUrl: './category-scheme-update.component.html'
})
export class CategorySchemeUpdateComponent extends AbstractEntityUpdateComponent<ICategoryScheme> {
    categoryschemes: ICategoryScheme[];
    parentId: number;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected categorySchemeService: CategorySchemeService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute,
        protected confirmationService: ConfirmationService,
        protected eventManager: JhiEventManager,
        protected toastService: MessageService,
        protected accountService: AccountService,
        protected webSocket: BaseWebSocketService
    ) {
        super(dataUtils, categorySchemeService, elementRef, confirmationService, eventManager, toastService, accountService);
        this.listChangeEventName = 'categorySchemeListModification';
        this.item = new CategoryScheme();
    }

    onInit() {
        this.activatedRoute.params.subscribe(params => {
            if (params['parentId']) {
                this.parentId = params['parentId'];
            }
        });
        this.activatedRoute.data.subscribe(({ categoryScheme }) => {
            this.categoryScheme = categoryScheme;
        });
        this.categorySchemeService.query().subscribe(
            (res: HttpResponse<ICategoryScheme[]>) => {
                this.categoryschemes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    trackCategorySchemeById(index: number, item: ICategoryScheme) {
        return item.idScheme;
    }

    itemKey() {
        return this.item.idScheme;
    }

    get categoryScheme() {
        return this.item;
    }

    set categoryScheme(categoryScheme: ICategoryScheme) {
        this.item = categoryScheme;
    }
}
