import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IObjectSource } from 'app/shared/model/los/object-source.model';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    selector: 'jhi-object-source-detail',
    templateUrl: './object-source-detail.component.html'
})
export class ObjectSourceDetailComponent implements OnInit {
    objectSource: IObjectSource;

    constructor(protected dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute, private toastService: MessageService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ objectSource }) => {
            this.objectSource = objectSource;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
