import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AccountService, Account } from 'app/core';
import { BaseWebSocketService } from 'app/shared/base/base-ws.service';

@Component({
    selector: 'jhi-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
    protected account: Account;
    protected stompClient: any;
    protected dataSubscriber;

    constructor(private accountService: AccountService, protected webSocket: BaseWebSocketService) {}

    ngOnInit() {
        this.accountService.identity().then(account => {
            this.account = account;
            this.connectWebSocket();
        });
    }

    ngOnDestroy() {
        this.webSocket.disconnect();
        this.dataSubscriber.unsubscribe();
    }

    ngAfterViewInit() {}

    connectWebSocket() {
        this.webSocket.connect();
        this.webSocket.connection.then(() => {
            this.stompClient = this.webSocket.stompClient;
            this.dataSubscriber = this.stompClient.subscribe('/topic/dashboard', item => {
                console.log('xxxxx dashboard', item.body);
            });
            this.sendData();
        });
    }

    sendData() {
        this.stompClient.send('/queu/dashboard', {}, {});
    }
}
