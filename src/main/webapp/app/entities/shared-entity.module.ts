import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MufFeSharedModule } from 'app/shared';
import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { ListboxModule } from 'primeng/listbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { FinancialProductViewComponent } from './los/financial-product/financial-product-view.component';
import { GoodAsListComponent } from './los/good/good-as-list.component';
import { GoodViewComponent } from './los/good/good-view.component';
import { UomAsListComponent } from './uom/uom-as-list.component';
import { UomViewComponent } from './uom/uom-view.component';
import { UomTypeViewComponent } from './uom-type/uom-type-view.component';
import { CategorySchemeAsListComponent } from './category-scheme/category-scheme-as-list.component';
import { CategorySchemeViewComponent } from './category-scheme/category-scheme-view.component';
import { ProductCategoryTypeViewComponent } from './product-category-type/product-category-type-view.component';
import { ProductCategoryAsListComponent } from './product-category/product-category-as-list.component';
import { ProductCategoryViewComponent } from './product-category/product-category-view.component';
import { ProductClassificationAsListComponent } from './product-classification/product-classification-as-list.component';
import { ProductClassificationViewComponent } from './product-classification/product-classification-view.component';
import { ProductTypeViewComponent } from './product-type/product-type-view.component';
import { ProductViewComponent } from './product/product-view.component';
import { PartyCategoryAsListComponent } from './party-category/party-category-as-list.component';
import { PartyCategoryViewComponent } from './party-category/party-category-view.component';
import { PartyCategoryTypeViewComponent } from './party-category-type/party-category-type-view.component';
import { PartyClassificationAsListComponent } from './party-classification/party-classification-as-list.component';
import { PartyClassificationViewComponent } from './party-classification/party-classification-view.component';
import { PersonViewComponent } from './person/person-view.component';
import { OrganizationViewComponent } from './organization/organization-view.component';
import { FeatureTypeViewComponent } from './feature-type/feature-type-view.component';
import { FeatureAsListComponent } from './feature/feature-as-list.component';
import { FeatureViewComponent } from './feature/feature-view.component';
import { FeatureApplicableAsListComponent } from './feature-applicable/feature-applicable-as-list.component';
import { FeatureApplicableViewComponent } from './feature-applicable/feature-applicable-view.component';
import { PartyParametersViewComponent } from './los/party-parameters/party-parameters-view.component';
import { ProductParametersViewComponent } from './los/product-parameters/product-parameters-view.component';
import { RuleTypeViewComponent } from './rule-type/rule-type-view.component';
import { TransactionRuleViewComponent } from './los/transaction-rule/transaction-rule-view.component';
import { WorkTypeViewComponent } from './work-type/work-type-view.component';
import { ObjectSourceViewComponent } from './los/object-source/object-source-view.component';
/* jhipster-needle-import-entity-as-list - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        MufFeSharedModule,
        RouterModule,
        // primeng
        DataViewModule,
        TableModule,
        CalendarModule,
        ListboxModule,
        AutoCompleteModule,
        PanelModule,
        DialogModule,
        CheckboxModule,
        ConfirmDialogModule,
        CardModule,
        ButtonModule,
        // ngx
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        // others
        CurrencyMaskModule
    ],
    // prettier-ignore
    declarations: [
        FinancialProductViewComponent,
        ProductTypeViewComponent,
        GoodAsListComponent,
        GoodViewComponent,
        UomAsListComponent,
        UomViewComponent,
        UomTypeViewComponent,
        CategorySchemeAsListComponent,
        CategorySchemeViewComponent,
        ProductViewComponent,
        ProductCategoryTypeViewComponent,
        ProductCategoryAsListComponent,
        ProductCategoryViewComponent,
        ProductClassificationAsListComponent,
        ProductClassificationViewComponent,
        PartyCategoryAsListComponent,
        PartyCategoryViewComponent,
        PartyCategoryTypeViewComponent,
        PartyClassificationAsListComponent,
        PartyClassificationViewComponent,
        PersonViewComponent,
        OrganizationViewComponent,
        FeatureTypeViewComponent,
        FeatureAsListComponent,
        FeatureViewComponent,
        FeatureApplicableAsListComponent,
        FeatureApplicableViewComponent,
        PartyParametersViewComponent,
        ProductParametersViewComponent,
        RuleTypeViewComponent,
        TransactionRuleViewComponent,
        WorkTypeViewComponent,
        ObjectSourceViewComponent,
        /* jhipster-needle-declaration-entity-as-list */
    ],
    entryComponents: [],
    // prettier-ignore
    exports: [
        FinancialProductViewComponent, // Remove Me
        ProductTypeViewComponent, // Remove Me
        GoodAsListComponent, // Remove Me
        GoodViewComponent, // Remove Me
        UomAsListComponent, // Remove Me
        UomViewComponent, // Remove Me
        UomTypeViewComponent, // Remove Me
        ProductViewComponent,
        CategorySchemeAsListComponent, // Remove Me
        CategorySchemeViewComponent, // Remove Me
        ProductCategoryTypeViewComponent, // Remove Me
        ProductCategoryAsListComponent, // Remove Me
        ProductCategoryViewComponent, // Remove Me
        ProductClassificationAsListComponent, // Remove Me
        ProductClassificationViewComponent, // Remove Me
        PartyCategoryAsListComponent, // Remove Me
        PartyCategoryViewComponent, // Remove Me
        PartyCategoryTypeViewComponent, // Remove Me
        PartyClassificationAsListComponent, // Remove Me
        PartyClassificationViewComponent, // Remove Me
        PersonViewComponent, // Remove Me
        OrganizationViewComponent, // Remove Me
        FeatureTypeViewComponent, // Remove Me
        FeatureAsListComponent, // Remove Me
        FeatureViewComponent, // Remove Me
        FeatureApplicableAsListComponent, // Remove Me
        FeatureApplicableViewComponent, // Remove Me
        PartyParametersViewComponent, // Remove Me
        ProductParametersViewComponent, // Remove Me
        RuleTypeViewComponent, // Remove Me
        TransactionRuleViewComponent, // Remove Me
        WorkTypeViewComponent, // Remove Me
        ObjectSourceViewComponent, // Remove Me
        /* jhipster-needle-as-list-export-shared-module - JHipster will add entity exports imports here */
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MufFeSharedEntityModule {}
