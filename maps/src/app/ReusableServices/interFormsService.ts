import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class InterFormsService {

    public addEditDeleteMode: any;
    public columnInserted: EventEmitter<any>;
    public pageInserted: EventEmitter<any>;
    public formBuilderDeleteNotifier: EventEmitter<any>;
    public formBuilderEditNotifier: EventEmitter<any>;
    public formBuilderAddNotifier: EventEmitter<any>;
    public addEditCompleted: EventEmitter<any>;
    public currentThreeLevelChange: EventEmitter<any>;
    public treeViewInputArrived: EventEmitter<any>;
    public notifyUploadOptionsChange: Subject<any>;
    public notifyUploadInit: Subject<any>;
    public spinnerEmitter: Subject<any>;
    public themeEmitter: Subject<any>;
    public fontSizeEmitter: Subject<any>;

    mainModelName: string;
    treeViewApiResult: any;
    treeViewRuleConfig: any;
    inputControl: any;
    skipList: any;
    treeViewAddedFields: Array<string>;
    treeViewSummarySkipFields: Array<string>;
    currentConfigBuilderForm: any;
    currentTreeViewForm: any;

    constructor() {
        this.treeViewAddedFields = new Array<string>();
        this.treeViewSummarySkipFields = new Array<any>();
        this.columnInserted = new EventEmitter<any>();
        this.pageInserted = new EventEmitter<any>();
        this.formBuilderDeleteNotifier = new EventEmitter<any>();
        this.formBuilderEditNotifier = new EventEmitter<any>();
        this.formBuilderAddNotifier = new EventEmitter<any>();
        this.addEditCompleted = new EventEmitter<any>();
        this.currentThreeLevelChange = new EventEmitter<any>();
        this.treeViewInputArrived = new EventEmitter<any>();
        this.notifyUploadOptionsChange = new Subject();
        this.notifyUploadInit = new Subject();
        this.spinnerEmitter = new Subject();
        this.themeEmitter = new Subject();
        this.fontSizeEmitter = new Subject();
        this.buildTreeViewCleanupList();
    }

    public buildTreeViewCleanupList() {
        this.treeViewAddedFields.push('blockSequence');
        this.treeViewAddedFields.push('mainPageObject');
        this.treeViewAddedFields.push('config');
        this.treeViewAddedFields.push('model');
        this.treeViewAddedFields.push('nodeClass');
        this.treeViewAddedFields.push('indent');
        this.treeViewAddedFields.push('elementList');
        this.treeViewAddedFields.push('blankModel');
        this.treeViewAddedFields.push('blankModelConfig');
        this.treeViewAddedFields.push('modelName');
        this.treeViewAddedFields.push('level');
        this.treeViewAddedFields.push('expanded');
        this.treeViewAddedFields.push('summaryObject');
        this.treeViewAddedFields.push('viewDetail');
        this.treeViewAddedFields.push('editDetail');
        this.treeViewAddedFields.push('addDetail');
        for (let key in this.treeViewAddedFields) {
            this.treeViewSummarySkipFields.push(this.treeViewAddedFields[key]);
        }
    }

    public startSpinner(scope?: string, text?: string) {
        let spinner = {
            isSpinnerRunning: true,
            spinnerText: text,
            spinnerScope: scope
        };
        this.spinnerEmitter.next(spinner);
    }

    public stopSpinner() {
        let spinner = {
            isSpinnerRunning: false
        };
        this.spinnerEmitter.next(spinner);
    }

    public setTreeViewRuleConfig(ruleConfig: any) {
        this.treeViewRuleConfig = ruleConfig;
    }

    public getTreeViewRuleConfig(): any {
        return this.treeViewRuleConfig;
    }

    public setTreeViewApiResult(result: any) {
        this.treeViewApiResult = result;
    }

    public getTreeViewApiResult(): any {
        return this.treeViewApiResult;
    }

    public setMainModelName(modelName: string) {
        this.mainModelName = modelName;
    }

    public getMainModelName(): string {
        return this.mainModelName;
    }

    public cleanApi(mainObj) {
        this.deleteObjectProperties(mainObj);
        for (let colInd in mainObj) {
            let obj = mainObj[colInd];
            if (Object.prototype.toString.call(obj) === '[object Array]') {
                obj.forEach(x => this.cleanApi(x));
            }
            if (Object.prototype.toString.call(obj) === '[object Object]') {
                this.cleanApi(obj);
            }
        }
    }

    rebuildRootObject(input) {
        let modelName = this.getMainModelName();
        let mainObj = input[modelName];
        let rootobj = input[modelName][modelName][0];
        for (let colInd in mainObj) {
            let obj = mainObj[colInd];
            if (Object.prototype.toString.call(obj) !== '[object Array]') {
                mainObj[colInd] = rootobj[colInd];
            }
        }
        delete mainObj[modelName];
    }

    public deleteObjectProperties(input: any) {
        let inputObj = input;
        this.treeViewAddedFields.forEach(x => {
            delete inputObj[x];
        });
    }

    public injectSkipList(skipList: Array<any>) {
        skipList.forEach(x => {
            if (!this.treeViewSummarySkipFields.find(xx => xx === x)) {
                this.treeViewSummarySkipFields.push(x);
            }
        });
    }

    public cleanObjectForSummary(mainObj): any {
        this.deleteObjectPropertiesForSummary(mainObj);
        let cleanObj = Object.create(Object.prototype);
        for (let colInd in mainObj) {
            let obj = mainObj[colInd];
            let check = Object.prototype.toString.call(obj);
            if (Object.prototype.toString.call(obj) !== '[object Array]') {
                cleanObj[colInd] = mainObj[colInd];
            }
        }
        return cleanObj;
    }

    public deleteObjectPropertiesForSummary(input: any) {
        let inputObj = input;
        this.treeViewSummarySkipFields.forEach(x => {
            delete inputObj[x];
        });
    }

    public setCurrentForm(currentForm) {
        this.currentTreeViewForm = currentForm;
    }

    public closeCurrentlyOpenedForm() {
        if (this.currentTreeViewForm) {
            this.currentTreeViewForm.addDetail = false;
            this.currentTreeViewForm.editDetail = false;
        }
    }

    public assignControl(control) {
        this.inputControl = control;
    }

    public saveValueInControl(val) {
        this.inputControl.val = val;
    }

    public getSkipList() {
        return this.skipList;
    }

    public setSkipList(skipList: any) {
        this.skipList = skipList;
    }

    public setCurrentTreeLeve(level: number) {
        this.currentThreeLevelChange.emit(level);
    }

    public toggleTheme() {
        // emits when navbar toggles theme
        this.themeEmitter.next(true);
    }

    public adjustFontSize(change: number) {
        this.fontSizeEmitter.next(change);
    }
}
