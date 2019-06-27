import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ProductCategory } from 'app/shared/model/product-category.model';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryComponent } from './product-category.component';
import { ProductCategoryDetailComponent } from './product-category-detail.component';
import { ProductCategoryUpdateComponent } from './product-category-update.component';
import { IProductCategory } from 'app/shared/model/product-category.model';
import { ProductCategoryLovPopupComponent } from './product-category-lov.component';

@Injectable({ providedIn: 'root' })
export class ProductCategoryResolve implements Resolve<IProductCategory> {
    constructor(private service: ProductCategoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((productCategory: HttpResponse<ProductCategory>) => productCategory.body));
        }
        const newItem = new ProductCategory();
        const parentId = route.params['parentId'] ? route.params['parentId'] : null;
        if (parentId) {
            newItem.parentId = parentId;
        }
        const categoryTypeId = route.params['categoryTypeId'] ? route.params['categoryTypeId'] : null;
        if (categoryTypeId) {
            newItem.categoryTypeId = categoryTypeId;
        }
        return of(newItem);
    }
}

export const productCategoryRoute: Routes = [
    {
        path: '',
        component: ProductCategoryComponent,
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
        component: ProductCategoryDetailComponent,
        resolve: {
            productCategory: ProductCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.view'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ProductCategoryUpdateComponent,
        resolve: {
            productCategory: ProductCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.new'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ProductCategoryUpdateComponent,
        resolve: {
            productCategory: ProductCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.edit'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'product-category/lov',
        component: ProductCategoryLovPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.lov'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
