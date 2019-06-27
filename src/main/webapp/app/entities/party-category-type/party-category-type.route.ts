import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { PartyCategoryType } from 'app/shared/model/party-category-type.model';
import { PartyCategoryTypeService } from './party-category-type.service';
import { PartyCategoryTypeComponent } from './party-category-type.component';
import { PartyCategoryTypeDetailComponent } from './party-category-type-detail.component';
import { PartyCategoryTypeUpdateComponent } from './party-category-type-update.component';
import { IPartyCategoryType } from 'app/shared/model/party-category-type.model';

@Injectable({ providedIn: 'root' })
export class PartyCategoryTypeResolve implements Resolve<IPartyCategoryType> {
    constructor(private service: PartyCategoryTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((partyCategoryType: HttpResponse<PartyCategoryType>) => partyCategoryType.body));
        }
        const newItem = new PartyCategoryType();
        const schemeId = route.params['schemeId'] ? route.params['schemeId'] : null;
        if (schemeId) {
            newItem.schemeId = schemeId;
        }
        return of(newItem);
    }
}

export const partyCategoryTypeRoute: Routes = [
    {
        path: '',
        component: PartyCategoryTypeComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'idCategoryType,asc',
            pageTitle: 'entity.action.main'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PartyCategoryTypeDetailComponent,
        resolve: {
            partyCategoryType: PartyCategoryTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.view'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PartyCategoryTypeUpdateComponent,
        resolve: {
            partyCategoryType: PartyCategoryTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.new'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PartyCategoryTypeUpdateComponent,
        resolve: {
            partyCategoryType: PartyCategoryTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.edit'
        },
        canActivate: [UserRouteAccessService]
    }
];
