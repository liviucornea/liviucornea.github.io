import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {matrixService} from "../../../ReusableServices/matrixService";
import {InterFormsService} from "../../../ReusableServices/interFormsService";
import {HttpAbstract} from "../../../ReusableServices/httpAbstract";
import {RuleService} from "../../../ReusableServices/ruleService";
import {NavigationService} from "../../../ReusableServices/navigationService";
import {ApiService} from "../../../ReusableServices/apiService";
import {AlertService} from "../../../ReusableServices/alertService";
import {_Score} from "../../../ReusableServices/rulesSource/_Score";
import {AppSettingsService} from "../../../ReusableServices/appSettingsService";
import {Subscription} from "rxjs";

declare var tv4: any;
@Component({
    selector: 'treeViewBuilder',
    template: require('./treeView.html')

})
export class TreeViewBuilder implements OnInit {

    elemRef: ElementRef;
    apiResult:any;
    config:any;
    matrixService:matrixService;
    formComponent:any;
    mainPage:any;
    mainHeader:any;
    formData:any;
    mainConfig:any;
    component:any;
    children:any;
    editAddClicked:boolean=true;
    interFormService:InterFormsService;
    httpProxy:HttpAbstract;
    private grandParentLevel = 0;
    private parentCSS:string;
    deletedObject:any;
    test:any;
    maintreeViewInput:any;
    ruleService:RuleService;
    ruleConfig:any;
    ruleErrors:Array<any>;
    showTreeViewdata:boolean = false;

    @Input()
    jsonConfig: any;
    @Input()
    treeViewApiUrl: string;

    //Observable variables
    private fbDeleteNotifierObservable: Subscription;
    private fbAddNotifierObservable: Subscription;
    private fbEditNotifierObservable: Subscription;
    private addEditCompletedObservable: Subscription;

    constructor(private ruleSrv:RuleService, private httpProx:HttpAbstract, private vmMatrix: matrixService, private interFormsService:InterFormsService
        , private navService: NavigationService, private alert: AlertService, private apiService: ApiService, private appSettingsService: AppSettingsService) {

        this.ruleService=ruleSrv;
        this.matrixService=vmMatrix;
        this.interFormService=interFormsService;
        this.httpProxy=httpProx;
    }


    ngOnInit()
    {
        this.mainConfig= this.jsonConfig;
        var dataSourceAddressTables = [];

        //Load all dropdown values here
        for(var index in this.mainConfig.Definitions)
        for (var key in this.mainConfig.Definitions[index]["ColumnDefinitions"]) {
            if (this.mainConfig.Definitions[index]["ColumnDefinitions"][key].dataSourceAddress) {
                dataSourceAddressTables.push(this.mainConfig.Definitions[index]["ColumnDefinitions"][key].dataSourceAddress.tableName);
            }
        }

        if(dataSourceAddressTables.length) {
            this.apiService.fetchMultipleList(dataSourceAddressTables).subscribe(
                res => {
                    // check if res in not an Array
                    var i: number = 0;
                    for (var jIndex in this.mainConfig.Definitions) {
                        for (var key in this.mainConfig.Definitions[jIndex]["ColumnDefinitions"]) {
                            if (this.mainConfig.Definitions[jIndex]["ColumnDefinitions"][key].dataSourceAddress) {
                                this.mainConfig.Definitions[jIndex]["ColumnDefinitions"][key].dataSource = res[i];
                                i++;
                            }
                        }
                    }
                    this.loadTreeViewData();
                }
                ,
                error => {
                    this.alert.error("Error in retrieving master data: async error #" + error.status);
                },
                () => {
                }
            );
        }
        else {
            this.loadTreeViewData();
        }
       // this.loadTreeViewData();
    }

    loadTreeViewData()
    {
        //this.mainConfig= this.jsonConfig;
        this.maintreeViewInput=Object.create(Object.prototype);
        this.maintreeViewInput.visiblePlugin=false;
        this.maintreeViewInput.gridSettings=this.mainConfig;
        this.maintreeViewInput.pluginInput=this.apiResult;
        this.ruleConfig = this.jsonConfig.RulesConfig;

        let deleteAddEditCb=this.deleteAddEditCalled;
        let deleteAddEditCompleteCb=this.deleteAddEditCallCompleted;;
        let that=this;

        this.fbDeleteNotifierObservable  = this.interFormService.formBuilderDeleteNotifier.subscribe(x=>{
            deleteAddEditCb(that);
        });

        this.fbAddNotifierObservable = this.interFormService.formBuilderAddNotifier.subscribe(x=>{
            deleteAddEditCb(that);
        });
        this.fbEditNotifierObservable = this.interFormService.formBuilderEditNotifier.subscribe(x=>{
            deleteAddEditCb(that);
        });

        this.addEditCompletedObservable = this.interFormService.addEditCompleted.subscribe(x=>{
            deleteAddEditCompleteCb(that);
        });

        this.getTreeViewdataFromApi(this);
    }


