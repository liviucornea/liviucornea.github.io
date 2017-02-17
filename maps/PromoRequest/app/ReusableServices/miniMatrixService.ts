import {Injectable, EventEmitter} from "angular2/core";
import {matrixService} from "./matrixService";

@Injectable()
export class MiniMatrixService {
    testData:any = {
        Countries: [
            {
                IsActive:false,
                Name: "TAIWAN",
                Shares: 10
            },
            {
                IsActive:false,
                Name: "India",
                Shares: 20
            }
        ],
        Sedol: [
            {
                IsActive:false,
                Number: 6640400,
                Shares: 45
            },
            {
                IsActive:false,
                Number: 885258,
                Shares: 95
            }]
    };
    testDataConfig:any = {
        correlationColumn:"IsActive",
            Countries:{
            ColumnConfiguration: [
                    {
                        "dbColumnName": "IsActive",
                        "htmlControlType": "checkbox",
                        "visibility": true,
                        "required": false,
                        "displayName": "TradeFlag",
                        "columnCss": "col-3",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": "",
                        "allowGridLevelEdit": true,
                    },
                    {
                        "dbColumnName": "Name",
                        "htmlControlType": "text",
                        "visibility": true,
                        "required": false,
                        "displayName": "Name",
                        "columnCss": "col-5",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": "",
                        "allowGridLevelEdit": true,
                    },
                    {
                        "dbColumnName": "Shares",
                        "htmlControlType": "number",
                        "visibility": true,
                        "required": false,
                        "displayName": "Id",
                        "columnCss": "col-5",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": "",
                        "allowGridLevelEdit": true,
                    }
                ]
            },
            Sedol: {
                ColumnConfiguration: [
                    {
                        "dbColumnName": "IsActive",
                        "htmlControlType": "checkbox",
                        "visibility": true,
                        "required": false,
                        "displayName": "TradeFlag",
                        "columnCss": "col-3",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": "",
                        "allowGridLevelEdit": true,
                    },
                    {
                        "dbColumnName": "Number",
                        "htmlControlType": "text",
                        "visibility": true,
                        "required": false,
                        "displayName": "Number",
                        "columnCss": "col-5",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": "",
                        "allowGridLevelEdit": true,
                    },
                    {
                        "dbColumnName": "Shares",
                        "htmlControlType": "number",
                        "visibility": true,
                        "required": false,
                        "displayName": "Shared",
                        "columnCss": "col-5",
                        "dataSourceAddress": undefined,
                        "dataSource": undefined,
                        "regex": "",
                        "allowGridLevelEdit": true,
                    }
                ]
            }
    };

    mService:matrixService;
    private sequence:number=0;
    private correlationObjectCollection:Array<any>;
    public pushEventToDirectivesEvent: EventEmitter<any>;

    constructor(matrix:matrixService) {
        this.mService = matrix;
        this.correlationObjectCollection= new Array<any>();
        this.mService.inputClickedEvent.subscribe(x=>{this.inputClicked(x)});
        this.pushEventToDirectivesEvent=new EventEmitter<any>();
    }

   public getConfigAndData():Array<any> {
        var result  = this.mService.extractMultiHeader(this.testData, this.testDataConfig)
        return result;
    }
   public getTestDataConfig():Array<any>{
        return this.testDataConfig;
    }

    public inputClicked(input){
        this.pushEventToDirectivesEvent.emit(input.row);
    }

    public partialCorrelation(directiveId, result){
        var match=this.correlationObjectCollection.find(x=>{return x.directiveId===directiveId});
        var correlationColumnName=this.testDataConfig.correlationColumn;
        if (match){
            var savedModelData=match.modelObj.cells.find(x=>{return x.name===correlationColumnName});
            if (savedModelData) {

                if (result.isAllTrue) {
                    savedModelData.val=true;
                }
                else {
                    savedModelData.val=false;
                }
            }
        }
    }

    public subscribeDirective(modelObject):any{
        this.sequence++;
        var directiveObj={
            clickCallback:new EventEmitter<any>(),
            partiallySelected:new EventEmitter<any>(),
            directiveId:this.sequence,
            modelObj:modelObject,
            configObj:this.testDataConfig,
        };
        this.correlationObjectCollection.push(directiveObj);
        return directiveObj;
    }
}