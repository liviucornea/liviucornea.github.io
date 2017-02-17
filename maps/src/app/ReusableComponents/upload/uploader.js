"use strict";
var core_1 = require("@angular/core");
var alertService_1 = require("../../ReusableServices/alertService");
var uploadService_1 = require("../../ReusableServices/uploadService");
var interFormsService_1 = require("../../ReusableServices/interFormsService");
var CustomUploader = (function () {
    function CustomUploader(alertSvc, uploaderSvc, intFormSvc) {
        this.alertSvc = alertSvc;
        this.uploaderSvc = uploaderSvc;
        this.intFormSvc = intFormSvc;
        this.multiple = false;
        this.disabled = false;
        this.autoUpload = false;
        this.alert = alertSvc;
        this.uploader = uploaderSvc;
        this.intFormService = intFormSvc;
    }
    Object.defineProperty(CustomUploader.prototype, "UploadOptions", {
        set: function (value) {
            if (value.hasOwnProperty("autoUpload")) {
                this.autoUpload = value.autoUpload;
            }
            if (value.hasOwnProperty("multiple")) {
                this.multiple = value.multiple;
            }
            if (value.hasOwnProperty("maxUploads")) {
                this.maxUploads = value.maxUploads;
            }
            this.options = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomUploader.prototype, "Disabled", {
        set: function (value) {
            this.disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    CustomUploader.prototype.ngOnInit = function () {
        var _this = this;
        this.uploader.queue = [];
        this.uploader.progress = 0;
        this.overwriteUploadOptionsSubscription = this.intFormService.notifyUploadOptionsChange.subscribe(function (options) {
            _this.UploadOptions = options;
        });
        this.initUploadSubscription = this.intFormService.notifyUploadInit.subscribe(function () {
            _this.uploader.clearQueue();
        });
        this.addRemoveFilesSubscription = this.uploader.addRemoveFilesEventEmitter.subscribe(function () {
            if (_this.uploader.queue.length >= _this.uploader.options.maxUploads) {
                _this.disabled = true;
            }
            else {
                _this.disabled = false;
            }
        });
        this.validateFileSubscription = this.uploader.validateFileEventEmitter.subscribe(function (message) {
            _this.disabled = false;
            _this.alert.addAlert(message);
        });
        this.uploader.onAfterAddingFile = (function (item) {
            if (_this.target)
                _this.target.value = '';
        });
    };
    CustomUploader.prototype.ngOnDestroy = function () {
        this.addRemoveFilesSubscription.unsubscribe();
        this.validateFileSubscription.unsubscribe();
        this.overwriteUploadOptionsSubscription.unsubscribe();
        this.initUploadSubscription.unsubscribe();
    };
    CustomUploader.prototype.onChange = function (event) {
        this.target = event.target || event.srcElement;
    };
    CustomUploader.prototype.deleteAllClicked = function () {
        var _this = this;
        this.uploader.clearQueue().subscribe(function (res) {
            _this.uploader.queue = [];
            _this.uploader.progress = 0;
            _this.uploader.notifyUploadComplete.next('incomplete');
        }, function (error) {
            _this.alert.error(" Error removing a file " + error.status);
        });
    };
    CustomUploader.prototype.inlineDeleteClicked = function (item) {
        var _this = this;
        if (item.isUploaded && item.response) {
            this.uploader.removeFromQueue(item).subscribe(function (res) {
                _this.removeItem(item);
            }, function (error) {
                _this.alert.error(" Error removing a file " + error.status);
            });
        }
        else {
            this.removeItem(item);
        }
    };
    CustomUploader.prototype.removeItem = function (item) {
        var index = this.uploader.getIndexOfItem(item);
        this.uploader.queue.splice(index, 1);
        if (this.uploader.queue.length >= this.uploader.options.maxUploads) {
            this.disabled = true;
        }
        else {
            this.disabled = false;
        }
        this.uploader.progress = this.uploader.getTotalProgress();
        this.uploader.notifyUploadComplete.next('incomplete');
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], CustomUploader.prototype, "UploadOptions", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], CustomUploader.prototype, "Disabled", null);
    CustomUploader = __decorate([
        core_1.Component({
            selector: 'customUploader',
            template: require('./uploader.html')
        }), 
        __metadata('design:paramtypes', [alertService_1.AlertService, uploadService_1.Ng2Uploader, interFormsService_1.InterFormsService])
    ], CustomUploader);
    return CustomUploader;
}());
exports.CustomUploader = CustomUploader;
//# sourceMappingURL=uploader.js.map