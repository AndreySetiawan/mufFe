import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiAlertService, JhiDataUtils, JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { ICategoryScheme, CategoryScheme } from 'app/shared/model/category-scheme.model';
import { CategorySchemeService } from './category-scheme.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { AbstractEntityLovComponent, AbstractEntityLovPopupComponent } from 'app/shared/base/abstract-entity-lov.component';
import { AccountService } from 'app/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-category-scheme-lov-dialog',
    templateUrl: './category-scheme-lov.component.html'
})
export class CategorySchemeLovDialogComponent extends AbstractEntityLovComponent<ICategoryScheme> {
    categoryschemes: ICategoryScheme[];
    parentId: number;

    constructor(
        protected categorySchemeService: CategorySchemeService,
        protected confirmationService: ConfirmationService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected dataUtils: JhiDataUtils,
        protected router: Router,
        protected eventManager: JhiEventManager,
        protected toastService: MessageService,
        public activeModal: NgbActiveModal
    ) {
        super(
            categorySchemeService,
            parseLinks,
            jhiAlertService,
            accountService,
            activatedRoute,
            dataUtils,
            router,
            eventManager,
            toastService,
            activeModal,
            confirmationService
        );

        this.listChangeEventName = 'categorySchemeListModification';
        this.entityKeyName = 'idScheme';

        this.predicate = this.entityKeyName;
        this.page = 1;
        this.itemsPerPage = 10;
        this.first = (this.page - 1) * this.itemsPerPage;
    }

    protected onInit() {
        this.categoryScheme = new CategoryScheme();
        this.categorySchemeService.query().subscribe(
            (res: HttpResponse<ICategoryScheme[]>) => {
                this.categoryschemes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    trackId(index: number, item: ICategoryScheme) {
        return item.idScheme;
    }

    setViewNew() {
        this.activeView = 'new-data';
    }

    setViewList() {
        this.activeView = 'list';
    }

    trackCategorySchemeById(index: number, item: ICategoryScheme) {
        return item.idScheme;
    }

    get categoryScheme() {
        return this.item;
    }

    set categoryScheme(categoryScheme: ICategoryScheme) {
        this.item = categoryScheme;
    }
}

@Component({
    selector: 'jhi-category-scheme-lov-popup',
    template: ''
})
export class CategorySchemeLovPopupComponent extends AbstractEntityLovPopupComponent<ICategoryScheme> {
    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {
        super(CategorySchemeLovDialogComponent as Component, activatedRoute, router, modalService);
    }
}
