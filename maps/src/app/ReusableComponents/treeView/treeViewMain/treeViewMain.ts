import {Component, Output, EventEmitter,ElementRef,Input} from "@angular/core";
import {AlertService} from "../../../ReusableServices/alertService";
import {InterFormsService} from "../../../ReusableServices/interFormsService";
import {matrixService} from "../../../ReusableServices/matrixService";
import {Subscription} from "rxjs";


@Component({
    template: require("./treeViewMain.html"),
    selector: 'treeViewMain'
})

export class treeViewMain {

    editAddClicked:boolean;
    alert:AlertService;
    pluginValue:string = "";
    showValidation:boolean = false;
    enableInsert:boolean = false;
    @Output() formBuilderNotifier = new EventEmitter();
    @Input() maintreeViewInput:any;
    isEmptyResult:boolean = false;
    editViewRowDataTable:Array<any>;
    PageType:string;
    elemRef:ElementRef;
    children:any;
    matrixService:matrixService;
    skipList:any;
    addEditObjectConfig:any;
    addEditObject:any;
    NodeClass:string;
    originalInput:any;
    mainModelName:any;
    isMainPageVisible:boolean;
    visiblePlugin:boolean;
    canAdd:boolean;
    private fbDeleteNotifierObservable: Subscription;
    private fbAddNotifierObservable: Subscription;
    private fbEditNotifierObservable: Subscription;
    private addEditCompletedObservable: Subscription;
    private treeViewInputArrivedObservable:Subscription;

    constructor(alert:AlertService, elementRef:ElementRef, private interFormService:InterFormsService,private vmMat: matrixService) {
        this.alert = alert;
        this.elemRef = elementRef;
        this.matrixService=vmMat;
        this.addEditObjectConfig={}
        this.addEditObject={};
        this.NodeClass="";
        this.editAddClicked=false;
        this.isMainPageVisible=true;
        this.canAdd=true;
        this.treeViewInputArrivedObservable = this.interFormService.treeViewInputArrived.subscribe(x=>
            this.injectDataAndConfigAndChildren(x));
    }

    ngOnInit() {
        if(this.maintreeViewInput) {
            this.editViewRowDataTable = this.maintreeViewInput.pluginInput;
        }
    }

    ngOnDestroy()
    {
        this.fbDeleteNotifierObservable.unsubscribe();
        this.fbAddNotifierObservable.unsubscribe();
        this.fbEditNotifierObservable.unsubscribe();
        this.addEditCompletedObservable.unsubscribe();
        this.treeViewInputArrivedObservable.unsubscribe();
    }

    deleteAddEditCalled(context:any,selectedRecord:any,op:string){
        switch (op){
            case "edit":
                context.editAddClicked=true;
                var modelName=selectedRecord.mainPageObject[0].modelName;
                context.pluginInput=selectedRecord.mainPageObject[0].blankModel;
                context.gridSettings=selectedRecord.mainPageObject[0].blankModelConfig;
                context.originalInput=selectedRecord;
                let target=selectedRecord;
                for (var dataKey in  context.pluginInput) {
                    var val =target[dataKey];
                    context.pluginInput[dataKey] = val;
                }
                var mainPageObjectArray=new Array<any>();
                mainPageObjectArray.push(context.pluginInput);
                var configObj=Object.create(Object.prototype);
                configObj["Definitions"]=new Array<any>();
                configObj["Definitions"].push({"ColumnDefinitions":context.gridSettings,"ModelName":modelName});
                var skipList=context.interFormService.getSkipList();
                var mainPage = context.matrixService.extractMatrixNew(skipList,modelName,mainPageObjectArray, configObj);
                var mainHeader = context.matrixService.extractHeaderNew(skipList,modelName,mainPageObjectArray, configObj);
                context.addEditObject = context.matrixService.editMatrixNew(skipList,modelName,mainPage[0].cells, mainHeader, configObj);
                break;
            case "add":
                context.editAddClicked=true;
                context.pluginInput=selectedRecord.blankModel;
                context.gridSettings=selectedRecord.blankModelConfig;
                context.originalInput=selectedRecord;
                var mainPageObjectArray=new Array<any>();
                mainPageObjectArray.push(selectedRecord.blankModel);
                var configObj=Object.create(Object.prototype);
                configObj["Definitions"]=new Array<any>();
                configObj["Definitions"].push({"ColumnDefinitions":selectedRecord.blankModelConfig,"ModelName":selectedRecord.modelName});
                var skipList=context.interFormService.getSkipList();
                var mainPage = context.matrixService.extractMatrixNew(skipList,selectedRecord.modelName,mainPageObjectArray, configObj);
                var mainHeader = context.matrixService.extractHeaderNew(skipList,selectedRecord.modelName,mainPageObjectArray, configObj);
                context.addEditObject = context.matrixService.editMatrixNew(skipList,selectedRecord.modelName,mainPage[0].cells, mainHeader, configObj);
                selectedRecord.addDetail=true;
                break;
            case "delete":
                break;
        }
    }

