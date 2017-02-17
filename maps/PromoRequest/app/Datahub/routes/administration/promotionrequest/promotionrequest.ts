import {Component, OnInit, OnDestroy} from 'angular2/core';
import {
    Promotion,
    Process,
    Workflow,
    promoStatuses,
    PromotionActiveItemList,
    PromotionGeneralItem,
    QAPromoEntry,
    UserPromoProfile,
    Implementer, Promoter, SystemUser,Reviewer, cboItems
} from './promotionrequestObjects';
import {SimpleWindowInput} from './tdamWindowInput';
import {PromotionList} from './promotionList/promotionList';
import {ApiService} from "../../../../ReusableServices/apiService";
import {AlertService} from "../../../../ReusableServices/alertService";
import {TdamWindowInputService, modalObject} from './tdamWindowInput.service';
import {PromotionRequestListService} from './promotionList/promotionListService';
import {PreAproval} from './preAproval/preApprovalTool';
import {PreAprovalService} from './preAproval/preAproval.service';
import {RadioControlValueAccessor} from "../../../../ReusableComponents/inputControls/radio_value_accessor";
import {TypeAhead} from "../../../../ReusableComponents/typeahead/typeahead";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {Response} from "angular2/http";
import {PromotionRequestUtilService} from './promotionRequestUtilService'

@Component({
    templateUrl: 'app/Datahub/routes/administration/promotionrequest/promotionrequest.html',
    directives: [PromotionList, SimpleWindowInput, PreAproval, RadioControlValueAccessor, TypeAhead],
    styleUrls: ["resources/Datahub/routes/administration/promotionrequest/promotionrequest.css"],
    providers: [TdamWindowInputService, PromotionRequestListService, PreAprovalService, PromotionRequestUtilService]
})

export class PromotionRequest implements OnInit, OnDestroy {
    allPromosList:PromotionGeneralItem[] = []; //this is list of all promotions and is intended to feed type ahead search
    promosList:Array<PromotionActiveItemList> = []; // this is list of active promos
    showModal:boolean = false;
    preAproval:boolean = false;
    objectForModal:modalObject;
    currentPromo:Promotion;
    currentPromoImplementer:Implementer;
    processesList:Array<Process> = [];
    processesDisplayList:Array<Process> = [];
    workflowsList:Array<Workflow> = [];
    workflowsDisplayList:Array<Workflow> = [];
    promoStatuses:Array<string> = promoStatuses;
    userLoginName:string;
    user:UserPromoProfile;
    implementers:Array<Implementer> = [];
    promoters:Array<Promoter> = [];
    qaEntry:QAPromoEntry;
    cboItemsSelection = cboItems;
    systemUsersList:SystemUser[] = [];
    forkSubscription:Subscription<any>;
    mainSubscription:Subscription<Response>;
    listSubscription:Subscription<any>;
    newPromoSubscription:Subscription<number>;
    statusFilter:string;
    public reviewers: Array<Reviewer> =[];
    autocompleteInput:any;


    constructor(private api:ApiService, private alert:AlertService, private windowInputService:TdamWindowInputService, private listService:PromotionRequestListService, private preAprovService:PreAprovalService, public utilService:PromotionRequestUtilService) {
    }

