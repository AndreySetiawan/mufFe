import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { CategoryScheme } from 'app/shared/model/category-scheme.model';
import { CategorySchemeService } from './category-scheme.service';
import { CategorySchemeComponent } from './category-scheme.component';
import { CategorySchemeDetailComponent } from './category-scheme-detail.component';
import { CategorySchemeUpdateComponent } from './category-scheme-update.component';
import { ICategoryScheme } from 'app/shared/model/category-scheme.model';
import { CategorySchemeLovPopupComponent } from './category-scheme-lov.component';

@Injectable({ providedIn: 'root' })
export class CategorySchemeResolve implements Resolve<ICategoryScheme> {
    constructor(private service: CategorySchemeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((categoryScheme: HttpResponse<CategoryScheme>) => categoryScheme.body));
        }
        const newItem = new CategoryScheme();
        const parentId = route.params['parentId'] ? route.params['parentId'] : null;
        if (parentId) {
            newItem.parentId = parentId;
        }
        return of(newItem);
    }
}

export const categorySchemeRoute: Routes = [
    {
        path: '',
        component: CategorySchemeComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'idScheme,asc',
            pageTitle: 'entity.action.main'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CategorySchemeDetailComponent,
        resolve: {
            categoryScheme: CategorySchemeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.view'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CategorySchemeUpdateComponent,
        resolve: {
            categoryScheme: CategorySchemeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.new'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CategorySchemeUpdateComponent,
        resolve: {
            categoryScheme: CategorySchemeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.edit'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'category-scheme/lov',
        component: CategorySchemeLovPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.lov'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
