/**
 * Created by noutaa2 on 6/30/2016.
 */
import {Component} from 'angular2/core';
import {FormBuilder} from "../../../ReusableComponents/formBuilder/formBuilder";
import {matrixService} from "../../../ReusableServices/matrixService";
import {ElementRef} from "angular2/core";
import {DynamicComponentLoader} from "angular2/core";

import {InterFormsService} from "../../../ReusableServices/interFormsService";
import {ViewChild} from "angular2/core";
import {treeViewApiMock} from "./treeViewApiMock";
import {treeViewMainConfig} from "./treeViewMainConfig";
import {FormBuilderTreeView} from "../../../ReusableComponents/formBuilderTreeView/formBuilderTreeView";

declare var tv4: any;
@Component({
    selector: 'login',
    templateUrl: 'app/Datahub/routes/treeViewBuilder/treeView.html',
    directives: [FormBuilder]

})
export class treeViewBuilder {

    dc:DynamicComponentLoader;
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

    //preview formbuilder related controls
    @ViewChild(FormBuilder)
    private formBuilderPreview:FormBuilder;
    private grandParentLevel = 0;
    private parentCSS:string;

    constructor(private vmMatrix: matrixService, private dcl: DynamicComponentLoader,private  elementRef: ElementRef) {
        this.dc=dcl;
        this.elemRef=elementRef;
        this.apiResult=treeViewApiMock;
        this.matrixService=vmMatrix;
        this.mainConfig=treeViewMainConfig;

        var result = this.matrixService.extractNodes(this.apiResult);
        this.children= result.filter(x=>x.type==='node');
        var mainPageObject=result.filter(x=>x.type==='leaf');
        var mainPageObjectArray=new Array<any>();

        mainPageObjectArray.push(mainPageObject[0].mainPageObject);

        this.mainPage=this.vmMatrix.extractMatrixNew(mainPageObject[0].modelName,mainPageObjectArray,this.mainConfig);
        this.mainHeader=this.vmMatrix.extractHeaderNew(mainPageObject[0].modelName,mainPageObjectArray,this.mainConfig);

        this.formData = this.vmMatrix.editMatrixNew(mainPageObject[0].modelName,this.mainPage[0].cells, this.mainHeader, this.mainConfig);

            this.dc.loadIntoLocation(FormBuilderTreeView, this.elemRef, "formBuilder").then((component) => {
                this.component=component;
                component.instance.formBuilderNotifier.subscribe((updateValue) => {
                    this.RefreshDataFromFormBuilder(updateValue.value)
                });
            });

      this.processChildren(this.children);
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
                var result = this.matrixService.extractNodes(newObject);
                var mainPageObject = result.filter(xx=>xx.type === 'leaf');
                var childrenList = result.filter(xx=>xx.type === 'node');
                var mainPageObjectArray = new Array<any>();
                mainPageObjectArray.push(mainPageObject[0].mainPageObject);
                var mainPage = this.vmMatrix.extractMatrixNew(mainPageObject[0].modelName,mainPageObjectArray, this.mainConfig);
                var mainHeader = this.vmMatrix.extractHeaderNew(mainPageObject[0].modelName,mainPageObjectArray, this.mainConfig);
                var formData = this.vmMatrix.editMatrixNew(mainPageObject[0].modelName,mainPage[0].cells, mainHeader, this.mainConfig);
                elem.config = this.mainConfig;
                elem.model = formData;
                elem.mainPageObject=mainPageObject;
                if (childrenList.length) {
                    elem.elementList = childrenList[0].elementList;
                }
                var grandChildren = result.filter(x=>x.type === 'node');

                if (grandChildren.length) {
                    this.grandParentLevel = this.grandParentLevel + 1;
                    grandChildren.forEach(z=> {
                        this.processChildren([z]);
                        // indentation: after recursion: take the immediate children and mark them to be indented
                        for (var element of z.elementList) {
                            console.log(element);
                            element.indent = this.grandParentLevel;
                        }
                        console.log("grandchildren: ");
                        console.log(z);
                    });
                    this.grandParentLevel = this.grandParentLevel - 1;

                }

                // set the nodeClass of this element to be the same as its parent by searching for the Model Name
                for (var defn of elem.config.Definitions ) {
                    if (defn.ModelName == modelName)  {
                        elem.nodeClass = defn.NodeClass;
                    }
                }
            }
        }
    }

    RefreshDataFromFormBuilder(updatedValue) {
        console.log(updatedValue);
        if (updatedValue === "cancel") {
            this.cancelClicked();
        }
        else {
            this.PageRefreshFromDynamicComponent(updatedValue);
        }
    }

    PageRefreshFromDynamicComponent(data) {
    }

    cancelClicked() {
    }

    showClicked(){
        this.formComponent=this.component;
        this.formComponent.instance.injectDataAndConfigAndChildren(this.formData,this.children,this.mainConfig,'configPage');
    }
}