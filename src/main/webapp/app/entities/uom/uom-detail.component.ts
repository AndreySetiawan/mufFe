import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUom } from 'app/shared/model/uom.model';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    selector: 'jhi-uom-detail',
    templateUrl: './uom-detail.component.html'
})
export class UomDetailComponent implements OnInit {
    uom: IUom;

    constructor(private activatedRoute: ActivatedRoute, private toastService: MessageService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ uom }) => {
            this.uom = uom;
        });
    }

    previousState() {
        window.history.back();
    }
}
