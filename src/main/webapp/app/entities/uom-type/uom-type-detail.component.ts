import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUomType } from 'app/shared/model/uom-type.model';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
    selector: 'jhi-uom-type-detail',
    templateUrl: './uom-type-detail.component.html'
})
export class UomTypeDetailComponent implements OnInit {
    uomType: IUomType;

    constructor(private activatedRoute: ActivatedRoute, private toastService: MessageService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ uomType }) => {
            this.uomType = uomType;
        });
    }

    previousState() {
        window.history.back();
    }
}
