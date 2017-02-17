///<reference path='../typings/signalr/signalr.d.ts' />

import { Injectable, EventEmitter, OnDestroy } from 'angular2/core';

export class connectionMsg {
    constructor(public connectionID: string, public message: string) { }
}

@Injectable()
export class signalr implements OnDestroy {

    private proxy: HubProxy;
    private connection: HubConnection;
    private proxyName: string = 'TaskHub';
    private hubUrl = 'http://localhost:15421/signalr';
    //private hubUrl = 'http://wmaadvcp01pfo.tdbfg.com:15421/signalr';
    private tryingToReconnect: boolean;

    public connectionID: string;
    public connectionExists: boolean;
    public connectionEstablished: EventEmitter<any>;
    public msgReceived: EventEmitter<any>;

    constructor() {
        this.connectionEstablished = new EventEmitter();
        this.connection = jQuery.hubConnection(this.hubUrl);
        this.proxy = this.connection.createHubProxy(this.proxyName);
        this.msgReceived = new EventEmitter();

        this.registerOnServerEvents();

        this.startConnection();

        this.keepConnected();
    }

    ngOnDestroy() {
        console.log('Cleaning up SignalR service...');
        this.connection.stop();
    }

    public executeSchematic(id: string, userRuntimeValues: string = "") {
        if (!this.connectionExists) {
            console.log('Reconnting...');
            this.startConnection();
        }

        console.log('Request to execute schematic id ' + id);
        this.proxy.invoke('Publish', id, userRuntimeValues);
    }

    private registerOnServerEvents(): void {
        this.proxy.on('broadcastMessage', (data) => {
            console.log('Message from SignalR server: ' + data);
            this.msgReceived.emit(data);
        });
    }

    private startConnection(): void {
        this.connection.start().done((data) => {
            console.log(this.getTime() + ' Now connected ' + data.transport.name + ', connection ID = ' + data.id);

            this.tryingToReconnect = false;
            this.connectionID = data.id;
            this.connectionExists = true;
            this.connectionEstablished.emit(new connectionMsg(this.connectionID, ""));
        }).fail((error) => {
            console.log(this.getTime() + ' Could not connect ' + error);

            this.tryingToReconnect = false;
            this.connectionID = "";
            this.connectionExists = false;
            this.connectionEstablished.emit(new connectionMsg(this.connectionID, error));
        });
    }

    private keepConnected(): void {
        this.connection.stateChanged(
            (state: SignalRStateChange) => {
                //connection status changed
                var stateConversion = { 0: 'connecting', 1: 'connected', 2: 'reconnecting', 4: 'disconnected' };
                console.log('SignalR state changed from ' + stateConversion[state.oldState] + ' to ' + stateConversion[state.newState]);

                //if not connected, try to connect
                if (state.newState != 1 && !this.tryingToReconnect) {
                    this.connectionID = "";
                    this.connectionExists = false;
                    this.connectionEstablished.emit(new connectionMsg(this.connectionID, "reconnecting ... " + new Date().toLocaleTimeString()));
                    this.tryingToReconnect = true;

                    setTimeout(() => {
                        console.log(this.getTime() + " reconnecting ...");
                        this.startConnection();
                    }, 1000);
                }
            }
        );
    }

    private getTime(): string{
        return new Date().toLocaleTimeString();
    }
}
