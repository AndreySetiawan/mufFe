import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { PartyParameters } from 'app/shared/model/los/party-parameters.model';
import { PartyParametersService } from './party-parameters.service';
import { PartyParametersComponent } from './party-parameters.component';
import { PartyParametersDetailComponent } from './party-parameters-detail.component';
import { PartyParametersUpdateComponent } from './party-parameters-update.component';
import { IPartyParameters } from 'app/shared/model/los/party-parameters.model';

@Injectable({ providedIn: 'root' })
export class PartyParametersResolve implements Resolve<IPartyParameters> {
    constructor(private service: PartyParametersService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((partyParameters: HttpResponse<PartyParameters>) => partyParameters.body));
        }
        const newItem = new PartyParameters();
        const schemeId = route.params['schemeId'] ? route.params['schemeId'] : null;
        if (schemeId) {
            newItem.schemeId = schemeId;
        }
        const roleId = route.params['roleId'] ? route.params['roleId'] : null;
        if (roleId) {
            newItem.roleId = roleId;
        }
        return of(newItem);
    }
}

export const partyParametersRoute: Routes = [
    {
        path: '',
        component: PartyParametersComponent,
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
        component: PartyParametersDetailComponent,
        resolve: {
            partyParameters: PartyParametersResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.view'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PartyParametersUpdateComponent,
        resolve: {
            partyParameters: PartyParametersResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.new'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PartyParametersUpdateComponent,
        resolve: {
            partyParameters: PartyParametersResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.edit'
        },
        canActivate: [UserRouteAccessService]
    }
];
