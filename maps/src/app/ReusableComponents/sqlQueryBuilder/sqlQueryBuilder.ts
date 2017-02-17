import {Component, Output,EventEmitter,Input} from "@angular/core";
import {HttpAbstract} from "../../ReusableServices/httpAbstract";
import {AlertService} from "../../ReusableServices/alertService";

@Component({
    selector: 'sql-query-builder',
    template: require("./sqlQueryBuilder.html"),
})

export class sqlQueryBuilder {
    httpProxy:HttpAbstract;
    newBase:string = '/schedules/';
    dayAttribs:any;
    alert:AlertService;
    dayAttributeLimits:Array<any>;
    attributesVM:Array<any>;
    pluginValue:string="";
    visiblePlugin:boolean=true;
    showValidation:boolean=false;
    enableInsert:boolean=false;
    @Output() outputNotifier = new EventEmitter();
    @Input('pluginInput') pluginInput: any;
    applicableDates:any;
    applicableDatesUI:Array<any>;
    isEmptyResult:boolean=false;
    disabledControles:any;

    constructor(private httpPrx:HttpAbstract, private alt:AlertService) {
        this.disableForm();
        this.httpProxy = httpPrx;
        this.alert = alt;
        this.getDaysAttributes();
    }

    ngOnInit() {
       this.pluginValue= this.pluginInput;
    }
    getDaysAttributes() {
        this.httpProxy.fetch(this.newBase+'dayattributeslimit').subscribe(
            res => {
                this.transformAttributes(res);
                this.cleanUp();

            },
            error => {
                this.alert.error("async error #" + error.status);
                this.enableForm();
            },
            () => {
            }
        );
    }

    getDaysAttributesValidation() {
        var fullPath=this.newBase+'getvaliddaysfordayattribute';
        var tt='{"LookupDaysWhereClause":"'+this.pluginValue+'"}';
        this.httpProxy.insertJson(fullPath,tt).subscribe(
            res => {
                if (res.DataTable.length === 0) {
                    this.enableInsert = false;
                    this.isEmptyResult = true;
                }
                else
                {
                    this.enableInsert = true;
                    this.isEmptyResult = false;
                    this.applicableDates = res.DataTable;
                    this.rebuildDates();
                }
            },
            error => {
                this.alert.error("async error #" + error.status);
                this.enableInsert=false;
            },
            () => {
            }
        );
    }

    rebuildDates(){
        var allDates=this.applicableDates;
        var newUI= new Array<any>();
        allDates.forEach(function(x){
            var tt=x.ApplicableDate.substring(0,10);
            var date=new Date(tt);
            newUI.push({"ApplicableDate":date});
        })
        this.applicableDatesUI=newUI;
    }


    transformAttributes(data){
        var vm=new Array<any>();
        var sequence:number=0;
        data.forEach(function (x) {
            vm.push(
                {
                    Id:sequence,
                    AttributeName: x.AttributeName.replace('[', '').replace(']', ''),
                    UpperLimit: x.UpperLimit,
                    LowerLimit: x.LowerLimit
                }
            )
        });
        this.attributesVM=vm;
    }

    cleanUp() {
    }

    disableForm() {
        var dsbControls = new Array<number>();
        var form:any = document.forms[0];
        var allElements=[].slice.call(form.elements);
        for (var element in allElements){
            var item = allElements[element];
            var isDisabled =item.disabled;
            if (isDisabled){
                dsbControls.push(item.id);
            }
            item.readOnly = 'true';
            item.disabled='true';
        };
        this.disabledControles=dsbControls;
    }

    enableForm() {
        var form:any = document.forms[0];
        var allElements = [].slice.call(form.elements);
        for (var element in allElements){
            var item = allElements[element];
            if (this.disabledControles.indexOf(item.id)===-1) {
                item.readOnly = false;
                item.disabled = false;
                item.enabled = true;
            }
        };
    }

    validateClicked(){
        this.getDaysAttributesValidation();
        this.showValidation=true;
    }

    insertClicked(){
        this.enableForm();
        this.outputNotifier.emit({
            value: this.pluginValue.replace("\n","")
        });
        this.enableInsert=false;
        this.showValidation=false;
        this.visiblePlugin=false;
    }

    resetClicked(){
        this.showValidation=false;
        this.pluginValue="";
        this.enableInsert=false;
    }

    cancelClicked(){
        this.enableForm();
        this.visiblePlugin=false;
        this.showValidation=false;
        this.enableInsert=false;
    }

    attributeClicked(attr){
        this.showValidation=false;
        if (this.pluginValue==="") {
            this.pluginValue = " "+attr.AttributeName + "=" + attr.LowerLimit
        }
        else{
            this.pluginValue = this.pluginValue+'\n'+" AND "+ attr.AttributeName + "=" + attr.LowerLimit;
        }

        this.enableInsert=false;
        this.showValidation=false;
    }

    textAreaClicked(){
        this.showValidation=false;
        this.enableInsert=false;
    }
}



