import {Component, Input, OnInit} from 'angular2/core';
import {AlertService} from "../../../../../ReusableServices/alertService";
import {PreAprovalService} from './preAproval.service';
import {PreApprovalItem, Promotion, UserPromoProfile, PreApprovalMessage} from '../promotionrequestObjects';
import {ApiService} from "../../../../../ReusableServices/apiService";
import {PromotionRequestUtilService} from '../promotionRequestUtilService'
@Component({
    templateUrl: "app/Datahub/routes/administration/promotionrequest/preAproval/preApproval.html",
    styleUrls: ["resources/Datahub/routes/administration/promotionrequest/promotionrequest.css"],
    selector: 'tdamPreAproval'
})
export class PreAproval implements OnInit {
    @Input('thePromo') currentPromo:Promotion;
    @Input('user') user: UserPromoProfile;
    currentItem:PreApprovalItem;
    preAprovedList:Array<PreApprovalItem> = [];
    active = true;
    showCurrentItem = false;
    fileToAdd: File;
    fileToAddName: string;

    constructor(private alert:AlertService, public outputService:PreAprovalService, private api:ApiService, public utilService: PromotionRequestUtilService ) {
    };

    ngOnInit() {
        var self = this;
        self.currentItem = new PreApprovalItem('0');
        // SQL statement : exec sp_PromotionGetPreapprovalDetails 23
        this.api.getPromoPreApprovalDetails(self.currentPromo.promotionID)
            .subscribe(res => {
                    // sort them first
                    res.DataSet.Table.sort((a, b) => {
                        return Number(a.PreApprovalItemID) - Number(b.PreApprovalItemID)
                    });
                    let supportFiles:Array<string> = [];
                    for (let i = 0, j = res.DataSet.Table.length; i < j; i++) {
                        let preApprovedItem = new PreApprovalItem(i.toString());
                        preApprovedItem.originatorID = res.DataSet.Table[i].OriginatorID;
                        preApprovedItem.preApprovalItemId = res.DataSet.Table[i].PreApprovalItemID;
                        preApprovedItem.auditItem = res.DataSet.Table[i].subject;
                        preApprovedItem.riscFactor = res.DataSet.Table[i].Riskfactor;
                        preApprovedItem.approvalStatus = res.DataSet.Table[i].Status ? res.DataSet.Table[i].Status : res.DataSet.Table[i].status;
                        preApprovedItem.reviewerID = res.DataSet.Table[i].ReviewerID;
                        supportFiles.push(res.DataSet.Table[i].SupportFile);
                        if ((i < j - 1 && (res.DataSet.Table[i].PreApprovalItemID != res.DataSet.Table[i + 1].PreApprovalItemID)) || i == j - 1) {
                            preApprovedItem.supportFiles = supportFiles;
                            self.preAprovedList.push(preApprovedItem);
                            supportFiles = [];
                        }
                   }
                    ;
                },
                error => {
                    console.log(`error: ${error}`);
                });

    }

    update() {
        var self = this;

        let preAprovalItemForAPI = {
            "PromotionID": self.currentPromo.promotionID,
            "PreApprovalItemID": self.currentItem.preApprovalItemId,
            "ReviewerID": self.currentItem.reviewerID,
            "RiskFactor": self.currentItem.riscFactor,
            "Status": self.currentItem.approvalStatus ? 1 : 0 ,
            "PostedBy": self.user.userId,
            "MsgFromOriginator": self.user.isImplementer ? self.currentItem.message : null ,
            "MsgFromReviewer": self.user.isReviewer ? self.currentItem.message : null,
            "SupportFile": self.currentItem.supportFiles.join(),
            "PreapprovalID": 0,
        };
      //  alert (JSON.stringify(preAprovalItemForAPI));

         this.api.insertPreApprovalItem(preAprovalItemForAPI)
         .subscribe(res => {
         // get promo details searching by id just created and sync
         alert("Preaproval item is saved is saved!!");
         },
         error => {
         console.log('error: ${error}');
         });


    }

    cancel() {
        this.outputService.outputValue$.emit(this.currentItem);
    }

    makeItCurrent(item) {
        this.showCurrentItem = true;
        this.currentItem = item;
        var self = this;
        // SQL statement : exec sp_PromotionGetPreapprovalDetails 23
        this.api.getPromoPreApprovalMsg(self.currentPromo.promotionID, item.preApprovalItemId)
            .subscribe(res => {
                    self.currentItem.messagesList = [];
                    for (let i = 0, j = res.DataSet.Table.length; i < j; i++) {
                        if (res.DataSet.Table[i].Message && res.DataSet.Table[i].Message.length > 0 ) {
                            let message = new PreApprovalMessage(res.DataSet.Table[i].User, res.DataSet.Table[i].UserID, res.DataSet.Table[i].Message);
                            self.currentItem.messagesList.push(message);
                        }
                    }
                    ;
                },
                error => {
                    console.log(`error: ${error}`);
                });

    }


    onChange(event) {
        this.fileToAdd = event.srcElement.files[0];
        this.fileToAddName = this.currentPromo.promotionPath + '\\Support\\' + this.fileToAdd.name ;
     }
    getFile(){
        if(this.currentItem.supportFiles.indexOf(this.fileToAddName) == -1  && this.fileToAddName) {
            this.currentItem.supportFiles.push(this.fileToAddName);
            this.fileToAddName = null;
            this.uploadFile(this.fileToAdd);
        }else{
            if(!this.fileToAddName){
                alert ("You must choose the file for uploading!");
                return;
            }
            alert ("File already exists!!");
        }
        (<HTMLInputElement>document.getElementById('fileInput')).value = null;
    }

    uploadFile(file:File):Promise<any> {
        return new Promise((resolve, reject) => {
            let formData = new FormData();
            formData.append("file", file, file.name);
            let xhr:XMLHttpRequest = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let result:any = <any>JSON.parse(xhr.response);
                        if (result)
                            resolve(result);
                    } else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.open("POST", "http://localhost:17752/api/tdam/datahub/ae/fileUpload");
            //          xhr.setRequestHeader("promoPath", "thePathStringHere");
            xhr.send(formData);

        });
    }

 fileRemove(fileName:string){
        this.currentItem.supportFiles.splice(this.currentItem.supportFiles.indexOf(fileName),1);
    }

}