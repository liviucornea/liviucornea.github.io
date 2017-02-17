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
var uploadService_1 = require("../../ReusableServices/uploadService");
var NgFileSelectDirective = (function () {
    function NgFileSelectDirective(el, uploader) {
        var _this = this;
        this.el = el;
        this.uploader = uploader;
        this.onUpload = new core_1.EventEmitter();
        this.files = [];
        setTimeout(function () {
            _this.uploader.setOptions(_this.options);
        });
        this.uploader._emitter.subscribe(function (data) {
            _this.onUpload.emit(data);
            if (data.done) {
                _this.files = _this.files.filter(function (f) { return f.name !== data.originalName; });
            }
        });
        setTimeout(function () {
            if (_this.events) {
                _this.events.subscribe(function (data) {
                    if (data === 'startUpload') {
                        _this.uploader.uploadFilesInQueue();
                    }
                });
            }
        });
    }
    Object.defineProperty(NgFileSelectDirective.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (value) {
            this._options = value;
            this.uploader.setOptions(this.options);
        },
        enumerable: true,
        configurable: true
    });
    NgFileSelectDirective.prototype.filterFilesByExtension = function () {
        var _this = this;
        var allowedExtensions = true;
        this.files = this.files.filter(function (f) {
            if (_this.uploader.options.allowedExtensions.indexOf(f.type) !== -1) {
                return true;
            }
            var ext = f.name.split('.').pop();
            if (_this.uploader.options.allowedExtensions.indexOf(ext) !== -1) {
                return true;
            }
            allowedExtensions = false;
            return false;
        });
        return (allowedExtensions);
    };
    NgFileSelectDirective.prototype.filterUploadSize = function () {
        var _this = this;
        var allowedMaxUploadSize = true;
        this.files = this.files.filter(function (f) {
            if (f.size > _this.uploader.options.maxUploadSize) {
                allowedMaxUploadSize = false;
                return false;
            }
            return true;
        });
        return (allowedMaxUploadSize);
    };
    NgFileSelectDirective.prototype.onChange = function () {
        this.files = Array.from(this.el.nativeElement.files);
        if ((this.files.length + this.uploader.queue.length) > this.uploader.options.maxUploads) {
            this.uploader.validateFileEventEmitter.emit("Too many files selected");
            return;
        }
        if (this.uploader.options.allowedExtensions.length) {
            if (!this.filterFilesByExtension()) {
                this.uploader.validateFileEventEmitter.emit("Incorrect file(s) type selected");
            }
        }
        if (!this.filterUploadSize()) {
            this.uploader.validateFileEventEmitter.emit("Uploaded file(s) size too big");
        }
        if (this.files.length) {
            this.uploader.addFilesToQueue(this.files);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NgFileSelectDirective.prototype, "events", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NgFileSelectDirective.prototype, "onUpload", void 0);
    __decorate([
        core_1.Input('options'), 
        __metadata('design:type', Object)
    ], NgFileSelectDirective.prototype, "options", null);
    __decorate([
        core_1.HostListener('change'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], NgFileSelectDirective.prototype, "onChange", null);
    NgFileSelectDirective = __decorate([
        core_1.Directive({
            selector: '[ngFileSelect]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, uploadService_1.Ng2Uploader])
    ], NgFileSelectDirective);
    return NgFileSelectDirective;
}());
exports.NgFileSelectDirective = NgFileSelectDirective;
//# sourceMappingURL=ng-file-select.js.map