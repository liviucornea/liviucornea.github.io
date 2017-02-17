import {Component, Injectable, EventEmitter} from 'angular2/core';
import {Promotion, PromotionActiveItemList, PromotionGeneralItem, UserPromoProfile, Reviewer} from "./promotionrequestObjects";
import {PromotionRequest} from "./promotionrequest"
@Injectable()
@Component({})
export class PromotionRequestUtilService {
    public outputValue$:EventEmitter<PromotionActiveItemList>;
    public askToCreatePromo$:EventEmitter<number>;
    public qaMessage:EventEmitter<number>;
    public allPromosList:PromotionGeneralItem[] = [];
    public reviewers: Array<Reviewer> =[];
    public btnValidate:boolean = false;
    public btnSave:boolean = false;
    public btnRemove:boolean = false;
    public btnSubmit:boolean = false;
    public btnPromote:boolean = false;
    public btnRollback:boolean = false;
    public btnNotify:boolean = false;
    public btnComplete:boolean = false;
    public btnVss:boolean = false;
    public reqForNew: boolean = false; public reqForSubmit: boolean = false;
    constructor() {
        this.outputValue$ = new EventEmitter();
        this.askToCreatePromo$ = new EventEmitter();
        this.qaMessage = new EventEmitter();
    }

    setButtons(promo:Promotion, user:UserPromoProfile) {
        var self = this;
        // show save,validate and submit if promo is not submitted
        if (promo.status < 2 && user.isImplementer) {
            self.btnSave = true;
            self.btnValidate = true;
            self.btnNotify = true;
            self.btnSubmit = true;
        }
        if (promo.status == 2 && user.isPromoter) {
            self.btnPromote = true;

        }
    }

    resetVisibilityButtons() {
        var self = this;
        self.btnValidate = false;
        self.btnSave = false;
        self.btnRemove = false;
        self.btnSubmit = false;
        self.btnPromote = false;
        self.btnRollback = false;
        self.btnNotify = false;
        self.btnComplete = false;
        self.btnVss = false;
        self.reqForNew = false;
        self.reqForSubmit = false;
    }
    promoToJSON(promo:Promotion, theParent:PromotionRequest, status:number):any {
        var self = this;
        var promoOut = {
            "User": theParent.user.login,
            "PromotionRefNumber": promo.promotionRefNbr ? promo.promotionRefNbr : "0",
            "ProjectName": promo.projectName,
            "ProjectNumber": promo.projectNbr,
            "ProjectType": promo.projectType,
            "ImplementationType": promo.implementationType,
            "Status": status,
            "ImplementerID": promo.implementerID,
            "PromoterID": promo.promoterId ? promo.promoterId : 0,
            "ImplementedDate": promo.implementedDate ? promo.implementedDate : '',
            "PromotedDate": promo.implementedDate ? promo.implementedDate : '',
            "PromotionPath": promo.promotionPath ? promo.promotionPath : '',
            "KeyWord": promo.keywords ? promo.keywords : '',
            "NotifyEmail": promo.notifyEmail ? promo.notifyEmail : '',
            "RiskFactor": promo.riskFactor ? promo.riskFactor : '',
            "Comment": promo.promoterComments ? promo.promoterComments : '',
            "Description": promo.description ? promo.description : '',
            "Instruction": promo.instruction ? promo.instruction : '',
            "SpecialInstruction": promo.specialInstruction ? promo.specialInstruction : '',
            "TestLog": promo.testLog ? promo.testLog : '',
            "Tested": promo.tested == undefined ? null : ( promo.tested ? 1 : 0 ),
            "TestCase": promo.testCase == undefined ? null : (promo.testCase ? 1 : 0),
            "LogsScreenShot": promo.logsScreenShot == undefined ? null : (promo.logsScreenShot ? 1 : 0),
            "VS": promo.vss == undefined ? null : (promo.vss ? 1 : 0),
            "SQL": (promo.sql == undefined ) ? null : (promo.sql ? 1 : 0),
            "WebConfig": (promo.webConfig == undefined) ? null : (promo.webConfig ? 1 : 0),
            "WorkflowID": self.arrayObjectsToString(promo.workflows),
            "ProcessID": self.arrayObjectsToString(promo.processes),
            "PromotionId": promo.promotionID
        };
        return promoOut;
    }


    arrayObjectsToString(input:Array<any>):string {
        if (input.length == 0) return '';
        let result = input[0].id;
        if (input.length == 1) return result;
        for (let i = 1, j = input.length; i < j; i++) {
            result += ',' + input[i].id;
        }
        return result;
    }


}
;
