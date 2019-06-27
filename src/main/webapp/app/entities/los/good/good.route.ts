import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Good } from 'app/shared/model/los/good.model';
import { GoodService } from './good.service';
import { GoodComponent } from './good.component';
import { GoodDetailComponent } from './good-detail.component';
import { GoodUpdateComponent } from './good-update.component';
import { IGood } from 'app/shared/model/los/good.model';

@Injectable({ providedIn: 'root' })
export class GoodResolve implements Resolve<IGood> {
    constructor(private service: GoodService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((good: HttpResponse<Good>) => good.body));
        }
        const newItem = new Good();
        const productTypeId = route.params['productTypeId'] ? route.params['productTypeId'] : null;
        if (productTypeId) {
            newItem.productTypeId = productTypeId;
        }
        const uomId = route.params['uomId'] ? route.params['uomId'] : null;
        if (uomId) {
            newItem.uomId = uomId;
        }
        return of(newItem);
    }
}

export const goodRoute: Routes = [
    {
        path: '',
        component: GoodComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'idProduct,asc',
            pageTitle: 'entity.action.main'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: GoodDetailComponent,
        resolve: {
            good: GoodResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.view'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: GoodUpdateComponent,
        resolve: {
            good: GoodResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.new'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: GoodUpdateComponent,
        resolve: {
            good: GoodResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.edit'
        },
        canActivate: [UserRouteAccessService]
    }
];