    ngOnInit() {
        var self = this;
        self.user = new UserPromoProfile();
        self.qaEntry = new QAPromoEntry();
        self.currentPromo = new Promotion(0);
        self.autocompleteInput = new Object();
        self.autocompleteInput.searchAllPromos = self.listService.searchAllPromos();
        self.mainSubscription = this.api.getAuthCurrentUser()
            .subscribe(
                response => {
                    self.userLoginName = response.Login;
                    const observ1 = self.api.getPromoAllSystemUsers();// get list of all users (you can use this to built it up for all if needed
                    const observ2 = self.api.getPromoRequestByLogin(self.userLoginName);
                    self.forkSubscription = Observable.forkJoin(observ1, observ2).subscribe(res => {
                        // get user profile (role)
                        self.user.userId = res[1].DataSet.Table[0].userID;
                        self.user.name = res[1].DataSet.Table[0].Name;
                        self.user.login = res[1].DataSet.Table[0].Login;
                        self.user.homeDir = res[1].DataSet.Table[0].HomeDir;
                        self.user.isImplementer = res[1].DataSet.Table[0].IsImplementer;
                        self.user.isQA = res[1].DataSet.Table[0].IsQA;
                        self.user.isSupport = res[1].DataSet.Table[0].isSupport;
                        self.user.isAdmin = res[1].DataSet.Table[0].isAdmin;
                        self.user.isQA = res[1].DataSet.Table[0].isQA;
                        self.user.isChecker = res[1].DataSet.Table[0].isChecker;
                        self.user.isReviewer = res[1].DataSet.Table[0].isReviewer;
                        self.user.isPromoter = res[1].DataSet.Table[0].isPromoter;
                        // get processes
                        for (let i = 0, j = res[1].DataSet.Table1.length; i < j; i++) {
                            self.processesList.push(new Process(res[1].DataSet.Table1[i].id, res[1].DataSet.Table1[i].processDesc));
                        }
                        ;
                        // get workflows
                        for (let i = 0, j = res[1].DataSet.Table2.length; i < j; i++) {
                            self.workflowsList.push(new Process(res[1].DataSet.Table2[i].id, res[1].DataSet.Table2[i].workflowDesc));
                        }
                        self.workflowsDisplayList = [...self.workflowsList];
                        self.processesDisplayList = [...self.processesList];
                        // note that promoters + implementers = system users
                        // get list of promoters
                        for (let i = 0, j = res[1].DataSet.Table4.length; i < j; i++) {
                            if (res[1].DataSet.Table4[i].PromoterID) {
                                let usrFromList = res[0].DataSet.Table.find(x=> {
                                    return x.Id == res[1].DataSet.Table4[i].PromoterID
                                })
                                self.systemUsersList.push(new SystemUser(usrFromList.Id, usrFromList.Name));
                                self.promoters.push(new Promoter(usrFromList.Id, usrFromList.Name));
                            }
                        }
                        // get list of implementers
                        for (let i = 0, j = res[1].DataSet.Table5.length; i < j; i++) {
                            if (res[1].DataSet.Table5[i].UserID) {
                                let usrFromList = res[0].DataSet.Table.find(x=> {
                                    return x.Id == res[1].DataSet.Table5[i].UserID
                                });
                                self.systemUsersList.push(new SystemUser(usrFromList.Id, usrFromList.Name));
                                self.implementers.push(new Implementer(usrFromList.Id, usrFromList.Name));
                            }
                        }
                        // get active promos list
                        for (let i = 0, j = res[1].DataSet.Table3.length; i < j; i++) {
                            let promoId = res[1].DataSet.Table3[i].promotionid;
                            var implementerId = res[1].DataSet.Table3[i].implementerId;
                            let promoItem = new PromotionActiveItemList(promoId);
                            promoItem.description = res[1].DataSet.Table3[i].Projectname;
                            promoItem.status = res[1].DataSet.Table3[i].status;
                            promoItem.implementerName = self.implementers.find(x=> x.id === implementerId).name;
                            self.promosList.push(promoItem);

                        }
                        /// get list of all promos (intended to be used for type ahead)
                        for (let i = 0, j = res[1].DataSet.Table6.length; i < j; i++) {
                            let promo = new PromotionGeneralItem(res[1].DataSet.Table6[i].ID, res[1].DataSet.Table6[i].Details);
                            self.allPromosList.push(promo);
                            self.listService.allPromosList.push(promo);
                        }
                        // get list of Reviewers
                        for (let i = 0, j = res[1].DataSet.Table7.length; i < j; i++) {
                            if (res[1].DataSet.Table7[i].ReviewerId) {
                                let usrFromList = res[0].DataSet.Table.find(x=> {
                                    return x.Id == res[1].DataSet.Table7[i].ReviewerId
                                });
                                self.utilService.reviewers.push(new Reviewer(usrFromList.Id, usrFromList.Name));
                            }
                        }


                        // self.getPromotionDetailById(self.promosList[0].id);
                        self.mainSubscription.unsubscribe();
                    });
                },
                error => {
                    console.log('Error getting initial data for promo page:${error}');
                });
        self.listSubscription = this.listService.outputValue$.subscribe(
            item => {
                if (item) {
                    self.getPromotionDetailById(item.id, false);
                }
                ;
            }
        );
        self.newPromoSubscription = this.listService.askToCreatePromo$.subscribe(
            item => {
                self.createNewPromo(item)
            });
        self.objectForModal = new modalObject('Description', 'nothing', true);

    }

