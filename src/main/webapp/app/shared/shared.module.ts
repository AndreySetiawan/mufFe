import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { MufFeSharedLibsModule, MufFeSharedCommonModule, HasAnyAuthorityDirective } from './';

import {
    EditViewDirective,
    CardViewDirective,
    ItemViewDirective,
    SimpleViewDirective,
    HeaderViewDirective,
    FooterViewDirective
} from 'app/shared/base/abstract-entity-view.directive';

@NgModule({
    imports: [MufFeSharedLibsModule, MufFeSharedCommonModule],
    declarations: [
        HasAnyAuthorityDirective,
        EditViewDirective,
        CardViewDirective,
        ItemViewDirective,
        SimpleViewDirective,
        HeaderViewDirective,
        FooterViewDirective
    ],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    exports: [
        MufFeSharedCommonModule,
        HasAnyAuthorityDirective,
        EditViewDirective,
        CardViewDirective,
        ItemViewDirective,
        SimpleViewDirective,
        HeaderViewDirective,
        FooterViewDirective
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MufFeSharedModule {
    static forRoot() {
        return {
            ngModule: MufFeSharedModule
        };
    }
}
