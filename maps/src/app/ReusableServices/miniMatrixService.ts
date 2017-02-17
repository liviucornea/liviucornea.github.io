import { Injectable, EventEmitter } from '@angular/core';
import { matrixService } from './matrixService';


@Injectable()
export class MiniMatrixService {
    testData: any = {
        Countries: [
            {
                IsActive: false,
                Name: 'TAIWAN',
                Shares: 10
            },
            {
                IsActive: false,
                Name: 'India',
                Shares: 20
            }
        ],
        Sedol: [
            {
                IsActive: false,
                Number: 6640400,
                Shares: 45
            },
            {
                IsActive: false,
                Number: 885258,
                Shares: 95
            }]
    };
    testDataConfig: any = {
        correlationColumn: 'IsActive',
        Countries: {
            ColumnConfiguration: [
                {
                    'dbColumnName': 'IsActive',
                    'htmlControlType': 'checkbox',
                    'isVisible': true,
                    'isRequired': false,
                    'displayName': 'TradeFlag',
                    'dataSourceAddress': undefined,
                    'dataSource': undefined,
                    'regex': '',
                    'isAllowGridLevelEdit': true,
                    'columnFormat': { format: 'font-awesome', pattern: { false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg' } }
                },
                {
                    'dbColumnName': 'Name',
                    'htmlControlType': 'text',
                    'isVisible': true,
                    'isRequired': false,
                    'displayName': 'Name',
                    'dataSourceAddress': undefined,
                    'dataSource': undefined,
                    'regex': '',
                    'isAllowGridLevelEdit': true,
                },
                {
                    'dbColumnName': 'Shares',
                    'htmlControlType': 'number',
                    'isVisible': true,
                    'isRequired': false,
                    'displayName': 'Id',
                    'dataSourceAddress': undefined,
                    'dataSource': undefined,
                    'regex': '',
                    'isAllowGridLevelEdit': true,
                }
            ]
        },
        Sedol: {
            ColumnConfiguration: [
                {
                    'dbColumnName': 'IsActive',
                    'htmlControlType': 'checkbox',
                    'isVisible': true,
                    'isRequired': false,
                    'displayName': 'TradeFlag',
                    'dataSourceAddress': undefined,
                    'dataSource': undefined,
                    'regex': '',
                    'isAllowGridLevelEdit': true,
                    'columnFormat': { format: 'font-awesome', pattern: { false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg' } }
                },
                {
                    'dbColumnName': 'Number',
                    'htmlControlType': 'text',
                    'isVisible': true,
                    'isRequired': false,
                    'displayName': 'Number',
                    'dataSourceAddress': undefined,
                    'dataSource': undefined,
                    'regex': '',
                    'isAllowGridLevelEdit': true,
                },
                {
                    'dbColumnName': 'Shares',
                    'htmlControlType': 'number',
                    'isVisible': true,
                    'isRequired': false,
                    'displayName': 'Shared',
                    'dataSourceAddress': undefined,
                    'dataSource': undefined,
                    'regex': '',
                    'isAllowGridLevelEdit': true,
                }
            ]
        }
    };

    mService: matrixService;
    public pushEventToDirectivesEvent: EventEmitter<any>;
    private sequence: number = 0;
    private correlationObjectCollection: Array<any>;

    constructor(matrix: matrixService) {
        this.mService = matrix;
        this.correlationObjectCollection = new Array<any>();
        this.mService.inputClickedEvent.subscribe(x => { this.inputClicked(x); });
        this.pushEventToDirectivesEvent = new EventEmitter<any>();
    }

    public getConfigAndData(): Array<any> {
        let result = this.mService.extractMultiHeader(this.testData, this.testDataConfig);
        return result;
    }
    public getTestDataConfig(): Array<any> {
        return this.testDataConfig;
    }

    public inputClicked(input) {
        this.pushEventToDirectivesEvent.emit(input.row);
    }

    public partialCorrelation(directiveId, result) {
        let match = this.correlationObjectCollection.find(x => { return x.directiveId === directiveId; });
        let correlationColumnName = this.testDataConfig.correlationColumn;
        if (match) {
            let savedModelData = match.modelObj.cells.find(x => { return x.name === correlationColumnName; });
            if (savedModelData) {

                if (result.isAllTrue) {
                    savedModelData.val = true;
                }
                else {
                    savedModelData.val = false;
                }
            }
        }
    }

    public subscribeDirective(modelObject): any {
        this.sequence++;
        let directiveObj = {
            clickCallback: new EventEmitter<any>(),
            partiallySelected: new EventEmitter<any>(),
            directiveId: this.sequence,
            modelObj: modelObject,
            configObj: this.testDataConfig,
        };
        this.correlationObjectCollection.push(directiveObj);
        return directiveObj;
    }
}