    getPromotionDetailById(id:string, afterChanges?:boolean) {
        var self = this;
        self.qaEntry = new QAPromoEntry();
        self.workflowsDisplayList = [...self.workflowsList];
        self.processesDisplayList = [...self.processesList];
        self.utilService.resetVisibilityButtons();
        var promoDetSub = this.api.getPromoDetailByPromoId(id)
            .subscribe(res => {
                    // get promo details
                    self.currentPromo.id = res.DataSet.Table[0].ID;
                    self.currentPromo.promotionID = res.DataSet.Table[0].PromotionID;
                    self.currentPromo.projectNbr = res.DataSet.Table[0].ProjectNumber;
                    self.currentPromo.projectName = res.DataSet.Table[0].ProjectName;
                    self.currentPromo.projectType = res.DataSet.Table[0].ProjectType;
                    self.currentPromo.implementationType = res.DataSet.Table[0].ImplementationType;
                    self.currentPromo.status = res.DataSet.Table[0].Status;
                    self.currentPromo.promotionPath = res.DataSet.Table[0].PromotionPath;
                    self.currentPromo.implementerID = res.DataSet.Table[0].ImplementerID;
                    self.currentPromoImplementer = new Implementer(self.currentPromo.implementerID, self.implementers.find(x=> x.id === self.currentPromo.implementerID).name);
                    self.currentPromo.implementedDate = res.DataSet.Table[0].ImplementedDate;
                    self.currentPromo.promotedDate = res.DataSet.Table[0].PromotedDate;
                    self.currentPromo.keywords = res.DataSet.Table[0].KeyWords;
                    self.currentPromo.notifyEmailBiz = res.DataSet.Table[0].NotifyEmailBiz;
                    self.currentPromo.riskFactor = res.DataSet.Table[0].RiskFactor;
                    self.currentPromo.notifyEmail = res.DataSet.Table[0].NotifyEmail;
                    self.currentPromo.description = res.DataSet.Table[0].Description;
                    self.currentPromo.instruction = res.DataSet.Table[0].Instruction;
                    self.currentPromo.specialInstruction = res.DataSet.Table[0].SpecialInstruction;
                    self.currentPromo.promoterComments = res.DataSet.Table[0].Comments;
                    self.currentPromo.tested = res.DataSet.Table[0].Tested;
                    self.currentPromo.testLog = res.DataSet.Table[0].TestLog;
                    self.currentPromo.sql = res.DataSet.Table[0].SQL;
                    self.currentPromo.testCase = res.DataSet.Table[0].TestCase;
                    self.currentPromo.vss = res.DataSet.Table[0].VSS;
                    self.currentPromo.logsScreenShot = res.DataSet.Table[0].LogsScreenShots;
                    self.currentPromo.webConfig = res.DataSet.Table[0].WebConfig;
                    self.currentPromo.workflows = [];
                    self.currentPromo.processes = [];
                    // get promo workflow s
                    for (let i = 0, j = res.DataSet.Table1.length; i < j; i++) {
                        self.currentPromo.workflows.push(self.workflowsDisplayList.splice(self.workflowsDisplayList.findIndex(x=> x.id === res.DataSet.Table1[i].WorkFlowID), 1)[0]);
                    }
                    // get promo processes
                    for (let i = 0, j = res.DataSet.Table2.length; i < j; i++) {
                        self.currentPromo.processes.push(self.processesDisplayList.splice(self.processesDisplayList.findIndex(x=> x.id === res.DataSet.Table2[i].ProcessID), 1)[0]);
                    }
                    self.currentPromo.isNew = false;
                    // get qaEntry info
                    self.qaEntry.id = res.DataSet.Table3[0].ID;
                    self.qaEntry.implementationType = res.DataSet.Table3[0].ImplementationType;
                    self.qaEntry.promotionID = res.DataSet.Table3[0].PromotionID;
                    self.qaEntry.testCase = res.DataSet.Table3[0].TestCase;
                    self.qaEntry.logsScreenShot = res.DataSet.Table3[0].LogsScreenShots;
                    self.qaEntry.vss = res.DataSet.Table3[0].VSS;
                    self.qaEntry.vss = res.DataSet.Table3[0].SQL;
                    self.qaEntry.webConfig = res.DataSet.Table3[0].WebConfig;
                    self.qaEntry.descriptInstruct = res.DataSet.Table3[0].DescriptionInstruction;
                    self.qaEntry.approvalEmailFromPromoter = res.DataSet.Table3[0].ApprovalEmailFromPromoter;
                    self.qaEntry.others = res.DataSet.Table3[0].Others;
                    if (afterChanges) self.syncpromoListAfterChanges();
                    self.utilService.setButtons(self.currentPromo, self.user);
                    promoDetSub.unsubscribe();
                },
                error => {
                    console.log('error: ${error}');
                });

    }

