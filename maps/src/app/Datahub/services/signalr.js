"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var connectionMsg = (function () {
    function connectionMsg(connectionID, message) {
        this.connectionID = connectionID;
        this.message = message;
    }
    return connectionMsg;
}());
exports.connectionMsg = connectionMsg;
var signalr = (function () {
    function signalr() {
        this.proxyName = 'TaskHub';
        this.hubUrl = 'http://localhost:15421/signalr'; //server @local
        this.stopConnection = false;
        this.connectionEstablished = new core_1.EventEmitter();
        this.connection = jQuery.hubConnection(this.hubUrl);
        this.proxy = this.connection.createHubProxy(this.proxyName);
        this.msgReceived = new core_1.EventEmitter();
        this.registerOnServerEvents();
        this.startConnection();
        this.keepConnected();
    }
    ;
    signalr.prototype.ngOnDestroy = function () {
        this.stopConnection = true;
        console.log('Cleaning up SignalR service...');
        this.connection.stop();
    };
    signalr.prototype.executeSchematic = function (id, userRuntimeValues) {
        if (userRuntimeValues === void 0) { userRuntimeValues = ""; }
        if (!this.connectionExists) {
            console.log('Reconnting...');
            this.startConnection();
        }
        console.log('Request to execute schematic id ' + id);
        this.proxy.invoke('Publish', 1, id, userRuntimeValues);
    };
    signalr.prototype.executePipeline = function (id, userRuntimeValues) {
        if (userRuntimeValues === void 0) { userRuntimeValues = ""; }
        if (!this.connectionExists) {
            console.log('Reconnting...');
            this.startConnection();
        }
        console.log('Request to execute pipleine id ' + id);
        this.proxy.invoke('Publish', 2, id, userRuntimeValues);
    };
    signalr.prototype.registerOnServerEvents = function () {
        var _this = this;
        this.proxy.on('broadcastMessage', function (data) {
            console.log('Message from SignalR server: ' + data);
            _this.msgReceived.emit(data);
        });
    };
    signalr.prototype.startConnection = function () {
        var _this = this;
        this.connection.start().done(function (data) {
            console.log(_this.getTime() + ' Now connected ' + data.transport.name + ', connection ID = ' + data.id);
            _this.tryingToReconnect = false;
            _this.connectionID = data.id;
            _this.connectionExists = true;
            _this.connectionEstablished.emit(new connectionMsg(_this.connectionID, ""));
            _this.proxy.invoke('RegisterExecPage');
            console.log('ExecPage registered...');
        }).fail(function (error) {
            console.log(_this.getTime() + ' Could not connect ' + error);
            _this.tryingToReconnect = false;
            _this.connectionID = "";
            _this.connectionExists = false;
            _this.connectionEstablished.emit(new connectionMsg(_this.connectionID, error));
        });
    };
    signalr.prototype.keepConnected = function () {
        var _this = this;
        this.connection.stateChanged(function (state) {
            //connection status changed
            var stateConversion = { 0: 'connecting', 1: 'connected', 2: 'reconnecting', 4: 'disconnected' };
            console.log('SignalR state changed from ' + stateConversion[state.oldState] + ' to ' + stateConversion[state.newState]);
            //if not connected, try to connect
            if (state.newState != 1 && !_this.tryingToReconnect && _this.stopConnection === false) {
                _this.connectionID = "";
                _this.connectionExists = false;
                _this.connectionEstablished.emit(new connectionMsg(_this.connectionID, "reconnecting ... " + new Date().toLocaleTimeString()));
                _this.tryingToReconnect = true;
                setTimeout(function () {
                    console.log(_this.getTime() + " reconnecting ...");
                    console.log(_this.getTime() + " stopConncton = " + _this.stopConnection);
                    _this.startConnection();
                }, 1000);
            }
        });
    };
    signalr.prototype.getTime = function () {
        return new Date().toLocaleTimeString();
    };
    signalr = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], signalr);
    return signalr;
}());
exports.signalr = signalr;
//# sourceMappingURL=signalr.js.map