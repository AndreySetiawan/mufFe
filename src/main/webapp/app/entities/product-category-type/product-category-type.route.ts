import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ProductCategoryType } from 'app/shared/model/product-category-type.model';
import { ProductCategoryTypeService } from './product-category-type.service';
import { ProductCategoryTypeComponent } from './product-category-type.component';
import { ProductCategoryTypeDetailComponent } from './product-category-type-detail.component';
import { ProductCategoryTypeUpdateComponent } from './product-category-type-update.component';
import { IProductCategoryType } from 'app/shared/model/product-category-type.model';

@Injectable({ providedIn: 'root' })
export class ProductCategoryTypeResolve implements Resolve<IProductCategoryType> {
    constructor(private service: ProductCategoryTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((productCategoryType: HttpResponse<ProductCategoryType>) => productCategoryType.body));
        }
        const newItem = new ProductCategoryType();
        const schemeId = route.params['schemeId'] ? route.params['schemeId'] : null;
        if (schemeId) {
            newItem.schemeId = schemeId;
        }
        return of(newItem);
    }
}

export const productCategoryTypeRoute: Routes = [
    {
        path: '',
        component: ProductCategoryTypeComponent,
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
        component: ProductCategoryTypeDetailComponent,
        resolve: {
            productCategoryType: ProductCategoryTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.view'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ProductCategoryTypeUpdateComponent,
        resolve: {
            productCategoryType: ProductCategoryTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.new'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ProductCategoryTypeUpdateComponent,
        resolve: {
            productCategoryType: ProductCategoryTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.edit'
        },
        canActivate: [UserRouteAccessService]
    }
];
