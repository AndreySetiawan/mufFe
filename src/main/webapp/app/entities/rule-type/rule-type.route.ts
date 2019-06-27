import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { RuleType } from 'app/shared/model/rule-type.model';
import { RuleTypeService } from './rule-type.service';
import { RuleTypeComponent } from './rule-type.component';
import { RuleTypeDetailComponent } from './rule-type-detail.component';
import { RuleTypeUpdateComponent } from './rule-type-update.component';
import { IRuleType } from 'app/shared/model/rule-type.model';

@Injectable({ providedIn: 'root' })
export class RuleTypeResolve implements Resolve<IRuleType> {
    constructor(private service: RuleTypeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((ruleType: HttpResponse<RuleType>) => ruleType.body));
        }
        const newItem = new RuleType();
        const parentId = route.params['parentId'] ? route.params['parentId'] : null;
        if (parentId) {
            newItem.parentId = parentId;
        }
        return of(newItem);
    }
}

export const ruleTypeRoute: Routes = [
    {
        path: '',
        component: RuleTypeComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'idRuleType,asc',
            pageTitle: 'entity.action.main'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: RuleTypeDetailComponent,
        resolve: {
            ruleType: RuleTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.view'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: RuleTypeUpdateComponent,
        resolve: {
            ruleType: RuleTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.new'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: RuleTypeUpdateComponent,
        resolve: {
            ruleType: RuleTypeResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.edit'
        },
        canActivate: [UserRouteAccessService]
    }
];
