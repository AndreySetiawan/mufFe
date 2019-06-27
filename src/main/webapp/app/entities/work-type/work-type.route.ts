import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { WorkType } from 'app/shared/model/work-type.model';
import { WorkTypeService } from './work-type.service';
import { WorkTypeComponent } from './work-type.component';
import { WorkTypeDetailComponent } from './work-type-detail.component';
import { WorkTypeUpdateComponent } from './work-type-update.component';
import { IWorkType } from 'app/shared/model/work-type.model';
import { WorkTypeLovPopupComponent } from './work-type-lov.component';

@Injectable({ providedIn: 'root' })
export class WorkTypeResolve implements Resolve<IWorkType> {
    constructor(private service: WorkTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((workType: HttpResponse<WorkType>) => workType.body));
        }
        const newItem = new WorkType();
        return of(newItem);
    }
}

export const workTypeRoute: Routes = [
    {
        path: '',
        component: WorkTypeComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'idWorkType,asc',
            pageTitle: 'entity.action.main'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: WorkTypeDetailComponent,
        resolve: {
            workType: WorkTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.view'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: WorkTypeUpdateComponent,
        resolve: {
            workType: WorkTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.new'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: WorkTypeUpdateComponent,
        resolve: {
            workType: WorkTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.edit'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'work-type/lov',
        component: WorkTypeLovPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.lov'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
