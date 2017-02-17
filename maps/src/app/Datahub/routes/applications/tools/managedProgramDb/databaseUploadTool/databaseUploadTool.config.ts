let RebalEntryReportDisplayGridConfig= {
    ChildType:"",
    PrimaryKeyColumn:"ID",
    ForeignKeyColumn:"",
    ShallHideDeleteButton:true,
    ShallHideAddButton:true,
    IsChildPage:false,
    IsScrollableGrid:true,
    ShowFilterRow: false,
    UseBusinessValidation: true,
    ColumnConfiguration: [{
        "dbColumnName": "ID",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired":false,
        "isComplexType": false,
        "displayName": "ID",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
    },{
        "dbColumnName": "PortfolioNumber",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired":false,
        "isComplexType": false,
        "displayName": "Portfolio Number",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
    },{
        "dbColumnName":"Date",
        "htmlControlType":"Date",
        "isVisible":true,
        "isRequired":true,
        "isComplexType":false,
        "displayName":"Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date",pattern:"yMMMd"},
    },{
        "dbColumnName": "Objective",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired":false,
        "isComplexType": false,
        "displayName": "Objective",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
    },{
        "dbColumnName": "FMCObjectiveCode",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired":false,
        "isComplexType": false,
        "displayName": "FMC Objective Code",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
    },{
        "dbColumnName": "Action",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired":false,
        "displayName": "Action",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
    },{
        "dbColumnName": "Source",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired":false,
        "displayName": "Source",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
    },{
        "dbColumnName": "Auto",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired":false,
        "displayName": "Auto",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
        "columnFormat": {format:"font-awesome",pattern:{false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg'}}
    },{
        "dbColumnName": "TradingListName",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired":false,
        "displayName": "Trading List Name",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined
    },{
        "dbColumnName": "QueueToMPower",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired":false,
        "displayName": "Queue To MPower",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
        "columnFormat": {format:"font-awesome",pattern:{false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg'}}
    },{
        "dbColumnName": "PortfolioReady",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired":false,
        "displayName": "Portfolio Ready",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
        "columnFormat": {format:"font-awesome",pattern:{false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg'}}
    },{
        "dbColumnName": "TradingListExecuted",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired":false,
        "displayName": "Trading List Executed",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
        "columnFormat": {format:"font-awesome",pattern:{false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg'}}
    },{
        "dbColumnName": "Notes",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired":false,
        "displayName": "Notes",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined
    },{
        "dbColumnName": "DoNotSendMail",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired":false,
        "displayName": "Do Not Send Mail",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
        "columnFormat": {format:"font-awesome",pattern:{false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg'}}
    },{
        "dbColumnName": "AddUser",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired":false,
        "displayName": "Add User",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined
    },{
        "dbColumnName": "Reviewed",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired":false,
        "displayName": "Reviewed",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
        "columnFormat": {format:"font-awesome",pattern:{false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg'}}
    },{
        "dbColumnName": "ReviewUser",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired":false,
        "displayName": "Reviewer Login ID",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined
    },{
        "dbColumnName":"ReviewDateTime",
        "htmlControlType":"Date",
        "isVisible":true,
        "isRequired":true,
        "isComplexType":false,
        "displayName":"Audit Pass Date & Time",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date",pattern:"yMMMdjms"},
    }]
};

let RebalEntryAuditAndReportFormBuilderConfig = {
    CustomButtons: [
        {
            name:'ShowReport',
            value:'Show Report',
            disabled: false,
            visible: true,
            formValidate: true
        }
    ],
    ColumnConfiguration: [
        {
            "dbColumnName": "SystemType",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "SystemType",
            "dataSourceAddress": {tableName:"/Application/SqlStatementDetail/ManagedProgramDB_GetGroupType",
                dbColumnName: "ID", displayColumnName: "Description",
                dbParameters:{Parameters:[{Name:"@GroupTypeIDs", Value: "18,19,23"}]},
                defaultValue: [{Value:"", Name:""}]},
            "dataSource": undefined,
            "regex": undefined,
        },{
            "dbColumnName": "SearchDateTime",
            "htmlControlType": "date",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Date/Time",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        },{
            "dbColumnName": "User",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "User",
            "dataSourceAddress": {tableName:"/Application/SqlStatementDetail/ManagedProgramDB_RptGetUser", dbColumnName: "AddUser", displayColumnName: "AddUser", dbParameters:{Parameters:[]}},
            "dataSource": undefined,
            "regex": undefined,
        },{
            "dbColumnName": "Type",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Type",
            "dataSourceAddress": {dbColumnName: "ID", displayColumnName: "Description"},
            "dataSource": [{ID:-1, Description:""},{ID:0, Description:"Manual"},{ID:1, Description:"Upload"}],
            "regex": undefined,
        }
    ],
    RulesConfig: [
        {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["required"],
            "ruleAssociates": ["SystemType", "SearchDateTime"],
            "apiObject": undefined
        },
        {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["date"],
            "ruleAssociates":["SearchDateTime"],
            "apiObject": undefined
        }]
};

let RebalEntryAuditDisplayGridConfig= {
    ChildType:"",
    PrimaryKeyColumn:"ID",
    ForeignKeyColumn:"",
    ShallHideDeleteButton:true,
    ShallHideAddButton:true,
    RowSelectionMode: "Multi",
    IsChildPage:false,
    IsScrollableGrid:true,
    ShowFilterRow: false,
    UseBusinessValidation: true,
    CustomButtons: [
        {
            name:'PassAudit',
            value:'Pass Audit',
            disabled: false,
            visible: true
        }
    ],
    ColumnConfiguration: [{
        "dbColumnName": "ID",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired":false,
        "isComplexType": false,
        "displayName": "ID",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
    },{
        "dbColumnName": "Reviewed",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired":false,
        "isComplexType": false,
        "displayName": "Reviewed",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
        "columnFormat": {format:"font-awesome",pattern:{false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg'}}
    },{
        "dbColumnName": "PortfolioNumber",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired":false,
        "isComplexType": false,
        "displayName": "Portfolio Number",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
    },{
        "dbColumnName":"Date",
        "htmlControlType":"Date",
        "isVisible":true,
        "isRequired":true,
        "isComplexType":false,
        "displayName":"Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date",pattern:"yMMMd"},
    },{
        "dbColumnName": "Objective",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired":false,
        "isComplexType": false,
        "displayName": "Objective",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
    },{
        "dbColumnName": "FMCObjectiveCode",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired":false,
        "isComplexType": false,
        "displayName": "FMC Objective Code",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
    },{
        "dbColumnName": "Action",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired":false,
        "displayName": "Action",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
    },{
        "dbColumnName": "Source",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired":false,
        "displayName": "Source",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
    },{
        "dbColumnName": "Auto",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired":false,
        "displayName": "Auto",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
        "columnFormat": {format:"font-awesome",pattern:{false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg'}}
    },{
        "dbColumnName": "TradingListName",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired":false,
        "displayName": "Trading List Name",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined
    },{
        "dbColumnName": "QueueToMPower",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired":false,
        "displayName": "Queue To MPower",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
        "columnFormat": {format:"font-awesome",pattern:{false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg'}}
    },{
        "dbColumnName": "PortfolioReady",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired":false,
        "displayName": "Portfolio Ready",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
        "columnFormat": {format:"font-awesome",pattern:{false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg'}}
    },{
        "dbColumnName": "TradingListExecuted",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired":false,
        "displayName": "Trading List Executed",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
        "columnFormat": {format:"font-awesome",pattern:{false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg'}}
    },{
        "dbColumnName": "Notes",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired":false,
        "displayName": "Notes",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined
    },{
        "dbColumnName": "DoNotSendMail",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired":false,
        "displayName": "Do Not Send Mail",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
        "columnFormat": {format:"font-awesome",pattern:{false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg'}}
    }]
};

let RebalEntryAuditReportFormBuilderConfig = {
    CustomButtons: [
        {
            name:'ShowReport',
            value:'Show Report',
            disabled: false,
            visible: true,
            formValidate: true
        }
    ],
    ColumnConfiguration: [
        {
            "dbColumnName": "SystemType",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "SystemType",
            "dataSourceAddress": {tableName:"/Application/SqlStatementDetail/ManagedProgramDB_GetGroupType",
                dbColumnName: "ID", displayColumnName: "Description",
                dbParameters:{Parameters:[{Name:"@GroupTypeIDs", Value: "18,19,23"}]},
                defaultValue: [{Value:"", Name:""}]},
            "dataSource": undefined,
            "regex": undefined,
        },{
            "dbColumnName": "SearchDateTime",
            "htmlControlType": "date",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Date/Time",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
        },{
            "dbColumnName": "User",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "User",
            "dataSourceAddress": {tableName:"/Application/SqlStatementDetail/ManagedProgramDB_RptGetUser", dbColumnName: "AddUser", displayColumnName: "AddUser", dbParameters:{Parameters:[]}},
            "dataSource": undefined,
            "regex": undefined,
        },{
            "dbColumnName": "Type",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Type",
            "dataSourceAddress": {dbColumnName: "ID", displayColumnName: "Description"},
            "dataSource": [{ID:-1, Description:""},{ID:0, Description:"Manual"},{ID:1, Description:"Upload"}],
            "regex": undefined,
        }
    ]
};

let RebalEntryUploadDisplayGridConfig= {
    ChildType:"",
    PrimaryKeyColumn:"ID",
    ForeignKeyColumn:"",
    ShallHideDeleteButton:true,
    ShallHideAddButton:true,
    RowSelectionMode: "Multi",
    IsChildPage:false,
    IsScrollableGrid:true,
    ShowFilterRow: false,
    UseBusinessValidation: true,
    CustomButtons: [
        {
            name:'PurgeSelected',
            value:'Purge Selected',
            disabled: false,
            visible: true
        },{
            name:'PurgeAll',
            value:'Purge All',
            disabled: false,
            visible: true
        },{
            name:'StartImport',
            value:'Start Import',
            disabled: false,
            visible: true
        }
    ],
    ColumnConfiguration: [{
        "dbColumnName": "ID",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired":false,
        "isComplexType": false,
        "displayName": "ID",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
    },{
        "dbColumnName": "Missed Account",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired":false,
        "isComplexType": false,
        "displayName": "Missed Account",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
        "columnFormat": {format:"font-awesome",pattern:{false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg'}}
    },{
        "dbColumnName": "Existing Instruction",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired":false,
        "isComplexType": false,
        "displayName": "Existing Instruction",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
        "columnFormat": {format:"font-awesome",pattern:{false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg'}}
    },{
        "dbColumnName": "Duplicated",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired": false,
        "displayName": "Duplicated",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
        "columnFormat": {format:"font-awesome",pattern:{false: 'fa fa-remove fa-lg', true: 'fa fa-check fa-lg'}}
    },{
        "dbColumnName": "Objective",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired":false,
        "isComplexType": false,
        "displayName": "Objective",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
    },{
        "dbColumnName": "PortfolioNumber",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired":false,
        "isComplexType": false,
        "displayName": "Portfolio Number",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
    },{
        "dbColumnName":"Date",
        "htmlControlType":"Date",
        "isVisible":true,
        "isRequired":true,
        "isComplexType":false,
        "displayName":"Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "regex": undefined,
        "columnFormat": {format:"date",pattern:"yMMMd"},
    },{
        "dbColumnName": "Action",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired":false,
        "displayName": "Action",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
    },{
        "dbColumnName": "Source",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired":false,
        "displayName": "Source",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
    },{
        "dbColumnName": "Status",
        "htmlControlType": "text",
        "isVisible": false,
        "isComplexType": false,
        "isRequired":false,
        "displayName": "Status",
        "dataSourceAddress":undefined,
        "dataSource":undefined,
        "regex":undefined,
    }]
};

let RebalEntryUploadFormBuilderConfig = {
    CustomButtons: [
        {
            name:'PreviewUpload',
            value:'Preview Upload',
            disabled: false,
            visible: true
        }
    ],
    ColumnConfiguration: [
        {
            "dbColumnName": "SystemType",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": true,
            "displayName": "SystemType",
            "dataSourceAddress": {tableName:"/Application/SqlStatementDetail/ManagedProgramDB_GetGroupType",
                dbColumnName: "ID", displayColumnName: "Description",
                dbParameters:{Parameters:[{Name:"@GroupTypeIDs", Value: "18,19,23"}]}},
            "dataSource": undefined,
            "regex": undefined,
        },{
            "dbColumnName": "UploadControl",
            "htmlControlType": "upload",
            "isVisible": true,
            "isRequired": false,
            "isComplexType": false,
            "displayName": "ChooseFileToUpload",
            "UploadOptions": {
                allowedExtensions: ['csv'],
                maxUploadSize: 200000,
                maxUploads: 1,
                autoUpload: true,
                applicationID: 4
            },
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            "regex": undefined,
            "readOnly": false,
        }
    ]
};


export var  MainControlConfig = {
    TabsList: [
        {
            TabKey: "RebalEntryAudit",
            TabName: "Rebal Entry Audit",
            TabControls:[
                {
                    ShowDefault: true,
                    ComponentName: "RebalEntryAuditFormBuilder",
                    PageType: "formbuilder",
                    gridSettings: RebalEntryAuditAndReportFormBuilderConfig,
                    PageOperationType: 'dynamicform'
                },
                {
                    ShowDefault: false,
                    ComponentName: "RebalEntryAuditDisplayGrid",
                    PageType: "displaygrid",
                    gridSettings: RebalEntryAuditDisplayGridConfig,
                    PageOperationType: 'view'
                }
            ],
        },
        {
            TabKey: "RebalEntryReport",
            TabName: "Rebal Entry Report",
            TabControls:[
                {
                    ShowDefault: true,
                    ComponentName: "RebalEntryReportFormBuilder",
                    PageType: "formbuilder",
                    gridSettings: RebalEntryAuditAndReportFormBuilderConfig,
                    PageOperationType: 'dynamicform'
                },
                {
                    ShowDefault: false,
                    ComponentName: "RebalEntryReportDisplayGrid",
                    PageType: "displaygrid",
                    gridSettings: RebalEntryReportDisplayGridConfig,
                    PageOperationType: 'view'
                }
            ],
        },
        {
            TabKey: "RebalEntryUpload",
            TabName: "Rebal Entry Upload",
            TabControls:[
                {
                    ShowDefault: true,
                    ComponentName: "RebalEntryUploadFormBuilder",
                    PageType: "formbuilder",
                    gridSettings: RebalEntryUploadFormBuilderConfig,
                    PageOperationType: 'dynamicform'
                },
                {
                    ShowDefault: false,
                    ComponentName: "RebalEntryUploadDisplayGrid",
                    PageType: "displaygrid",
                    gridSettings: RebalEntryUploadDisplayGridConfig,
                    PageOperationType: 'view'
                }
            ],
        }
    ]
};

