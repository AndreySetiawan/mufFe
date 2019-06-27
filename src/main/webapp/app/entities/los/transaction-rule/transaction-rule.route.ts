import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { TransactionRule } from 'app/shared/model/los/transaction-rule.model';
import { TransactionRuleService } from './transaction-rule.service';
import { TransactionRuleComponent } from './transaction-rule.component';
import { TransactionRuleDetailComponent } from './transaction-rule-detail.component';
import { TransactionRuleUpdateComponent } from './transaction-rule-update.component';
import { ITransactionRule } from 'app/shared/model/los/transaction-rule.model';

@Injectable({ providedIn: 'root' })
export class TransactionRuleResolve implements Resolve<ITransactionRule> {
    constructor(private service: TransactionRuleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((transactionRule: HttpResponse<TransactionRule>) => transactionRule.body));
        }
        const newItem = new TransactionRule();
        const parentId = route.params['parentId'] ? route.params['parentId'] : null;
        if (parentId) {
            newItem.parentId = parentId;
        }
        const featureTypeId = route.params['featureTypeId'] ? route.params['featureTypeId'] : null;
        if (featureTypeId) {
            newItem.featureTypeId = featureTypeId;
        }
        const featureId = route.params['featureId'] ? route.params['featureId'] : null;
        if (featureId) {
            newItem.featureId = featureId;
        }
        return of(newItem);
    }
}

export const transactionRuleRoute: Routes = [
    {
        path: '',
        component: TransactionRuleComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'ruleCode,asc',
            pageTitle: 'entity.action.main'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TransactionRuleDetailComponent,
        resolve: {
            transactionRule: TransactionRuleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.view'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TransactionRuleUpdateComponent,
        resolve: {
            transactionRule: TransactionRuleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.new'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TransactionRuleUpdateComponent,
        resolve: {
            transactionRule: TransactionRuleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'entity.action.edit'
        },
        canActivate: [UserRouteAccessService]
    }
];
