import {EventEmitter, Injectable, NgZone} from '@angular/core';
import {AppSettingsService} from "./appSettingsService";
import {HttpAbstract} from "./httpAbstract";
import {Subject} from "rxjs/Subject";

export class FileUploadItem {
    id: string;
    file:File;
    status: number;
    progress: number;
    originalName: string;
    fileName: string;
    size: number;
    response: string;
    startTime: number;
    endTime: number;
    speedAverage: number;
    speedAverageHumanized: string;
    isUploading:boolean;
    isUploaded:boolean;
    isSuccess:boolean;
    isCancel:boolean;
    isError:boolean;
    zone: NgZone;
    private uploader:Ng2Uploader;

    constructor(uploader:Ng2Uploader, id: string, originalName: string, fileName: string, size: number) {
        this.uploader = uploader;
        this.id = id;
        this.file = null;
        this.originalName = originalName;
        this.fileName = fileName,
            this.size = size;
        this.progress = 0;
        this.zone = new NgZone({ enableLongStackTrace: false });
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

    public upload():void {
        try {
            this.uploader.uploadFile(this);
        } catch (e) {
            this.uploader._onCompleteItem(this, {}, 0);
            this.uploader._onErrorItem(this, {}, 0);
        }
    }

    public remove() {
        this.uploader.removeFromQueue(this);
    }

    public onProgress(progress:number):any {
        return {progress};
    }

    public onSuccess(response:any, status:any):any {

        this.endTime = new Date().getTime();
        this.speedAverage = this.size / (this.endTime - this.startTime) * 1000;
        this.speedAverage = parseInt(<any>this.speedAverage, 10);
        this.speedAverageHumanized = humanizeBytes(this.speedAverage);
        this.status = status;
        this.response = response;
        return {response,status};
    }

    public onError(response:any, status:any):any {
        return {response,status};
    }

    public onComplete(response:any, status:any):any {
        return {response,status};
    }

    public _onProgress(progress:number):void {
        this.zone.run(() => {
            this.progress = progress;
        });
        this.onProgress(progress);
    }

    public _onSuccess(response:any, status:any):void {
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = true;
        this.isCancel = false;
        this.isError = false;
        this.progress = 100;
        this.onSuccess(response, status);
    }

    public _onError(response:any, status:any):void {
        this.isUploading = false;
        this.isUploaded = true;
        this.isSuccess = false;
        this.isCancel = false;
        this.isError = true;
        this.progress = 0;
        this.onError(response, status);
    }

    public _onComplete(response:any, status:any):void {
        this.onComplete(response, status);
    }
}

export interface FileUploaderOptions {
    withCredentials?: boolean;
    allowedExtensions?: any;
    multiple?: boolean;
    maxUploads?: number;
    maxUploadSize?: number;
    data?: { [index: string]: any };
    autoUpload?: boolean;
    fileName?: string;
    folderPath?: string;
    applicationID?: number;
}

@Injectable()
export class Ng2Uploader{
    httpAbs: HttpAbstract;
    contentType: string = 'application/json; charset=utf-8';
    base: string = this.appSettingsService.appSettings.apiSettings.apiURL_BASE + '/api/tdam/datahub/ae';
    fileUploadApiControllerUrl: string = '/files';

    method: string = 'POST';
    customHeaders: any = {};
    encodeHeaders: boolean = true;
    authTokenPrefix: string = 'Bearer';
    authToken: string = undefined;
    fieldName: string = 'file';
    queue: Array<any> = [];
    progress: number = 0;
    response: any[] = [];
    _emitter: EventEmitter<any> = new EventEmitter();
    _previewEmitter: EventEmitter<any> = new EventEmitter();
    validateFileEventEmitter: EventEmitter<any> = new EventEmitter();
    addRemoveFilesEventEmitter: EventEmitter<any> = new EventEmitter();
    notifyUploadComplete  = new Subject();

    defaultOptions:FileUploaderOptions = {
        withCredentials: true,
        allowedExtensions: {},
        multiple: false,
        maxUploads: 10,
        maxUploadSize: 2147483648,
        data: {removeAfterUpload: true},
        autoUpload: false,
        fileName: null,
        folderPath: "/import",
        applicationID: null
    };
    options: FileUploaderOptions = {};

    constructor(private abstractHttp:HttpAbstract, private appSettingsService: AppSettingsService) {
        this.httpAbs = abstractHttp;
        this.httpAbs.setBaseAddress(this.base);
        this.setOptions(this.defaultOptions);
    }

    setOptions(opt:FileUploaderOptions): void {
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
    }

    uploadFilesInQueue(): void {
        let newFiles = this.queue.filter((f) => { return !f.isUploaded ; });
        newFiles.forEach((f) => {
            this.uploadFile(f);
        });
    };

    public getReadyItems():Array<any> {
        return this.queue
            .filter((item:any) => (!item.isUploading))
            .sort((item1:any, item2:any) => item1.index - item2.index);
    }

    uploadFile(fileItem: any): void {

        let index = this.getIndexOfItem(fileItem);
        let item = this.queue[index];
        item.isUploading = true;

        let xhr = new XMLHttpRequest();
        let form = new FormData();

        form.append(this.fieldName, item.file, item.fileName);

        Object.keys(this.options.data).forEach(k => {
            form.append(k, this.options.data[k]);
        });

        xhr.upload.onprogress = (event:ProgressEvent) => {
            let progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
            this._onProgressItem(fileItem, progress);
        };

        xhr.upload.onabort = () => {
            this._onCompleteItem(fileItem, xhr.response, xhr.status);
        };

        xhr.upload.onerror = () => {
            this._onErrorItem(item, xhr.response, xhr.status);
            this._onCompleteItem(fileItem, xhr.response, xhr.status);
        };

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                let gist = this._isSuccessCode(xhr.status) ? 'Success' : 'Error';
                let method = '_on' + gist + 'Item';
                (this as any)[method](fileItem, xhr.response, xhr.status);
                this._onCompleteItem(fileItem, xhr.response, xhr.status);
            }
        };

