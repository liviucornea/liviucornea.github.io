import {Component, Input} from "@angular/core";
import {AlertService} from "../../ReusableServices/alertService";
import {Ng2Uploader} from "../../ReusableServices/uploadService";
import {Subscription} from "rxjs";
import {InterFormsService} from "../../ReusableServices/interFormsService";

@Component({
    selector: 'customUploader',
    template: require('./uploader.html')
})

export class CustomUploader {

    private options: any;
    private multiple: boolean = false;
    private disabled: boolean = false;
    private autoUpload: boolean = false;
    private maxUploads: number;

    alert:AlertService;
    uploader: Ng2Uploader;
    intFormService: InterFormsService;
    private target: any;

    private addRemoveFilesSubscription: Subscription;
    private validateFileSubscription: Subscription;
    private overwriteUploadOptionsSubscription: Subscription;
    private initUploadSubscription: Subscription;

    @Input() set UploadOptions (value: any) {

        if(value.hasOwnProperty("autoUpload")){
            this.autoUpload = value.autoUpload;
        }
        if(value.hasOwnProperty("multiple")){
            this.multiple = value.multiple;
        }
        if(value.hasOwnProperty("maxUploads")){
            this.maxUploads = value.maxUploads;
        }

        this.options = value;
    }

    @Input() set Disabled (value: any) {
        this.disabled = value;
    }
    constructor(private alertSvc: AlertService, private uploaderSvc: Ng2Uploader, private intFormSvc:InterFormsService) {
        this.alert = alertSvc;
        this.uploader = uploaderSvc;
        this.intFormService = intFormSvc;
    }

    ngOnInit(){

        this.uploader.queue = [];
        this.uploader.progress = 0;

        this.overwriteUploadOptionsSubscription = this.intFormService.notifyUploadOptionsChange.subscribe((options) => {
            this.UploadOptions = options;
        });

        this.initUploadSubscription = this.intFormService.notifyUploadInit.subscribe(() => {
            this.uploader.clearQueue();
        });

        this.addRemoveFilesSubscription = this.uploader.addRemoveFilesEventEmitter.subscribe(()=> {

            if(this.uploader.queue.length >= this.uploader.options.maxUploads){
                this.disabled = true;
            }
            else{
                this.disabled = false;
            }
        });

        this.validateFileSubscription = this.uploader.validateFileEventEmitter.subscribe((message)=> {
            this.disabled = false;
            this.alert.addAlert(message);
        });

        this.uploader.onAfterAddingFile = (item => {
            if (this.target) this.target.value = '';
        });
    }

    ngOnDestroy(): void {
        this.addRemoveFilesSubscription.unsubscribe();
        this.validateFileSubscription.unsubscribe();
        this.overwriteUploadOptionsSubscription.unsubscribe();
        this.initUploadSubscription.unsubscribe();
    }

    public onChange(event:any):void {
        this.target = event.target || event.srcElement;
    }

    deleteAllClicked(){
        this.uploader.clearQueue().subscribe(
            res=> {
                this.uploader.queue = [];
                this.uploader.progress = 0;
                this.uploader.notifyUploadComplete.next('incomplete');
            },
            error => {
                this.alert.error(" Error removing a file " + error.status);
            }
        );
    }

    inlineDeleteClicked(item){
        if(item.isUploaded  && item.response) {
            this.uploader.removeFromQueue(item).subscribe(
                res=> {
                    this.removeItem(item);
                },
                error => {
                    this.alert.error(" Error removing a file " + error.status);
                }
            );
        }
        else{
            this.removeItem(item);
        }
    }

    private removeItem(item){

        let index = this.uploader.getIndexOfItem(item);
        this.uploader.queue.splice(index, 1);

        if(this.uploader.queue.length >= this.uploader.options.maxUploads){
            this.disabled = true;
        }
        else{
            this.disabled = false;
        }

        this.uploader.progress = this.uploader.getTotalProgress();

        this.uploader.notifyUploadComplete.next('incomplete');
    }
}