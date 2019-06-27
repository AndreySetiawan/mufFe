import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { PartyCategory } from 'app/shared/model/party-category.model';
import { PartyCategoryService } from './party-category.service';
import { PartyCategoryComponent } from './party-category.component';
import { PartyCategoryDetailComponent } from './party-category-detail.component';
import { PartyCategoryUpdateComponent } from './party-category-update.component';
import { IPartyCategory } from 'app/shared/model/party-category.model';
import { PartyCategoryLovPopupComponent } from './party-category-lov.component';

@Injectable({ providedIn: 'root' })
export class PartyCategoryResolve implements Resolve<IPartyCategory> {
    constructor(private service: PartyCategoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((partyCategory: HttpResponse<PartyCategory>) => partyCategory.body));
        }
        const newItem = new PartyCategory();
        const categoryTypeId = route.params['categoryTypeId'] ? route.params['categoryTypeId'] : null;
        if (categoryTypeId) {
            newItem.categoryTypeId = categoryTypeId;
        }
        return of(newItem);
    }
}

export const partyCategoryRoute: Routes = [
    {
        path: '',
        component: PartyCategoryComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'idCategory,asc',
            pageTitle: 'entity.action.main'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PartyCategoryDetailComponent,
        resolve: {
            partyCategory: PartyCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.view'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PartyCategoryUpdateComponent,
        resolve: {
            partyCategory: PartyCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.new'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PartyCategoryUpdateComponent,
        resolve: {
            partyCategory: PartyCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.edit'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'party-category/lov',
        component: PartyCategoryLovPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.lov'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