        var fileUploadParams = this.options.folderPath;
        if(this.options.applicationID){
            fileUploadParams = fileUploadParams + "/" + this.options.applicationID;
        }

        xhr.open(this.method, this.httpAbs.baseUrl + this.fileUploadApiControllerUrl + fileUploadParams, true);
        xhr.withCredentials = this.options.withCredentials;

        if (this.customHeaders) {
            Object.keys(this.customHeaders).forEach((key) => {
                xhr.setRequestHeader(key, this.customHeaders[key]);
            });
        }

        if (this.authToken) {
            xhr.setRequestHeader('Authorization', `${this.authTokenPrefix} ${this.authToken}`);
        }

        xhr.send(form);
    }

    public _onCompleteItem(item:any, response:any, status:any):void {
        item._onComplete(status, response);
        this.onCompleteItem(item, response, status);
        this.progress = this.getTotalProgress();

        if (this.getNotUploadedItems().length == 0){
            var fileInfo = JSON.parse(response).fileInfo[0];
            this.notifyUploadComplete.next(fileInfo);
        }
    }

    public _onErrorItem(item:any, response:any, status:any):void {
        item._onError(response, status);
        this.onErrorItem(item, response, status);
    }

    private _isSuccessCode(status:any):boolean {
        return (status >= 200 && status < 300) || status === 304;
    }

    public getTotalProgress(value:number = 0):number {
        let notUploaded = this.getNotUploadedItems().length;
        let uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;

        let ratio = (this.queue.length > 0) ? 100 / this.queue.length : 0;
        let current = value * ratio / 100;
        return Math.round(uploaded * ratio + current);
    }

    addFilesToQueue(files: File[]): void {

        let count = this.queue.length;

        files.forEach((file: File, i: number) => {
            if (this.isFile(file) && !this.inQueue(file)) {

                let uploadingFile = new FileUploadItem(this,
                    this.generateRandomIndex(),
                    file.name,
                    this.options.fileName != null ? this.options.fileName : file.name,
                    file.size
                );

                uploadingFile.file = file;

                this.queue.push(uploadingFile);
                this._onAfterAddingFile(uploadingFile);
            }
        });

        this.addRemoveFilesEventEmitter.emit();

        if (this.queue.length !== count) {
            this.progress = this.getTotalProgress();
        }
        if (this.options.autoUpload) {
            this.uploadFilesInQueue();
        }
    }

    removeFromQueue(item: any) {

        var fileInfo = JSON.parse(item.response).fileInfo[0];

        return this.httpAbs.removeBulkRecords(this.fileUploadApiControllerUrl + '/remove'
            , JSON.stringify(fileInfo)
            , ''
            , this.contentType);
    }

    public clearQueue() {
        var apiParams = [];

        this.queue.forEach(item => {
            if(item.isUploaded && item.response) {
                let fileInfo = JSON.parse(item.response).fileInfo[0];
                apiParams.push({url: this.fileUploadApiControllerUrl + '/remove', headerKey: JSON.stringify(fileInfo), headerValue: ''});
            }
        });

        if(apiParams.length >0){
            return this.httpAbs.removeMultiple(apiParams, this.contentType);
        }
        else{
            return "";
        }
    }

    public getIndexOfItem(item:any):number {
        return typeof item === 'number' ? item : this.queue.indexOf(item);
    }

    getNotUploadedItems():Array<any> {
        return this.queue.filter((item:any) => !item.isUploaded);
    }

    inQueue(file: any): boolean {
        let fileInQueue = this.queue.filter((f) => { return f === file; });
        return fileInQueue.length ? true : false;
    }

    isFile(file: any): boolean {
        return file !== null && (file instanceof Blob || (file.name && file.size));
    }

    generateRandomIndex(): string {
        return Math.random().toString(36).substring(7);
    }

    public onProgressItem(fileItem:any, progress:any):any {
        return {fileItem, progress};
    }

    public onProgressAll(progress:any):any {
        return {progress};
    }

    public onSuccessItem(item:any, response:any, status:any):any {
        return {item, response, status};
    }

    public onErrorItem(item:any, response:any, status:any):any {
        return {item, response, status};
    }

    public onCompleteItem(item:any, response:any, status:any):any {
        return {item, response, status};
    }
    public onAfterAddingFile(item:any):any {
        return {item};
    }
    private _onProgressItem(item:any, progress:any):void {
        let total = this.getTotalProgress(progress);
        this.progress = total;
        item._onProgress(progress);
        this.onProgressItem(item, progress);
        this.onProgressAll(total);
    }

    private _onSuccessItem(item:any, response:any, status:any):void {
        item._onSuccess(response, status);
        this.onSuccessItem(item, response, status);
    }
    private _onAfterAddingFile(item:any):void {
        this.onAfterAddingFile(item);
    }

}

function humanizeBytes(bytes: number): string {
    if (bytes === 0) {
        return '0 Byte';
    }
    let k = 1024;
    const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    let i: number = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i] + '/s';
}