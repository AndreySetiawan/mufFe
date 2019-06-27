import { Observable, Subscription } from 'rxjs';

import * as SockJS from 'sockjs-client';
import * as Stomp from 'webstomp-client';
import { WindowRef } from 'app/core/tracker/window.service';
import { Injectable } from '@angular/core';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

@Injectable({ providedIn: 'root' })
export class BaseWebSocketService {
    stompClient = null;
    connection: Promise<any>;
    connectedPromise: any;

    constructor(protected $window: WindowRef) {
        this.connection = this.createConnection();
    }

    buildClient(): any {
        // building absolute path so that websocket doesn't fail when deploying with a context path
        const loc = this.$window.nativeWindow.location;
        let urlApps;
        urlApps = '//' + loc.host + loc.pathname + 'websocket/message';
        const socket = new SockJS(urlApps);
        return Stomp.over(socket, { debug: DEBUG_INFO_ENABLED, heartbeat: false });
    }

    connect() {
        if (this.connectedPromise === null) {
            this.connection = this.createConnection();
        }
        this.stompClient = this.buildClient();
        const headers = {};
        this.stompClient.connect(
            headers,
            () => {
                this.connectedPromise('success');
                this.connectedPromise = null;
            }
        );
    }

    disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
            this.stompClient = null;
        }
    }

    private createConnection(): Promise<any> {
        return new Promise((resolve, reject) => (this.connectedPromise = resolve));
    }
}
