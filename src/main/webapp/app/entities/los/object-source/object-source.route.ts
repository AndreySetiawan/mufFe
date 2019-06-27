import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ObjectSource } from 'app/shared/model/los/object-source.model';
import { ObjectSourceService } from './object-source.service';
import { ObjectSourceComponent } from './object-source.component';
import { ObjectSourceDetailComponent } from './object-source-detail.component';
import { ObjectSourceUpdateComponent } from './object-source-update.component';
import { IObjectSource } from 'app/shared/model/los/object-source.model';

@Injectable({ providedIn: 'root' })
export class ObjectSourceResolve implements Resolve<IObjectSource> {
    constructor(private service: ObjectSourceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((objectSource: HttpResponse<ObjectSource>) => objectSource.body));
        }
        const newItem = new ObjectSource();
        return of(newItem);
    }
}

export const objectSourceRoute: Routes = [
    {
        path: '',
        component: ObjectSourceComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'idObjectSource,asc',
            pageTitle: 'entity.action.main'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ObjectSourceDetailComponent,
        resolve: {
            objectSource: ObjectSourceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.view'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ObjectSourceUpdateComponent,
        resolve: {
            objectSource: ObjectSourceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.new'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ObjectSourceUpdateComponent,
        resolve: {
            objectSource: ObjectSourceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.edit'
        },
        canActivate: [UserRouteAccessService]
    }
];