    getTreeViewdataFromApi(that)
    {
        that.httpProxy.fetch(that.treeViewApiUrl).subscribe((x)=> {
            if (x) {
                this.apiResult=JSON.parse(x);
                this.interFormService.setTreeViewApiResult(this.apiResult);
                this.interFormService.setTreeViewRuleConfig(this.ruleConfig);
                that.addRootAsArray(this.apiResult);
                that.loadTreeView(that, this.apiResult,true);
                this.ruleErrors=[];
                that.showClicked();
            }
        },
        error => {
            this.alert.error("Error in retrieving data: async error #" + error.status);
        },
        () => {
        });
    }

    addRootAsArray(obj:any){
        var newArray=new Array<any>();
        var newObj= Object.create(Object.prototype);
        var modelName= this.mainConfig.RootModel;
        var myObject=obj[modelName];
        for (var key in myObject){
            if (! _Score.isObject(myObject[key])){
                newObj[key]=myObject[key]
            }
        }
        newArray.push(newObj);
        myObject[modelName]=newArray;
    }


    ngOnDestroy()
    {
        this.fbDeleteNotifierObservable.unsubscribe();
        this.fbAddNotifierObservable.unsubscribe();
        this.fbEditNotifierObservable.unsubscribe();
        this.addEditCompletedObservable.unsubscribe();
    }

    loadTreeView(context, input,firstLoad){
        context.vmMatrix.resetTreeViewBlockCount();
        var finalResult:any=context.matrixService.extractNodes(input,context.mainConfig);
        var result = finalResult.treeArray;
        var skipList=finalResult.skipList;
        context.interFormService.setSkipList(skipList);
        context.children= result.filter(x=>x.type==='node');
        context.children.sort(context.sortByTabOrder);
        var mainPageObject=result.filter(x=>x.type==='leaf');
        var mainPageObjectArray=new Array<any>();
        mainPageObjectArray.push(mainPageObject[0].mainPageObject);
        context.mainPage=context.vmMatrix.extractMatrixNew(skipList,mainPageObject[0].modelName,mainPageObjectArray,context.mainConfig);
        context.mainHeader=context.vmMatrix.extractHeaderNew(skipList,mainPageObject[0].modelName,mainPageObjectArray,context.mainConfig);
        context.formData = context.vmMatrix.editMatrixNew(skipList,mainPageObject[0].modelName,context.mainPage[0].cells, context.mainHeader, context.mainConfig);
        context.processChildren(context.children);
    }

    sortByTabOrder(a, b) {
        if (a.tabOrder < b.tabOrder)
            return -1;
        if (a.tabOrder > b.tabOrder)
            return 1;
        return 0;
    }

    deleteAddEditCalled(context){
        var blank=new Array<any>()
        var opMode= context.interFormService.addEditDeleteMode;
        //context.component.instance.injectDataAndConfigAndChildren({data:blank, modelName:context.mainConfig.RootModel}, blank,context.mainConfig,"");
        if (opMode==="delete"){
            context.deleteAddEditCallCompleted(context);
        }
    }


    checkIfRulesSatisfied(context)
    {
        var finalResult = true;
        this.ruleErrors = [];
        if(this.ruleConfig) {
            this.ruleConfig.forEach(x=> {
                var ruleType = x.ruleType;
                var columnNames = x.ruleAssociates;
                var applicationMode = x.applyTo;
                var modelName = x.apiObject;
                var ruleValue = x.ruleValue;
                context.ruleService.clearExistingValidations();
                context.ruleService.associateRule(x, context);//ruleType, columnNames,ruleValue);
                var result = this.ruleService.validateRules(context.apiResult, modelName, ruleType, applicationMode);
                if (result.hasErrors || result.errorMessage.length) {
                    if(result.errorMessage) {
                        //this.ruleErrors.push();
                        result.errorMessage.forEach( x=> {
                            this.ruleErrors.push(x);
                        });
                        finalResult = false;
                    }
                    //this.showErrors = true;

                }
            });
        }
        return finalResult;

    }

    deleteAddEditCallCompleted(context){
        //if(context.checkIfRulesSatisfied(context)) {
            context.interFormService.cleanApi(context.apiResult);
            context.interFormService.rebuildRootObject(context.apiResult);
            context.httpProxy.insert(context.treeViewApiUrl, JSON.stringify(context.apiResult)).subscribe(
                res => {
                if (res) {
                    context.alert.addAlert(context.appSettingsService.appNotificationsMsg.saveConfirmedMsg);
                    context.getTreeViewdataFromApi(context);
                }
            },
                error =>{
                    this.alert.error("async error #" + error.status);
                },
                () => {

                }
            );
        //}
    }

    softDelete(inputObj){
        this.findDeletedObj(inputObj);
        if (this.deletedObject){
            this.removeObjectFromInput(inputObj)
        }
    }

    removeObjectFromInput(input){
        for (var colInd in input) {
            var obj=input[colInd];
            if( Object.prototype.toString.call(obj) === '[object Array]' ) {
                var index=obj.indexOf(this.deletedObject);
                if (index>-1){
                    obj.splice(index, 1);
                }
                else (this.removeObjectFromInput(obj))
            }
            if( Object.prototype.toString.call(obj) === '[object Object]' ) {
                this.removeObjectFromInput(obj)
            }
        }
    }

