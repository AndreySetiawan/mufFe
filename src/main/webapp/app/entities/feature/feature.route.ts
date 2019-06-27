import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Feature } from 'app/shared/model/feature.model';
import { FeatureService } from './feature.service';
import { FeatureComponent } from './feature.component';
import { FeatureDetailComponent } from './feature-detail.component';
import { FeatureUpdateComponent } from './feature-update.component';
import { IFeature } from 'app/shared/model/feature.model';
import { FeatureLovPopupComponent } from './feature-lov.component';

@Injectable({ providedIn: 'root' })
export class FeatureResolve implements Resolve<IFeature> {
    constructor(private service: FeatureService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((feature: HttpResponse<Feature>) => feature.body));
        }
        const newItem = new Feature();
        const featureTypeId = route.params['featureTypeId'] ? route.params['featureTypeId'] : null;
        if (featureTypeId) {
            newItem.featureTypeId = featureTypeId;
        }
        return of(newItem);
    }
}

export const featureRoute: Routes = [
    {
        path: '',
        component: FeatureComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'idFeature,asc',
            pageTitle: 'entity.action.main'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: FeatureDetailComponent,
        resolve: {
            feature: FeatureResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.view'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: FeatureUpdateComponent,
        resolve: {
            feature: FeatureResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.new'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: FeatureUpdateComponent,
        resolve: {
            feature: FeatureResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.edit'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'feature/lov',
        component: FeatureLovPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.lov'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