    ngAfterViewInit() {
    }

    syncpromoListAfterChanges() {
        //self.currentPromo.status, self.currentPromo.promotionID
        var self = this;
        if (self.promosList.find(x => x.id == self.currentPromo.promotionID)) {
            var j = self.promosList.findIndex(x => x.id == self.currentPromo.promotionID);
            if (self.promosList[j].status != self.currentPromo.status) {
                self.promosList[j].status = self.currentPromo.status;
            }
        }else {
            // add the promo in left list if you just created a new one
            var itemPromoList = new PromotionActiveItemList(self.currentPromo.promotionID);
            itemPromoList.description = self.currentPromo.projectName;
            itemPromoList.status = self.currentPromo.status;
            itemPromoList.implementerName = self.implementers.find(x=> x.id === self.currentPromo.implementerID).name;
            self.promosList.push(itemPromoList);

        }

    }

    createNewPromo(id:number) {
        var self = this;
        self.currentPromoImplementer = new Implementer(self.user.userId, self.user.name);
        self.currentPromo = new Promotion(id);
        self.currentPromo.isNew = true;
        self.currentPromo.status = 0;
        self.currentPromo.implementedDate = new Date().toJSON().slice(0, 10);
        self.currentPromo.implementerID = self.currentPromoImplementer.id;
        self.workflowsDisplayList = [...self.workflowsList];
        self.processesDisplayList = [...self.processesList];
        self.utilService.setButtons(self.currentPromo, self.user);
    }

    typeAheadSelected(item:any) {
        this.currentPromo.promotionRefNbr = item.id;
    }


    doPreApproval() {
        var self = this;
        self.preAproval = true;
        let subscription = this.preAprovService.outputValue$.subscribe(
            item => {
                self.preAproval = false;
                subscription.unsubscribe();
            }
        );
    }

    doModal(param:string) {
        var self = this;
        switch (param) {
            case 'description':
                self.objectForModal.type = 'Description';
                self.objectForModal.value = self.currentPromo.description;
                break;
            case 'instruction':
                self.objectForModal.type = 'Instruction';
                self.objectForModal.value = self.currentPromo.instruction;
                break;
            case 'specialInstruction':
                self.objectForModal.type = 'Special Instruction';
                self.objectForModal.value = self.currentPromo.specialInstruction;
                break;
            case 'promoterComments':
                self.objectForModal.type = "Promoter's Comments";
                self.objectForModal.value = self.currentPromo.promoterComments;
                break;
            case 'testLog':
                self.objectForModal.type = "Test Log";
                self.objectForModal.value = self.currentPromo.testLog;
                break;
        }
        self.showModal = true;
        let subscription = this.windowInputService.outputValue$.subscribe(
            item => {
                if (item.toBeSaved) {
                    switch (param) {
                        case 'description':
                            self.currentPromo.description = item.value;
                            break;
                        case 'instruction':
                            self.currentPromo.instruction = item.value;
                            break;
                        case 'specialInstruction':
                            self.currentPromo.specialInstruction = item.value;
                            break;
                        case 'promoterComments':
                            self.currentPromo.promoterComments = item.value;
                            break;
                        case 'testLog':
                            self.currentPromo.testLog = item.value;
                            break;
                    }
                }
                ;
                self.showModal = false;
                subscription.unsubscribe();
            }
        );

    }

