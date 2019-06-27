import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { MufFeSharedModule } from 'app/shared';
import { MufFeSharedEntityModule } from 'app/entities/shared-entity.module';
import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { ListboxModule } from 'primeng/listbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import { TransactionRuleComponent, TransactionRuleDetailComponent, TransactionRuleUpdateComponent, transactionRuleRoute } from './';

const ENTITY_STATES = [...transactionRuleRoute];

@NgModule({
    imports: [
        MufFeSharedModule,
        MufFeSharedEntityModule,
        RouterModule.forChild(ENTITY_STATES),
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
        ButtonModule,
        // ngx
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        // others
        CurrencyMaskModule
    ],
    declarations: [TransactionRuleComponent, TransactionRuleDetailComponent, TransactionRuleUpdateComponent],
    entryComponents: [TransactionRuleComponent, TransactionRuleUpdateComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MufFeTransactionRuleModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