    setTreeViewVisibility(visibility){
        this.maintreeViewInput.visiblePlugin=visibility;
    }

    injectDataAndConfigAndChildren(input) {
        this.visiblePlugin=input.visiblePlugin;
        let deleteAddEditCb=this.deleteAddEditCalled;
        let kids=input.children;
        this.maintreeViewInput.gridSettings =input.mainConfig;
        this.PageType = input.pageType;
        this.editViewRowDataTable = input.data;


        this.mainModelName=input.modelName;
        this.interFormService.setMainModelName(this.mainModelName);
        this.children = input.children;
        this.PageType = input.pageType;
        let that=this;

        if(this.children && this.children.length > 0)
        {
            this.children.sort(function (a, b) {
                return a.TabOrder > b.TabOrder;
            });

            this.children.forEach(x=>{
                this.getChildRulesConfig(x);
            });
        }

        this.fbDeleteNotifierObservable = this.interFormService.formBuilderDeleteNotifier.subscribe(x=>{
            deleteAddEditCb(that,x,"delete");
        });

        this.fbAddNotifierObservable = this.interFormService.formBuilderAddNotifier.subscribe(x=>{
            deleteAddEditCb(that,x,"add");
        });

        this.fbEditNotifierObservable = this.interFormService.formBuilderEditNotifier.subscribe(x=>{
            // deleteAddEditCb(that, x,"edit");
        });

        this.addEditCompletedObservable = this.interFormService.addEditCompleted.subscribe(x=>{
            that.editAddClicked=false;
        });
        //show first tab by default
        if(this.children.length) {
            this.childClicked(this.children[0]);
        }
    }

    cancelClicked() {
        this.returnCallBack("cancel");
    }

    returnCallBack(returnData) {
        this.formBuilderNotifier.emit({
            value: returnData
        });
        this.maintreeViewInput.visiblePlugin = false;
    }

    childClicked(child) {
        this.isMainPageVisible=false;
        this.children.forEach((x)=>{
            x.visible=false;
            x.addDetail = false;
            x.elementList.forEach((e) => {
                e.editDetail = false;
                this.resetChildDetailMode(e);
            });
            x.activeClassChild=""
        });
        child.visible=true;
        child.activeClassChild = "active";

        this.canAdd=child.modelName!==this.interFormService.getMainModelName();
    }

    resetChildDetailMode(obj) {
        obj.childrenArrayList.forEach((c) => {
            c.addDetail = false;
            c.elementList.forEach((o) => {
                o.editDetail = false;
                this.resetChildDetailMode(o);
            });
        });
    }

    getChildRulesConfig(child)
    {
        if(child.childrenArrayList && child.childrenArrayList.length > 0)
        {
            child.childrenArrayList.forEach(x=>{
                if(x.elementList && x.elementList.length > 0)
                {
                    x.elementList.forEach(z=>{
                        z.childRulesConfig = this.maintreeViewInput.gridSettings.RulesConfig.filter
                        (p=>p.apiObject == z.mainPageObject[0].modelName);
                        if(!z.childRulesConfig)
                        {
                            z.childRulesConfig = [];
                        }
                        if(z.elementList && z.elementList.length)
                        {
                            this.getChildRulesConfig(z)
                        }
                    });
                }
            });
        }
        else {
            if (child.elementList && child.elementList.length > 0) {
                for (var i = 0; i < child.elementList.length; i++) {
                    child.elementList[i].childRulesConfig = this.maintreeViewInput.gridSettings.RulesConfig.filter
                    (p=>p.apiObject == child.elementList[i].mainPageObject[0].modelName);

                    if (!child.elementList[i].childRulesConfig) {
                        child.elementList[i].childRulesConfig = [];
                    }

                    if (child.elementList[i].elementList || (child.elementList[i].childrenArrayList && child.elementList[i].childrenArrayList.length > 0)) {
                        this.getChildRulesConfig(child.elementList[i]);
                    }

                }
            }
        }
    }

    showMainPage(){
        this.isMainPageVisible=true;
        this.children.forEach((x)=>{
            x.visible=false;
            x.activeClassChild=""
        });
    }

    addClicked(line){
        line.childRulesConfig = this.maintreeViewInput.gridSettings.RulesConfig.filter(p=>p.apiObject == line.modelName);
        if(!line.childRulesConfig)
        {
            line.childRulesConfig =[];
        }
        this.interFormService.closeCurrentlyOpenedForm();
        this.interFormService.addEditDeleteMode="add";
        this.interFormService.formBuilderAddNotifier.emit(line);
        this.interFormService.setCurrentForm(line);
    }
}
