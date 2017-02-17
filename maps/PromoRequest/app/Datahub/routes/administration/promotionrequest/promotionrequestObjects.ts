export class Promotion {
    public status:number;
    public promotionID:string;
    public implementationType: string; //( 1 - Business ; 0 - Core)
    public projectType:string; // ( 0,1,2,3 - new, Enhancement, Emergency, Bug fix)
    public projectNbr:string;
    public projectName:string;
    public promotionPath: string;
    public promotionRefNbr: string;
    public implementerID:string;
    public promoterId: string;
    public implementedDate:string;
    public workflows: Array<Workflow> = [];
    public processes: Array<Process> = [];
    public keywords:string;
    public specialInstruction:string;
    public instruction:string;
    public promoterComments:string;
    public promotedDate : string;
    public notifyEmail: string;
    public notifyEmailBiz: string;
    public description:string;
    public tested:string;
    public testLog:string;
    public sql:string;
    public testCase:string;
    public webConfig:string;
    public logsScreenShot:string;
    public vss:string;
    public riskFactor: string;
    public isNew:boolean = false;

    constructor(public id:number) {

    }
}
export class PromotionActiveItemList {
    public description:string;
    public category:string;
    public status:number;
    public implementerName: string;
    public readyToBeCompleted:boolean = false;

    constructor(public id:string) {

    }
}
export class Process {
    constructor(public id:string, public description:string, public selected:boolean = true) {

    }
}
export class Workflow {
    constructor(public id:string, public description:string, public selected:boolean = true) {

    }
}
export class PreApprovalItem {
    public originatorID:string;
    public preApprovalItemId: string;
    public auditItem:string;
    public supportFiles:string[] = [];
    public riscFactor:string;
    public approvalStatus:boolean;
    public reviewerID:string;
    public messageFromOriginator:string;
    public messageFromReviewer:string;
    public message: string;
    public messagesList : Array<PreApprovalMessage>;
    constructor(public id:string) {
    };

}
// this array is used for editing promos or for listing active ones
export var promoStatuses:Array<string> = ['New', 'Saved', 'Submitted', 'Promoted', 'Notified', 'Completed'];
// this array is used for listing promos
export var promoStatusesListAll:Array<string> = ['', 'Saved', 'Submitted', 'Promoted', 'Notified', 'Completed', 'Rollback', 'Cancelled', 'Removed'];
/*
 export enum PromoStatuses { New = 0 , Saved = 1,  Submitted = 2, Promoted = 3, Notified = 4, Completed = 5
 }
 */
// object used for combo boxes
export var  cboItems: Array<any> = [{'value':false,'label':'N/A'},{'value':true,'label':'YES'}]

export class UserPromoProfile  {
    userId:string;
    name:string;
    login:string;
    homeDir:string;
    isImplementer:boolean;
    isPromoter:boolean;
    isQA:string;
    isSupport: boolean;
    isAdmin; boolean;
    isChecker: boolean;
    isReviewer: boolean;
}

export class QAPromoEntry {
    public id : string;
    public promotionID: string;
    public implementationType: string;
    public descriptInstruct:string;
    public testCase:string;
    public logsScreenShot:string;
    public vss:string;
    public sql:string;
    public webConfig:string;
    public approvalEmailFromPromoter:string;
    public requestEmailFromBuz: string;
    public notifyEmailToBuz: string;
    public others: string;
}
export class Implementer {
    constructor(public id : string, public name : string){}
}
export class Promoter {
     constructor(public id : string, public name : string){}
}
export class Reviewer {
    constructor(public id : string, public name : string){}
}

export class SystemUser {
    constructor(public id : string, public name : string){}
}
// bellow class is intended to be used for type ahead
export class PromotionGeneralItem {
    constructor(public id : string, public description : string){}
}
export class PreApprovalMessage {
    constructor(public User : string, public UserId : string, public Message: string){}
}