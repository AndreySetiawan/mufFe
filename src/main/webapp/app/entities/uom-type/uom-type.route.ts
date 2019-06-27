import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { UomType } from 'app/shared/model/uom-type.model';
import { UomTypeService } from './uom-type.service';
import { UomTypeComponent } from './uom-type.component';
import { UomTypeDetailComponent } from './uom-type-detail.component';
import { UomTypeUpdateComponent } from './uom-type-update.component';
import { IUomType } from 'app/shared/model/uom-type.model';

@Injectable({ providedIn: 'root' })
export class UomTypeResolve implements Resolve<IUomType> {
    constructor(private service: UomTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((uomType: HttpResponse<UomType>) => uomType.body));
        }
        const newItem = new UomType();
        return of(newItem);
    }
}

export const uomTypeRoute: Routes = [
    {
        path: '',
        component: UomTypeComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'idUomType,asc',
            pageTitle: 'entity.action.main'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: UomTypeDetailComponent,
        resolve: {
            uomType: UomTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.view'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: UomTypeUpdateComponent,
        resolve: {
            uomType: UomTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.new'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: UomTypeUpdateComponent,
        resolve: {
            uomType: UomTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.edit'
        },
        canActivate: [UserRouteAccessService]
    }
];
