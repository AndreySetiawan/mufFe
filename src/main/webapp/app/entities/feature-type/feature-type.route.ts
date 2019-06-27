import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { FeatureType } from 'app/shared/model/feature-type.model';
import { FeatureTypeService } from './feature-type.service';
import { FeatureTypeComponent } from './feature-type.component';
import { FeatureTypeDetailComponent } from './feature-type-detail.component';
import { FeatureTypeUpdateComponent } from './feature-type-update.component';
import { IFeatureType } from 'app/shared/model/feature-type.model';

@Injectable({ providedIn: 'root' })
export class FeatureTypeResolve implements Resolve<IFeatureType> {
    constructor(private service: FeatureTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((featureType: HttpResponse<FeatureType>) => featureType.body));
        }
        const newItem = new FeatureType();
        return of(newItem);
    }
}

export const featureTypeRoute: Routes = [
    {
        path: '',
        component: FeatureTypeComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'idFeatureType,asc',
            pageTitle: 'entity.action.main'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: FeatureTypeDetailComponent,
        resolve: {
            featureType: FeatureTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.view'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: FeatureTypeUpdateComponent,
        resolve: {
            featureType: FeatureTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.new'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: FeatureTypeUpdateComponent,
        resolve: {
            featureType: FeatureTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.edit'
        },
        canActivate: [UserRouteAccessService]
    }
];
