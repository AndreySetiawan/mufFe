import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MufFeSharedModule } from 'app/shared';
import { PAGES_ROUTE } from './pages.route';
import { MufFeEntityModule } from 'app/entities/entity.module';
import { MufFeSharedEntityModule } from 'app/entities/shared-entity.module';
import { DashboardComponent } from './dashboard/dashboard.component';

/* atiila-needle-import-pages - atiila will add entity imports here */

@NgModule({
    imports: [MufFeSharedModule, RouterModule.forChild(PAGES_ROUTE), MufFeSharedModule, MufFeEntityModule, MufFeSharedEntityModule],
    declarations: [
        DashboardComponent
        /* atiila-needle-declare-pages - atiila will add entity declaration here */
    ],
    exports: [
        DashboardComponent
        /* atiila-needle-export-pages - atiila will add entity exports here */
    ],
    entryComponents: [
        /* atiila-needle-entry-component - atiila will add entity entry component here */
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MufFePagesModule {}
