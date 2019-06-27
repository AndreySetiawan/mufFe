import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Uom } from 'app/shared/model/uom.model';
import { UomService } from './uom.service';
import { UomComponent } from './uom.component';
import { UomDetailComponent } from './uom-detail.component';
import { UomUpdateComponent } from './uom-update.component';
import { IUom } from 'app/shared/model/uom.model';
import { UomLovPopupComponent } from './uom-lov.component';

@Injectable({ providedIn: 'root' })
export class UomResolve implements Resolve<IUom> {
    constructor(private service: UomService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((uom: HttpResponse<Uom>) => uom.body));
        }
        const newItem = new Uom();
        const uomTypeId = route.params['uomTypeId'] ? route.params['uomTypeId'] : null;
        if (uomTypeId) {
            newItem.uomTypeId = uomTypeId;
        }
        return of(newItem);
    }
}

export const uomRoute: Routes = [
    {
        path: '',
        component: UomComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'idUom,asc',
            pageTitle: 'entity.action.main'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: UomDetailComponent,
        resolve: {
            uom: UomResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.view'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: UomUpdateComponent,
        resolve: {
            uom: UomResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.new'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: UomUpdateComponent,
        resolve: {
            uom: UomResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.edit'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'uom/lov',
        component: UomLovPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.lov'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
