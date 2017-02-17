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
var appSettingsService_1 = require('./appSettingsService');
var httpAbstract_1 = require('./httpAbstract');
var Subject_1 = require('rxjs/Subject');
var FileUploadItem = (function () {
    function FileUploadItem(uploader, id, originalName, fileName, size) {
        this.uploader = uploader;
        this.id = id;
        this.file = null;
        this.originalName = originalName;
        this.fileName = fileName;
        this.size = size;
        this.progress = 0;
        this.zone = new core_1.NgZone({ enableLongStackTrace: false });
        this.startTime = new Date().getTime();
        this.endTime = 0;
        this.speedAverage = 0;
        this.speedAverageHumanized = null;
        this.isUploading = false;
        this.isUploaded = false;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = false;
    }
    FileUploadItem.prototype.upload = function () {
        try {
            this.uploader.uploadFile(this);
        }
        catch (e) {
            this.uploader._onCompleteItem(this, {}, 0);
            this.uploader._onErrorItem(this, {}, 0);
        }
    };
    FileUploadItem.prototype.remove = function () {
        this.uploader.removeFromQueue(this);
    };
    FileUploadItem.prototype.onProgress = function (progress) {
        return { progress: progress };
    };
    FileUploadItem.prototype.onSuccess = function (response, status) {
        this.endTime = new Date().getTime();
        this.speedAverage = this.size / (this.endTime - this.startTime) * 1000;
        this.speedAverage = parseInt(this.speedAverage, 10);
        this.speedAverageHumanized = humanizeBytes(this.speedAverage);
        this.status = status;
        this.response = response;
        return { response: response, status: status };
    };
    FileUploadItem.prototype.onError = function (response, status) {
        return { response: response, status: status };
    };
    FileUploadItem.prototype.onComplete = function (response, status) {
        return { response: response, status: status };
    };
    FileUploadItem.prototype._onProgress = function (progress) {
        var _this = this;
        this.zone.run(function () {
            _this.progress = progress;
        });
        this.onProgress(progress);
    };
    FileUploadItem.prototype._onSuccess = function (response, status) {
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = true;
        this.isCancel = false;
        this.isError = false;
        this.progress = 100;
        this.onSuccess(response, status);
    };
    FileUploadItem.prototype._onError = function (response, status) {
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = true;
        this.progress = 0;
        this.onError(response, status);
    };
    FileUploadItem.prototype._onComplete = function (response, status) {
        this.onComplete(response, status);
    };
    return FileUploadItem;
}());
exports.FileUploadItem = FileUploadItem;
var Ng2Uploader = (function () {
    function Ng2Uploader(abstractHttp, appSettingsService) {
        this.abstractHttp = abstractHttp;
        this.appSettingsService = appSettingsService;
        this.contentType = 'application/json; charset=utf-8';
        this.base = this.appSettingsService.appSettings.apiSettings.apiURL_BASE + '/api/tdam/datahub/ae';
        this.fileUploadApiControllerUrl = '/files';
        this.method = 'POST';
        this.customHeaders = {};
        this.encodeHeaders = true;
        this.authTokenPrefix = 'Bearer';
        this.authToken = undefined;
        this.fieldName = 'file';
        this.queue = [];
        this.progress = 0;
        this.response = [];
        this._emitter = new core_1.EventEmitter();
        this._previewEmitter = new core_1.EventEmitter();
        this.validateFileEventEmitter = new core_1.EventEmitter();
        this.addRemoveFilesEventEmitter = new core_1.EventEmitter();
        this.notifyUploadComplete = new Subject_1.Subject();
        this.defaultOptions = {
            withCredentials: true,
            allowedExtensions: {},
            multiple: false,
            maxUploads: 10,
            maxUploadSize: 2147483648,
            data: { removeAfterUpload: true },
            autoUpload: false,
            fileName: null,
            folderPath: '/import',
            applicationID: null
        };
        this.options = {};
        this.httpAbs = abstractHttp;
        this.httpAbs.setBaseAddress(this.base);
        this.setOptions(this.defaultOptions);
    }
    Ng2Uploader.prototype.setOptions = function (opt) {
        this.options = {
            withCredentials: opt.withCredentials != null ? opt.withCredentials : this.options.withCredentials,
            allowedExtensions: opt.allowedExtensions != null ? opt.allowedExtensions : this.options.allowedExtensions,
            multiple: opt.multiple != null ? opt.multiple : this.options.multiple,
            maxUploads: opt.maxUploads != null ? opt.maxUploads : this.options.maxUploads,
            maxUploadSize: opt.maxUploadSize != null ? opt.maxUploadSize : this.options.maxUploadSize,
            data: opt.data != null ? opt.data : this.options.data,
            autoUpload: opt.autoUpload != null ? opt.autoUpload : this.options.autoUpload,
            fileName: opt.fileName != null ? opt.fileName : this.options.fileName,
            folderPath: opt.folderPath != null ? opt.folderPath : this.options.folderPath,
            applicationID: opt.applicationID != null ? opt.applicationID : this.options.applicationID,
        };
    };
    Ng2Uploader.prototype.uploadFilesInQueue = function () {
        var _this = this;
        var newFiles = this.queue.filter(function (f) { return !f.isUploaded; });
        newFiles.forEach(function (f) {
            _this.uploadFile(f);
        });
    };
    ;
    Ng2Uploader.prototype.getReadyItems = function () {
        return this.queue
            .filter(function (item) { return (!item.isUploading); })
            .sort(function (item1, item2) { return item1.index - item2.index; });
    };
    Ng2Uploader.prototype.uploadFile = function (fileItem) {
        var _this = this;
        var index = this.getIndexOfItem(fileItem);
        var item = this.queue[index];
        item.isUploading = true;
        var xhr = new XMLHttpRequest();
        var form = new FormData();
        form.append(this.fieldName, item.file, item.fileName);
        Object.keys(this.options.data).forEach(function (k) {
            form.append(k, _this.options.data[k]);
        });
        xhr.upload.onprogress = function (event) {
            var progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
            _this._onProgressItem(fileItem, progress);
        };
        xhr.upload.onabort = function () {
            _this._onCompleteItem(fileItem, xhr.response, xhr.status);
        };
        xhr.upload.onerror = function () {
            _this._onErrorItem(item, xhr.response, xhr.status);
            _this._onCompleteItem(fileItem, xhr.response, xhr.status);
        };
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                var gist = _this._isSuccessCode(xhr.status) ? 'Success' : 'Error';
                var method = '_on' + gist + 'Item';
                _this[method](fileItem, xhr.response, xhr.status);
                _this._onCompleteItem(fileItem, xhr.response, xhr.status);
            }
        };
        var fileUploadParams = this.options.folderPath;
        if (this.options.applicationID) {
            fileUploadParams = fileUploadParams + '/' + this.options.applicationID;
        }
        xhr.open(this.method, this.httpAbs.baseUrl + this.fileUploadApiControllerUrl + fileUploadParams, true);
        xhr.withCredentials = this.options.withCredentials;
        if (this.customHeaders) {
            Object.keys(this.customHeaders).forEach(function (key) {
                xhr.setRequestHeader(key, _this.customHeaders[key]);
            });
        }
        if (this.authToken) {
            xhr.setRequestHeader('Authorization', this.authTokenPrefix + " " + this.authToken);
        }
        xhr.send(form);
    };
    Ng2Uploader.prototype._onCompleteItem = function (item, response, status) {
        item._onComplete(status, response);
        this.onCompleteItem(item, response, status);
        this.progress = this.getTotalProgress();
        if (this.getNotUploadedItems().length === 0) {
            var fileInfo = JSON.parse(response).fileInfo[0];
            this.notifyUploadComplete.next(fileInfo);
        }
    };
    Ng2Uploader.prototype._onErrorItem = function (item, response, status) {
        item._onError(response, status);
        this.onErrorItem(item, response, status);
    };
    Ng2Uploader.prototype.getTotalProgress = function (value) {
        if (value === void 0) { value = 0; }
        var notUploaded = this.getNotUploadedItems().length;
        var uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
        var ratio = (this.queue.length > 0) ? 100 / this.queue.length : 0;
        var current = value * ratio / 100;
        return Math.round(uploaded * ratio + current);
    };
    Ng2Uploader.prototype.addFilesToQueue = function (files) {
        var _this = this;
        var count = this.queue.length;
        files.forEach(function (file, i) {
            if (_this.isFile(file) && !_this.inQueue(file)) {
                var uploadingFile = new FileUploadItem(_this, _this.generateRandomIndex(), file.name, _this.options.fileName != null ? _this.options.fileName : file.name, file.size);
                uploadingFile.file = file;
                _this.queue.push(uploadingFile);
                _this._onAfterAddingFile(uploadingFile);
            }
        });
        this.addRemoveFilesEventEmitter.emit();
        if (this.queue.length !== count) {
            this.progress = this.getTotalProgress();
        }
        if (this.options.autoUpload) {
            this.uploadFilesInQueue();
        }
    };
    Ng2Uploader.prototype.removeFromQueue = function (item) {
        var fileInfo = JSON.parse(item.response).fileInfo[0];
        return this.httpAbs.removeBulkRecords(this.fileUploadApiControllerUrl + '/remove', JSON.stringify(fileInfo), '', this.contentType);
    };
    Ng2Uploader.prototype.clearQueue = function () {
        var _this = this;
        var apiParams = [];
        this.queue.forEach(function (item) {
            if (item.isUploaded && item.response) {
                var fileInfo = JSON.parse(item.response).fileInfo[0];
                apiParams.push({
                    url: _this.fileUploadApiControllerUrl + '/remove',
                    headerKey: JSON.stringify(fileInfo), headerValue: ''
                });
            }
        });
        if (apiParams.length > 0) {
            return this.httpAbs.removeMultiple(apiParams, this.contentType);
        }
        else {
            return '';
        }
    };
    Ng2Uploader.prototype.getIndexOfItem = function (item) {
        return typeof item === 'number' ? item : this.queue.indexOf(item);
    };
    Ng2Uploader.prototype.getNotUploadedItems = function () {
        return this.queue.filter(function (item) { return !item.isUploaded; });
    };
    Ng2Uploader.prototype.inQueue = function (file) {
        var fileInQueue = this.queue.filter(function (f) { return f === file; });
        return fileInQueue.length ? true : false;
    };
    Ng2Uploader.prototype.isFile = function (file) {
        return file !== null && (file instanceof Blob || (file.name && file.size));
    };
    Ng2Uploader.prototype.generateRandomIndex = function () {
        return Math.random().toString(36).substring(7);
    };
    Ng2Uploader.prototype.onProgressItem = function (fileItem, progress) {
        return { fileItem: fileItem, progress: progress };
    };
    Ng2Uploader.prototype.onProgressAll = function (progress) {
        return { progress: progress };
    };
    Ng2Uploader.prototype.onSuccessItem = function (item, response, status) {
        return { item: item, response: response, status: status };
    };
    Ng2Uploader.prototype.onErrorItem = function (item, response, status) {
        return { item: item, response: response, status: status };
    };
    Ng2Uploader.prototype.onCompleteItem = function (item, response, status) {
        return { item: item, response: response, status: status };
    };
    Ng2Uploader.prototype.onAfterAddingFile = function (item) {
        return { item: item };
    };
    Ng2Uploader.prototype._isSuccessCode = function (status) {
        return (status >= 200 && status < 300) || status === 304;
    };
    Ng2Uploader.prototype._onProgressItem = function (item, progress) {
        var total = this.getTotalProgress(progress);
        this.progress = total;
        item._onProgress(progress);
        this.onProgressItem(item, progress);
        this.onProgressAll(total);
    };
    Ng2Uploader.prototype._onSuccessItem = function (item, response, status) {
        item._onSuccess(response, status);
        this.onSuccessItem(item, response, status);
    };
    Ng2Uploader.prototype._onAfterAddingFile = function (item) {
        this.onAfterAddingFile(item);
    };
    Ng2Uploader = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [httpAbstract_1.HttpAbstract, appSettingsService_1.AppSettingsService])
    ], Ng2Uploader);
    return Ng2Uploader;
}());
exports.Ng2Uploader = Ng2Uploader;
function humanizeBytes(bytes) {
    if (bytes === 0) {
        return '0 Byte';
    }
    var k = 1024;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i] + '/s';
}
//# sourceMappingURL=uploadService.js.map