    findDeletedObj(input){
        var lookup=input.Action;
        if (lookup){
            if (lookup==="Deleted") {
                this.deletedObject=input;
            }
        }
        for (var colInd in input) {
            var obj=input[colInd];
            if( Object.prototype.toString.call(obj) === '[object Array]' ) {
                obj.forEach(x=>this.findDeletedObj(x));
            }
            if( Object.prototype.toString.call(obj) === '[object Object]' ) {
                this.findDeletedObj(obj)
            }
        }
    }

    processChildren(kids:Array<any>) {
        var children = kids;
        for (var child in children) {
            // x is a list of the children of every node that has children and is NOT the root node
            var x = children[child].elementList;
            var modelName = children[child].modelName;
            var newObject=Object.create(Object.prototype);
            for (var ele in x) {
                var elem = x[ele];
                newObject[modelName]= elem;
                var finalResult:any=this.matrixService.extractNodesLight(newObject);
                var result = finalResult.treeArray;
                var skipList=finalResult.skipList;
                var mainPageObject = result.filter(xx=>xx.type === 'leaf');
                var childrenList = result.filter(xx=>xx.type === 'node');
                var mainPageObjectArray = new Array<any>();
                mainPageObjectArray.push(mainPageObject[0].mainPageObject);
                var mainPage = this.vmMatrix.extractMatrixNew(skipList,mainPageObject[0].modelName,mainPageObjectArray, this.mainConfig);
                var mainHeader = this.vmMatrix.extractHeaderNew(skipList,mainPageObject[0].modelName,mainPageObjectArray, this.mainConfig);
                var formData = this.vmMatrix.editMatrixNew(skipList,mainPageObject[0].modelName,mainPage[0].cells, mainHeader, this.mainConfig);
                elem.config = this.mainConfig;
                elem.model = formData;
                elem.mainPageObject=mainPageObject;
                elem.expanded=mainPageObject[0].expanded;
                elem.level = mainPageObject[0].level;
                elem.childrenArrayList=[];
                if (childrenList.length) {
                    var objElem = Object.assign({}, elem);
                    objElem["config"]={};
                    objElem["mainPageObject"]=[];
                    objElem["model"]=[];
					
                    childrenList.sort(this.sortByTabOrder);

                    childrenList.forEach(x=>
                    {
                        var tempObj = Object.assign({}, objElem);
                        var k:any = {};
                        k['elementList'] = x.elementList;
                        k['blankModel'] = x.blankModel;
                        k['blankModelConfig'] = x.blankModelConfig;
                        k['modelName'] = x.modelName;
                        k['parentModelName'] = modelName;
                        k['parentModel'] = JSON.stringify(tempObj);
                        elem.childrenArrayList.push(k);
                    });
                    //elem.elementList = [];

                    /*elem.elementList = childrenList[0].elementList;
                    elem.blankModel=childrenList[0].blankModel;
                    elem.blankModelConfig=childrenList[0].blankModelConfig;
                    elem.modelName=childrenList[0].name;*/
                }
                elem.viewDetail=false;
                elem.editDetail=false;
                elem.addDetail=false;
                var summaryObject = JSON.parse(JSON.stringify(newObject));
                elem.summaryObject=this.prepareSummaryText(summaryObject,skipList);
                var grandChildren = result.filter(x=>x.type === 'node');
                if (grandChildren.length) {
                    grandChildren.forEach(z=> {
                        this.processChildren([z]);
                    });
                }
                for (var defn of elem.config.Definitions ) {
                    if (defn.ModelName == modelName)  {
                        elem.nodeClass = defn.NodeClass;
                    }
                }
            }
        }
    }

    prepareSummaryText(inputObject:any,skipList:Array<any>):any{
        var newString="";
        var modelName;
        var summaryObjectArray=new Array<any>();
        for (var colInd in inputObject) {
            modelName=colInd;
            var obj = inputObject[colInd];
            this.interFormService.injectSkipList(skipList);
            this.test=this.interFormService.cleanObjectForSummary(obj);
        }
        /* for (var ind in this.test){
         newString=newString+ind +': "'+this.test[ind]+'"'+","
         }*/
        var config = this.mainConfig.Definitions.find(x=> x.ModelName===modelName)

        for (var ind in this.test){
            if (config.ColumnDefinitions.find(x=>x.dbColumnName===ind).isPartOfSummary) {
                summaryObjectArray.push({lbl: ind, val: this.test[ind]})
            }
        }
        return summaryObjectArray;
    }

    showClicked(){
        this.showTreeViewdata = true;
        this.maintreeViewInput.visiblePlugin=true;
        this.maintreeViewInput.data=this.formData;
        this.maintreeViewInput.modelName=this.mainConfig.RootModel;
        this.maintreeViewInput.children=this.children;
        this.maintreeViewInput.mainConfig=this.mainConfig;
        this.maintreeViewInput.pageType='configPage';

        this.interFormService.treeViewInputArrived.emit(this.maintreeViewInput)
    }
}