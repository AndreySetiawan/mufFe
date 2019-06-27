import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { FinancialProduct } from 'app/shared/model/los/financial-product.model';
import { FinancialProductService } from './financial-product.service';
import { FinancialProductComponent } from './financial-product.component';
import { FinancialProductDetailComponent } from './financial-product-detail.component';
import { FinancialProductUpdateComponent } from './financial-product-update.component';
import { IFinancialProduct } from 'app/shared/model/los/financial-product.model';

@Injectable({ providedIn: 'root' })
export class FinancialProductResolve implements Resolve<IFinancialProduct> {
    constructor(private service: FinancialProductService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((financialProduct: HttpResponse<FinancialProduct>) => financialProduct.body));
        }
        const newItem = new FinancialProduct();
        const productTypeId = route.params['productTypeId'] ? route.params['productTypeId'] : null;
        if (productTypeId) {
            newItem.productTypeId = productTypeId;
        }
        return of(newItem);
    }
}

export const financialProductRoute: Routes = [
    {
        path: '',
        component: FinancialProductComponent,
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
        component: FinancialProductDetailComponent,
        resolve: {
            financialProduct: FinancialProductResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.view'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: FinancialProductUpdateComponent,
        resolve: {
            financialProduct: FinancialProductResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.new'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: FinancialProductUpdateComponent,
        resolve: {
            financialProduct: FinancialProductResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.edit'
        },
        canActivate: [UserRouteAccessService]
    }
];
