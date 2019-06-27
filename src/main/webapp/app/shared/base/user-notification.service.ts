import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Observer, Subscription } from 'rxjs';

import * as SockJS from 'sockjs-client';
import * as Stomp from 'webstomp-client';
import { WindowRef, CSRFService, AccountService } from 'app/core';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

@Injectable({ providedIn: 'root' })
export class UserNotificationService {
    stompClient = null;
    subscriber = null;
    connection: Promise<any>;
    connectedPromise: any;
    listener: Observable<any>;
    listenerObserver: Observer<any>;
    private subscription: Subscription;

    constructor(
        private router: Router,
        private $window: WindowRef,
        // tslint:disable-next-line: no-unused-variable
        private csrfService: CSRFService,
        protected accountService: AccountService
    ) {
        this.connection = this.createConnection();
        this.listener = this.createListener();
    }

    connect() {
        if (this.connectedPromise === null) {
            this.connection = this.createConnection();
        }
        // building absolute path so that websocket doesn't fail when deploying with a context path
        const loc = this.$window.nativeWindow.location;
        let url;
        url = '//' + loc.host + loc.pathname + 'websocket/ep';
        const socket = new SockJS(url);
        this.stompClient = Stomp.over(socket, { debug: DEBUG_INFO_ENABLED, heartbeat: false });
        const headers = {};
        this.stompClient.connect(
            headers,
            () => {
                this.connectedPromise('success');
                this.connectedPromise = null;
                this.sendNotification('Connected to system');
            }
        );
    }

    disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
            this.stompClient = null;
        }
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }

    receive() {
        return this.listener;
    }

    sendNotification(message: String) {
        if (this.stompClient !== null && this.stompClient.connected) {
            const headers = {
                userDestination: '/queue/notification',
                toUser: this.accountService.getUserLogin()
            };
            this.stompClient.send(
                '/queu/send-to-user"', // destination
                JSON.stringify({ message }),
                headers
            );
        }
    }

    subscribe() {
        this.connection.then(() => {
            this.subscriber = this.stompClient.subscribe('/user/queue/notification', data => {
                this.listenerObserver.next(JSON.parse(data.body));
            });
        });
    }

    unsubscribe() {
        if (this.subscriber !== null) {
            this.subscriber.unsubscribe();
        }
        this.listener = this.createListener();
    }

    private createListener(): Observable<any> {
        return new Observable(observer => {
            this.listenerObserver = observer;
        });
    }

    private createConnection(): Promise<any> {
        return new Promise((resolve, reject) => (this.connectedPromise = resolve));
    }
}
