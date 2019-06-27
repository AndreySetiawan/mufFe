import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWorkType } from 'app/shared/model/work-type.model';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    selector: 'jhi-work-type-detail',
    templateUrl: './work-type-detail.component.html'
})
export class WorkTypeDetailComponent implements OnInit {
    workType: IWorkType;

    constructor(private activatedRoute: ActivatedRoute, private toastService: MessageService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ workType }) => {
            this.workType = workType;
        });
    }

    previousState() {
        window.history.back();
    }
}
