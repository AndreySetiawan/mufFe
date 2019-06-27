import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { FeatureApplicable } from 'app/shared/model/feature-applicable.model';
import { FeatureApplicableService } from './feature-applicable.service';
import { FeatureApplicableComponent } from './feature-applicable.component';
import { FeatureApplicableDetailComponent } from './feature-applicable-detail.component';
import { FeatureApplicableUpdateComponent } from './feature-applicable-update.component';
import { IFeatureApplicable } from 'app/shared/model/feature-applicable.model';

@Injectable({ providedIn: 'root' })
export class FeatureApplicableResolve implements Resolve<IFeatureApplicable> {
    constructor(private service: FeatureApplicableService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((featureApplicable: HttpResponse<FeatureApplicable>) => featureApplicable.body));
        }
        const newItem = new FeatureApplicable();
        const featureTypeId = route.params['featureTypeId'] ? route.params['featureTypeId'] : null;
        if (featureTypeId) {
            newItem.featureTypeId = featureTypeId;
        }
        const featureId = route.params['featureId'] ? route.params['featureId'] : null;
        if (featureId) {
            newItem.featureId = featureId;
        }
        const productId = route.params['productId'] ? route.params['productId'] : null;
        if (productId) {
            newItem.productId = productId;
        }
        return of(newItem);
    }
}

export const featureApplicableRoute: Routes = [
    {
        path: '',
        component: FeatureApplicableComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'product.idProduct,asc',
            pageTitle: 'entity.action.main'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: FeatureApplicableDetailComponent,
        resolve: {
            featureApplicable: FeatureApplicableResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.view'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: FeatureApplicableUpdateComponent,
        resolve: {
            featureApplicable: FeatureApplicableResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.new'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: FeatureApplicableUpdateComponent,
        resolve: {
            featureApplicable: FeatureApplicableResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.edit'
        },
        canActivate: [UserRouteAccessService]
    }
];
