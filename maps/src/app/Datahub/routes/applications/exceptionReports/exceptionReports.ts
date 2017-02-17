import {Component} from "@angular/core";
import {NavigationService} from "../../../../ReusableServices/navigationService";
import {CustomUploader} from "../../../../ReusableComponents/upload/uploader";

@Component({
    selector: 'exceptionReports',
    template: require('./exceptionReports.html')
})

export class ExceptionReports {
    uploadOptions: any = {};
    uploader: CustomUploader;

    constructor(private navService:NavigationService) {

        this.navService.getChildMenu(['Applications','ExceptionReports']);
        this.navService.getLeftMenuRoutes(['ExceptionReports']);
    }

    ngOnInit() {
        this.uploadOptions = {
            data:{databaseUpload: true, removeAfterUpload: false},
            allowedExtensions: ['txt', 'xlsx', 'xls'],
            multiple: true,
            maxUploadSize: 20000,
            maxUploads: 2,
            autoUpload: false
        };


    }

    setUploadOptions(){
        this.uploadOptions = {fileName: "New File Name.txt"};
    }

}