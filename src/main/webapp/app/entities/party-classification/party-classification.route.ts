import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { PartyClassification } from 'app/shared/model/party-classification.model';
import { PartyClassificationService } from './party-classification.service';
import { PartyClassificationComponent } from './party-classification.component';
import { PartyClassificationDetailComponent } from './party-classification-detail.component';
import { PartyClassificationUpdateComponent } from './party-classification-update.component';
import { IPartyClassification } from 'app/shared/model/party-classification.model';

@Injectable({ providedIn: 'root' })
export class PartyClassificationResolve implements Resolve<IPartyClassification> {
    constructor(private service: PartyClassificationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((partyClassification: HttpResponse<PartyClassification>) => partyClassification.body));
        }
        const newItem = new PartyClassification();
        const categoryTypeId = route.params['categoryTypeId'] ? route.params['categoryTypeId'] : null;
        if (categoryTypeId) {
            newItem.categoryTypeId = categoryTypeId;
        }
        const categoryId = route.params['categoryId'] ? route.params['categoryId'] : null;
        if (categoryId) {
            newItem.categoryId = categoryId;
        }
        const partyId = route.params['partyId'] ? route.params['partyId'] : null;
        if (partyId) {
            newItem.partyId = partyId;
        }
        return of(newItem);
    }
}

export const partyClassificationRoute: Routes = [
    {
        path: '',
        component: PartyClassificationComponent,
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
        component: PartyClassificationDetailComponent,
        resolve: {
            partyClassification: PartyClassificationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.view'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PartyClassificationUpdateComponent,
        resolve: {
            partyClassification: PartyClassificationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.new'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PartyClassificationUpdateComponent,
        resolve: {
            partyClassification: PartyClassificationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.edit'
        },
        canActivate: [UserRouteAccessService]
    }
];
