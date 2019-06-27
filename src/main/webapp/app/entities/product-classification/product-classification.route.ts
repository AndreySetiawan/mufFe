import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ProductClassification } from 'app/shared/model/product-classification.model';
import { ProductClassificationService } from './product-classification.service';
import { ProductClassificationComponent } from './product-classification.component';
import { ProductClassificationDetailComponent } from './product-classification-detail.component';
import { ProductClassificationUpdateComponent } from './product-classification-update.component';
import { IProductClassification } from 'app/shared/model/product-classification.model';

@Injectable({ providedIn: 'root' })
export class ProductClassificationResolve implements Resolve<IProductClassification> {
    constructor(private service: ProductClassificationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((productClassification: HttpResponse<ProductClassification>) => productClassification.body));
        }
        const newItem = new ProductClassification();
        const categoryTypeId = route.params['categoryTypeId'] ? route.params['categoryTypeId'] : null;
        if (categoryTypeId) {
            newItem.categoryTypeId = categoryTypeId;
        }
        const categoryId = route.params['categoryId'] ? route.params['categoryId'] : null;
        if (categoryId) {
            newItem.categoryId = categoryId;
        }
        const productId = route.params['productId'] ? route.params['productId'] : null;
        if (productId) {
            newItem.productId = productId;
        }
        return of(newItem);
    }
}

export const productClassificationRoute: Routes = [
    {
        path: '',
        component: ProductClassificationComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'idClassification,asc',
            pageTitle: 'entity.action.main'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ProductClassificationDetailComponent,
        resolve: {
            productClassification: ProductClassificationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.view'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ProductClassificationUpdateComponent,
        resolve: {
            productClassification: ProductClassificationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.new'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ProductClassificationUpdateComponent,
        resolve: {
            productClassification: ProductClassificationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.edit'
        },
        canActivate: [UserRouteAccessService]
    }
];
