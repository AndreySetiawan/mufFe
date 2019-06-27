import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'financial-product',
                loadChildren: './los/financial-product/financial-product.module#MufFeFinancialProductModule'
            },
            {
                path: 'good',
                loadChildren: './los/good/good.module#MufFeGoodModule'
            },
            {
                path: 'uom',
                loadChildren: './uom/uom.module#MufFeUomModule'
            },
            {
                path: 'uom-type',
                loadChildren: './uom-type/uom-type.module#MufFeUomTypeModule'
            },
            {
                path: 'category-scheme',
                loadChildren: './category-scheme/category-scheme.module#MufFeCategorySchemeModule'
            },
            {
                path: 'product-category-type',
                loadChildren: './product-category-type/product-category-type.module#MufFeProductCategoryTypeModule'
            },
            {
                path: 'product-category',
                loadChildren: './product-category/product-category.module#MufFeProductCategoryModule'
            },
            {
                path: 'product-classification',
                loadChildren: './product-classification/product-classification.module#MufFeProductClassificationModule'
            },
            {
                path: 'product-type',
                loadChildren: './product-type/product-type.module#MufFeProductTypeModule'
            },
            {
                path: 'party-category',
                loadChildren: './party-category/party-category.module#MufFePartyCategoryModule'
            },
            {
                path: 'party-category-type',
                loadChildren: './party-category-type/party-category-type.module#MufFePartyCategoryTypeModule'
            },
            {
                path: 'party-classification',
                loadChildren: './party-classification/party-classification.module#MufFePartyClassificationModule'
            },
            {
                path: 'feature-type',
                loadChildren: './feature-type/feature-type.module#MufFeFeatureTypeModule'
            },
            {
                path: 'feature',
                loadChildren: './feature/feature.module#MufFeFeatureModule'
            },
            {
                path: 'feature-applicable',
                loadChildren: './feature-applicable/feature-applicable.module#MufFeFeatureApplicableModule'
            },
            {
                path: 'party-parameters',
                loadChildren: './los/party-parameters/party-parameters.module#MufFePartyParametersModule'
            },
            {
                path: 'product-parameters',
                loadChildren: './los/product-parameters/product-parameters.module#MufFeProductParametersModule'
            },
            {
                path: 'rule-type',
                loadChildren: './rule-type/rule-type.module#MufFeRuleTypeModule'
            },
            {
                path: 'transaction-rule',
                loadChildren: './los/transaction-rule/transaction-rule.module#MufFeTransactionRuleModule'
            },
            {
                path: 'work-type',
                loadChildren: './work-type/work-type.module#MufFeWorkTypeModule'
            },
            {
                path: 'object-source',
                loadChildren: './los/object-source/object-source.module#MufFeObjectSourceModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MufFeEntityModule {}