    moveProcessToImplemented(item:Process) {
        this.currentPromo.processes.push(this.processesDisplayList.splice(this.processesDisplayList.indexOf(item), 1)[0]);
        this.currentPromo.processes.sort((a, b) => {
            return Number(a.id) - Number(b.id)
        });
    }

    moveProcessToListed(item:Process) {
        this.processesDisplayList.push(this.currentPromo.processes.splice(this.currentPromo.processes.indexOf(item), 1)[0]);
        this.processesDisplayList.sort((a, b) => {
            return Number(a.id) - Number(b.id)
        });
    }

    allProcessesReset() {
        while (this.currentPromo.processes.length) this.processesDisplayList.push(this.currentPromo.processes.splice(0, 1)[0]);
        this.processesDisplayList.sort((a, b) => {
            return Number(a.id) - Number(b.id)
        });
    }

    moveWorkflowToImplemented(item:Workflow) {
        this.currentPromo.workflows.push(this.workflowsDisplayList.splice(this.workflowsDisplayList.indexOf(item), 1)[0]);
        this.currentPromo.workflows.sort((a, b) => {
            return Number(a.id) - Number(b.id)
        });
    }

    moveWorkflowToListed(item:Workflow) {
        this.workflowsDisplayList.push(this.currentPromo.workflows.splice(this.currentPromo.workflows.indexOf(item), 1)[0]);
        this.workflowsDisplayList.sort((a, b) => {
            return Number(a.id) - Number(b.id)
        });
    }

    allWorkflowReset() {
        while (this.currentPromo.workflows.length) this.workflowsDisplayList.push(this.currentPromo.workflows.splice(0, 1)[0]);
        this.workflowsDisplayList.sort((a, b) => {
            return Number(a.id) - Number(b.id)
        });
    }

    promoPath() {
      //  let pathToOpen = '';
       // window.open("file:///" + pathToOpen);
        this.copyToClipboard(this.currentPromo.promotionPath);
    }

    doSave(action?:string) {
        var self = this;
        var status = 1;
        if (action == "submit") status = 2;
        // let promoForAPI= self.promoToJSON(self.currentPromo);
        let promoForAPI = self.utilService.promoToJSON(self.currentPromo, self, status);

        //   alert(JSON.stringify(promoForAPI));
        if (self.currentPromo.isNew) {
            if (!self.doValidations('new')) return;
            // insert the promotion
            this.api.insertPromotion(promoForAPI)
                .subscribe(res => {
                        // get promo details searching by id just created and sync
                        self.getPromotionDetailById(res.PromotionID, true);
                        alert("promo is saved!!");
                    },
                    error => {
                        console.log('error: ${error}');
                    });
        } else {
            // update the promotion
            this.api.updatePromotion(promoForAPI)
                .subscribe(res => {
                        // get promo details searching by id just saved and sync
                        self.getPromotionDetailById(self.currentPromo.promotionID, true);
                        alert("promo is saved!!");
                    },
                    error => {
                        console.log('error: ${error}');
                    });


        }
    }

    doSubmit() {
        if (!this.doValidations('submit')) return;
        this.doSave('submit');
    }

    doValidations(action:string):boolean {
        var self = this;
        let promo = self.currentPromo;
        if (promo.implementationType == undefined || (promo.projectType == undefined) || !promo.projectName || !promo.promotionPath) {
            // alert("Required fields are not completed!");
            self.utilService.reqForNew = true;
            return false;
        }
        if (action == 'submit' && ( !promo.tested || !promo.sql || !promo.testCase || !promo.vss || !promo.logsScreenShot || !promo.webConfig || !promo.workflows || !promo.processes)) {
            self.utilService.reqForSubmit = true;
            alert(" SQL.... VSS fields are not completed!");
            return false;
        }

        return true;
    }
    copyToClipboard(text) {
        window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
    }


    ngOnDestroy() {
        this.forkSubscription.unsubscribe();
      //  this.mainSubscription.unsubscribe();
        this.listSubscription.unsubscribe();
        this.newPromoSubscription.unsubscribe();
    }
}