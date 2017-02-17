import {AlertService} from "../../ReusableServices/alertService";
import {Component,Input} from "@angular/core";
import {MiniMatrixService} from "../../ReusableServices/miniMatrixService";


@Component({
    template: require("./miniGrid.html"),
    selector: 'miniGrid'
})

export class MiniGridComponenet {
    @Input() selectedRow:any;

    alertService:AlertService;
    vmMatrixService:MiniMatrixService;
    headersAndDataSets:Array<any>;
    headers:Array<any>;
    dataSets:Array<any>;
    gridSettings:any;
    partiallySelected:boolean;
    isAllFalse:boolean;
    isAllTrue:boolean;
    parentLine:any;
    correlatedColumnName:string;
    registery:any;

    constructor(alert:AlertService, vmMatrix:MiniMatrixService) {
        this.alertService = alert;
        this.vmMatrixService = vmMatrix;
        this.gridSettings = this.vmMatrixService.getTestDataConfig();
        this.headersAndDataSets = this.vmMatrixService.getConfigAndData();
        this.parentLine=this.selectedRow;
        this.vmMatrixService.pushEventToDirectivesEvent.subscribe(x=>{this.inputPushed(x)});
    }

    ngOnInit(){
        this.registery= this.vmMatrixService.subscribeDirective(this.selectedRow);
        //this.identification=registery.directiveId;
        this.correlatedColumnName=this.registery.configObj.correlationColumn;
        this.registery.clickCallback.subscribe(result=>this.markCells(result));
        this.markCells(this.selectedRow)
    }

    inputPushed(input:any){
        if (input.Id===this.registery.modelObj.Id){
            this.markCells(input);
        }
    }

    markCells(row){
        var correlatedColumnNameLocal=this.correlatedColumnName;
        var value=row.cells.find(x=>{return x.name===correlatedColumnNameLocal});
        if (value) {
            var data = this.headersAndDataSets;
            data.forEach(table=> {
                var dSet:any = table.dataSet;
                dSet.forEach(line=> {
                    var correlatedFiled = line.cells.find(x=> {
                        return x.name === correlatedColumnNameLocal
                    });
                    if (correlatedFiled) {
                        correlatedFiled.val = value.val;
                    }
                })
            });
        }
    }

    inputClicked(line){
        line.val=!line.val;
        this.checkAllCorrelations();
        this.vmMatrixService.partialCorrelation(this.registery.directiveId,{isAllTrue:this.isAllTrue, isAllFalse:this.isAllFalse});
    }

    checkAllCorrelations(){
        var correlatedColumnName=this.correlatedColumnName;
        var tempArray = new Array<any>();
        var result=true;
        var data=this.headersAndDataSets;
        data.forEach(table=>{
            var dSet:any = table.dataSet;
            dSet.forEach(line=>{
                var correlatedFiled= line.cells.find(x=>{return x.name===correlatedColumnName});
                if (correlatedFiled){
                   tempArray.push(correlatedFiled.val)
                }
            })
        });
        this.isAllFalse=tempArray.every(x=>x===false);
        this.isAllTrue=tempArray.every(x=>x===true);
    }
}


