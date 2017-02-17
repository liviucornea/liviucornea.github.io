import { Injectable, EventEmitter, OnDestroy } from '@angular/core';
import {AppSettings} from "../../Configuration/appSettings";
import Proxy = SignalR.Hub.Proxy;
import Connection = SignalR.Hub.Connection;
import StateChanged = SignalR.StateChanged;
export class connectionMsg {
    constructor(public connectionID: string, public message: string) { }
}

@Injectable()
export class signalr implements  OnDestroy {

    private proxy: Proxy;
    private connection: Connection;
    private proxyName: string = 'TaskHub';
    private hubUrl = 'http://localhost:15421/signalr';                                      //server @local
    //private hubUrl = 'http://wmaadvcp01pfo.tdbfg.com:15421/signalr';                      //server @QA
    //private hubUrl = 'http://win2012r2-d4b5d.dynamic.wealth.cloud.td.com:5985/signalr';   //server @D2-TDBFG
    // private hubUrl = AppSettings.signalrEndPoint;                                         //production



    private tryingToReconnect: boolean;
    private stopConnection: boolean = false;

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
    };

    ngOnDestroy() {
        this.stopConnection = true;
        console.log('Cleaning up SignalR service...');
        this.connection.stop();
    }

    public executeSchematic(id: string, userRuntimeValues: string = "") {
        if (!this.connectionExists) {
            console.log('Reconnting...');
            this.startConnection();
        }

        console.log('Request to execute schematic id ' + id);
        this.proxy.invoke('Publish', 1, id, userRuntimeValues);
    }

    public executePipeline(id: string, userRuntimeValues: string = "") {
        if (!this.connectionExists) {
            console.log('Reconnting...');
            this.startConnection();
        }

        console.log('Request to execute pipleine id ' + id);
        this.proxy.invoke('Publish', 2, id, userRuntimeValues);
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
            this.proxy.invoke('RegisterExecPage');
            console.log('ExecPage registered...');
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
            (state: StateChanged) => {
                //connection status changed
                var stateConversion = { 0: 'connecting', 1: 'connected', 2: 'reconnecting', 4: 'disconnected' };
                console.log('SignalR state changed from ' + stateConversion[state.oldState] + ' to ' + stateConversion[state.newState]);

                //if not connected, try to connect
                if (state.newState != 1 && !this.tryingToReconnect && this.stopConnection === false) {
                    this.connectionID = "";
                    this.connectionExists = false;
                    this.connectionEstablished.emit(new connectionMsg(this.connectionID, "reconnecting ... " + new Date().toLocaleTimeString()));
                    this.tryingToReconnect = true;

                    setTimeout(() => {
                        console.log(this.getTime() + " reconnecting ...");
                        console.log(this.getTime() + " stopConncton = " + this.stopConnection);
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
