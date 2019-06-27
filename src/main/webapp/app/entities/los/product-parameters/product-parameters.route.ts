import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ProductParameters } from 'app/shared/model/los/product-parameters.model';
import { ProductParametersService } from './product-parameters.service';
import { ProductParametersComponent } from './product-parameters.component';
import { ProductParametersDetailComponent } from './product-parameters-detail.component';
import { ProductParametersUpdateComponent } from './product-parameters-update.component';
import { IProductParameters } from 'app/shared/model/los/product-parameters.model';

@Injectable({ providedIn: 'root' })
export class ProductParametersResolve implements Resolve<IProductParameters> {
    constructor(private service: ProductParametersService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((productParameters: HttpResponse<ProductParameters>) => productParameters.body));
        }
        const newItem = new ProductParameters();
        const schemeId = route.params['schemeId'] ? route.params['schemeId'] : null;
        if (schemeId) {
            newItem.schemeId = schemeId;
        }
        const productTypeId = route.params['productTypeId'] ? route.params['productTypeId'] : null;
        if (productTypeId) {
            newItem.productTypeId = productTypeId;
        }
        return of(newItem);
    }
}

export const productParametersRoute: Routes = [
    {
        path: '',
        component: ProductParametersComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'paramCode,asc',
            pageTitle: 'entity.action.main'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ProductParametersDetailComponent,
        resolve: {
            productParameters: ProductParametersResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.view'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ProductParametersUpdateComponent,
        resolve: {
            productParameters: ProductParametersResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.new'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ProductParametersUpdateComponent,
        resolve: {
            productParameters: ProductParametersResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.edit'
        },
        canActivate: [UserRouteAccessService]
    }
];
