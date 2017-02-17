let ImplementChangePortfolioFormBuilderConfig = {
    CustomButtons: [
        {
            name: 'RunReport',
            value: 'Run Report',
            disabled: false,
            visible: true,
            formValidate: true
        },
        {
            name: 'Excel',
            value: 'Excel',
            disabled: true,
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
            "isRequired": true,
            "displayName": "System Type",
            "dataSourceAddress": {tableName:"/Application/SqlStatementDetail/ManagedProgramDB_GetGroupType", dbColumnName: "ID", displayColumnName: "Description", dbParameters:{Parameters:[{Name:"@GroupTypeIDs", Value: "18,19,23"}]}},
            "dataSource": undefined,
            
        },{
            "dbColumnName": "ReportType",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": true,
            "displayName": "Report to Run",
            "dataSourceAddress": {tableName:"/Application/SqlStatementDetail/ManagedProgramDB_Lookup",
                dbColumnName: "iRptPortfolioChangeInstruction", displayColumnName: "sRptPortfolioChangeInstruction",
                dbParameters:{Parameters:[{Name:"@type", Value: 2}, {Name:"@GroupId", Value:0}, {Name: "@LoginName", Value:""}]}},
            "dataSource": undefined,
            
        },{
            "dbColumnName": "YearToReport",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": true,
            "displayName": "Year to Report",
            "dataSourceAddress": {tableName:"/Application/SqlStatementDetail/ManagedProgramDB_GetYears", dbColumnName: "Year", displayColumnName: "Year", dbParameters:{Parameters:[]}},
            "dataSource": undefined,
            
        },{
            "dbColumnName": "FilterColumn",
            "htmlControlType": "customselect",
            "isVisible": false,
            "isComplexType": false,
            "isRequired": true,
            "displayName": "Filter Column",
            "dataSourceAddress": {dbColumnName: "Value", displayColumnName: "Description"},
            "dataSource": [{Value:"@sProjectManager", Description:"Portfolio Manager"}, {Value:"@sAction", Description:"Action"}, {Value:"@sSource", Description:"Source"}, {Value:"@sObjectiveTransaction", Description:"Objective Transaction"}, {Value:"@sFMCObjectiveCode", Description:"FMC Objective Code"}, {Value:"@sNotes", Description:"Notes"}],
            
        },{
            "dbColumnName": "FilterValue",
            "htmlControlType": "text",
            "isVisible": false,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Filter Value",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            
        },{
            "dbColumnName": "SelectionRule",
            "htmlControlType": "customselect",
            "isVisible": false,
            "isComplexType": false,
            "isRequired": true,
            "displayName": "Selection Rule",
            "dataSourceAddress": {tableName:"/Application/SqlStatementDetail/ManagedProgramDB_Lookup",
                dbColumnName: "id", displayColumnName: "name",
                dbParameters:{Parameters:[{Name:"@type", Value: 4}, {Name:"@GroupId", Value:0}, {Name: "@LoginName", Value:""}]}},
            "dataSource": undefined,
            
        },{
            "dbColumnName": "TraderName",
            "htmlControlType": "text",
            "isVisible": false,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Trader Name",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            
        },{
            "dbColumnName": "SelectionRuleCreate",
            "htmlControlType": "customselect",
            "isVisible": false,
            "isComplexType": false,
            "isRequired": true,
            "displayName": "Selection Rule",
            "dataSourceAddress": {tableName:"/Application/SqlStatementDetail/ManagedProgramDB_Lookup",
                dbColumnName: "id", displayColumnName: "name",
                dbParameters:{Parameters:[{Name:"@type", Value: 4}, {Name:"@GroupId", Value:0}, {Name: "@LoginName", Value:""}]}},
            "dataSource": undefined,
            
        }
    ],
    RulesConfig: [
        {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["required"],
            "ruleAssociates": ["SystemType", "ReportType", "YearToReport"],
            "apiObject": undefined
        }]
};


export var ImplementChangePortfolioDisplayGridConfig_2 = {
    ChildType: "",
    PrimaryKeyColumn: "Id",
    ForeignKeyColumn: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsChildPage: false,
    IsScrollableGrid: true,
    ShowFilterRow: false,
    UseBusinessValidation: true,
    ColumnConfiguration: [{
        "dbColumnName": "Id",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Id",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Portfolio Number",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio Number",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Date",
        "htmlControlType": "Date",
        "isVisible": true,
        "isRequired": true,
        "isComplexType": false,
        "displayName": "Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "Portfolio Manager",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio Manager",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Objective",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Objective",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Action",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Action",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "columnFormat": {format:"preformatted"}
    },{
        "dbColumnName": "Source",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Source",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "columnFormat": {format:"preformatted"}
    },{
        "dbColumnName": "FMC Objective Code",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "FMC Objective Code",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Portfolio Ready",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio Ready",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Trading List Executed",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trading List Executed",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Do Not Send Mail",
        "htmlControlType": "text",
        "isVisible": false,
        "isComplexType": false,
        "isRequired": false,
        "displayName": "Do Not Send Mail",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Trading List Name",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trading List Name",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Notes",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired": false,
        "displayName": "Notes",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        "columnFormat": {format:"preformatted"}
    },{
        "dbColumnName": "portfolio_id",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio ID",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    }]
};


export var ImplementChangePortfolioDisplayGridConfig_4 = {
    ChildType: "",
    PrimaryKeyColumn: "Id",
    ForeignKeyColumn: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsChildPage: false,
    IsScrollableGrid: true,
    ShowFilterRow: false,
    UseBusinessValidation: true,
    ColumnConfiguration: [{
        "dbColumnName": "Id",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Id",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Portfolio Number",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio Number",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Date",
        "htmlControlType": "Date",
        "isVisible": true,
        "isRequired": true,
        "isComplexType": false,
        "displayName": "Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "Portfolio Manager",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio Manager",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Objective",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Objective",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Action",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Action",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Source",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Source",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "FMC Objective Code",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "FMC Objective Code",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Portfolio Ready",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio Ready",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Trading List Executed",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trading List Executed",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Do Not Send Mail",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired": false,
        "displayName": "Do Not Send Mail",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Trading List Name",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trading List Name",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Notes",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired": false,
        "displayName": "Notes",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "portfolio_id",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio ID",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Last Change",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Last Change",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Duration (Days)",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Duration (Days)",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    }]
};


export var ImplementChangePortfolioDisplayGridConfig_5 = {
    ChildType: "",
    PrimaryKeyColumn: "Id",
    ForeignKeyColumn: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsChildPage: false,
    IsScrollableGrid: true,
    ShowFilterRow: false,
    UseBusinessValidation: true,
    ColumnConfiguration: [{
        "dbColumnName": "Id",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Id",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Portfolio Number",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio Number",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Portfolio Name",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio Name",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Objective",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Objective",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Action",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Action",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Source",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Source",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Trading List Name",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trading List Name",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Notes",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired": false,
        "displayName": "Notes",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    }]
};


export var ImplementChangePortfolioDisplayGridConfig_6 = {
    ChildType: "",
    PrimaryKeyColumn: "Name",
    ForeignKeyColumn: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsChildPage: false,
    IsScrollableGrid: true,
    ShowFilterRow: false,
    UseBusinessValidation: true,
    ColumnConfiguration: [{
        "dbColumnName": "Name",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Name",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Portfolio Name",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio Name",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    }]
};


export var ImplementChangePortfolioDisplayGridConfig_7 = {
    ChildType: "",
    PrimaryKeyColumn: "Id",
    ForeignKeyColumn: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsChildPage: false,
    IsScrollableGrid: true,
    ShowFilterRow: false,
    UseBusinessValidation: true,
    ColumnConfiguration: [{
        "dbColumnName": "Portfolio Number",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio Number",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Date",
        "htmlControlType": "Date",
        "isVisible": true,
        "isRequired": true,
        "isComplexType": false,
        "displayName": "Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "Portfolio Manager",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio Manager",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Objective",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Objective",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Action",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Action",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Source",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Source",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "FMC Objective Code",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "FMC Objective Code",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Portfolio Ready",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio Ready",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Trading List Executed",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trading List Executed",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Do Not Send Mail",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired": false,
        "displayName": "Do Not Send Mail",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Trading List Name",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trading List Name",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Notes",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired": false,
        "displayName": "Notes",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "portfolio_id",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio ID",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Queue to MPOWER",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Queue to MPOWER",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Id",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Id",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    }]
};


export var ImplementChangePortfolioDisplayGridConfig = {
    ChildType: "",
    PrimaryKeyColumn: "Id",
    ForeignKeyColumn: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsChildPage: false,
    IsScrollableGrid: true,
    ShowFilterRow: false,
    UseBusinessValidation: true,
    ColumnConfiguration: [{
        "dbColumnName": "Id",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Id",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Portfolio Number",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio Number",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Date",
        "htmlControlType": "Date",
        "isVisible": true,
        "isRequired": true,
        "isComplexType": false,
        "displayName": "Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "Portfolio Manager",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio Manager",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Objective",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Objective",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Action",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Action",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Source",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Source",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "FMC Objective Code",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "FMC Objective Code",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Portfolio Ready",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio Ready",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Trading List Executed",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trading List Executed",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Do Not Send Mail",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired": false,
        "displayName": "Do Not Send Mail",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Trading List Name",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Trading List Name",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Notes",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired": false,
        "displayName": "Notes",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "id",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "id",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    }]
};


let ModelHoldingsDisplayGridConfig = {
    ChildType: "",
    PrimaryKeyColumn: "PortfolioNumber",
    ForeignKeyColumn: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsChildPage: false,
    IsScrollableGrid: true,
    ShowFilterRow: false,
    UseBusinessValidation: false,
    ColumnConfiguration: [{
        "dbColumnName": "Portfolio Number",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio Number",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Portfolio Name",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio Name",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Model",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Model",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    }]
};


let ModulesReportFormBuilderConfig = {
    CustomButtons: [
        {
            name: 'Search',
            value: 'Search',
            disabled: false,
            visible: true,
            formValidate: true
        },
        {
            name: 'Excel',
            value: 'Excel',
            disabled: true,
            visible: true,
            formValidate: true
        }
    ],
    ColumnConfiguration: [
        {
            "dbColumnName": "EquityModule",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": true,
            "displayName": "Equity Module",
            "dataSourceAddress": {tableName:"/Application/SqlStatementDetail/ManagedProgramDB_GetModules", dbColumnName: "Id", displayColumnName: "Name", dbParameters:{Parameters:[{Name:"@ModuleType", Value: "1"}]}},
            "dataSource": undefined,
            
        },{
            "dbColumnName": "FixedIncomeModule",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": true,
            "displayName": "Fixed Income Module",
            "dataSourceAddress": {tableName:"/Application/SqlStatementDetail/ManagedProgramDB_GetModules", dbColumnName: "Id", displayColumnName: "Name", dbParameters:{Parameters:[{Name:"@ModuleType", Value: "2"}]}},
            "dataSource": undefined,
            
        }
    ]
};


let ModulesReportDisplayGridConfig = {
    ChildType: "",
    PrimaryKeyColumn: "ID",
    ForeignKeyColumn: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsChildPage: false,
    IsScrollableGrid: true,
    ShowFilterRow: false,
    UseBusinessValidation: false,
    ColumnConfiguration: [{
        "dbColumnName": "EquityModule",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Equity Module",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "FixedIncomeModule",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Fixed Income Module",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "PortfolioNumber",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio Number",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "PortfolioName",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio Name",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "PortfolioManager",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Manager",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Description",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Selected Equity Range",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "ApplyAssetCall",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired": false,
        "displayName": "Apply Asset Call",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "SelectedEquityRange",
        "htmlControlType": "text",
        "isVisible": false,
        "isComplexType": false,
        "isRequired": false,
        "displayName": "Selected Equity Range ID",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "equitymoduleid",
        "htmlControlType": "text",
        "isVisible": false,
        "isComplexType": false,
        "isRequired": false,
        "displayName": "Equity Module ID",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "fixedincomemoduleid",
        "htmlControlType": "text",
        "isVisible": false,
        "isComplexType": false,
        "isRequired": false,
        "displayName": "Fixed Income Module ID",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "ID",
        "htmlControlType": "text",
        "isVisible": false,
        "isComplexType": false,
        "isRequired": false,
        "displayName": "ID",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    }]
};


let PortfolioFormBuilderConfig = {
    CustomButtons: [
        {
            name: 'RunReport',
            value: 'Run Report',
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
            "isRequired": true,
            "displayName": "System Type",
            "dataSourceAddress": {tableName:"/Application/SqlStatementDetail/ManagedProgramDB_GetGroupType", dbColumnName: "ID", displayColumnName: "Description", dbParameters:{Parameters:[{Name:"@GroupTypeIDs", Value: "18,19,23"}]}},
            "dataSource": undefined,
            
        },{
            "dbColumnName": "ReportType",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": true,
            "displayName": "Report to Run",
            "dataSourceAddress": {tableName:"/Application/SqlStatementDetail/ManagedProgramDB_Lookup",
                dbColumnName: "iRptPortfolio", displayColumnName: "sRptPortfolio",
                dbParameters:{Parameters:[{Name:"@type", Value: 1}, {Name:"@GroupId", Value:0}, {Name: "@LoginName", Value:""}]}},
            "dataSource": undefined,
            
        },{
            "dbColumnName": "YearToReport",
            "htmlControlType": "customselect",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": true,
            "displayName": "Year to Report",
            "dataSourceAddress": {tableName:"/Application/SqlStatementDetail/ManagedProgramDB_GetYears", dbColumnName: "Year", displayColumnName: "Year", dbParameters:{Parameters:[]}},
            "dataSource": undefined,
            
        },{
            "dbColumnName": "PortfolioManager",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Portfolio Manager",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            
        },{
            "dbColumnName": "Notes",
            "htmlControlType": "text",
            "isVisible": true,
            "isComplexType": false,
            "isRequired": false,
            "displayName": "Notes",
            "dataSourceAddress": undefined,
            "dataSource": undefined,
            
        }
    ],
    RulesConfig: [
        {
            "ruleType": "AllOf",
            "applyTo": "AllOf",
            "ruleName": ["required"],
            "ruleAssociates": ["SystemType", "ReportType", "YearToReport"],
            "apiObject": undefined
        }]
};


let PortfolioDisplayGridConfig = {
    ChildType: "",
    PrimaryKeyColumn: "ID",
    ForeignKeyColumn: "",
    ShallHideDeleteButton: true,
    ShallHideAddButton: true,
    IsChildPage: false,
    IsScrollableGrid: true,
    ShowFilterRow: false,
    UseBusinessValidation: true,
    ColumnConfiguration: [{
        "dbColumnName": "ID",
        "htmlControlType": "text",
        "isVisible": false,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "ID",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Portfolio Number",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio Number",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Portfolio Manager",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Portfolio Manager",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "Projected AUM",
        "htmlControlType": "text",
        "isVisible": true,
        "isRequired": false,
        "isComplexType": false,
        "displayName": "Projected AUM",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    },{
        "dbColumnName": "InceptionDate",
        "htmlControlType": "Date",
        "isVisible": true,
        "isRequired": true,
        "isComplexType": false,
        "displayName": "Inception Date",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
        "columnFormat": {format:"date", pattern:"yMMMd"}
    },{
        "dbColumnName": "Notes",
        "htmlControlType": "text",
        "isVisible": true,
        "isComplexType": false,
        "isRequired": false,
        "displayName": "Notes",
        "dataSourceAddress": undefined,
        "dataSource": undefined,
        
    }]
};


export var  MainControlConfig = {
    TabsList: [
        {
            TabKey: "ImplementChangePortfolio",
            TabName: "Implement Change Portfolio",
            TabControls:[
                {
                    ShowDefault: true,
                    ComponentName: "ImplementChangePortfolioFormBuilder",
                    PageType: "formbuilder",
                    gridSettings: ImplementChangePortfolioFormBuilderConfig,
                    PageOperationType: 'dynamicform'
                },
                {
                    ShowDefault: false,
                    ComponentName: "ImplementChangePortfolioDisplayGrid",
                    PageType: "displaygrid",
                    gridSettings: ImplementChangePortfolioDisplayGridConfig,
                    PageOperationType: 'view'
                }
            ]
        },
        {
            TabKey: "ModelHoldings",
            TabName: "Model Holdings Outside Modules",
            TabControls:[
                {
                    ShowDefault: false,
                    ComponentName: "ModelHoldingsDisplayGrid",
                    PageType: "displaygrid",
                    gridSettings: ModelHoldingsDisplayGridConfig,
                    PageOperationType: 'view'
                }
            ]
        },
        {
            TabKey: "ModulesReport",
            TabName: "Modules Report",
            TabControls:[
                {
                    ShowDefault: true,
                    ComponentName: "ModulesReportFormBuilder",
                    PageType: "formbuilder",
                    gridSettings: ModulesReportFormBuilderConfig,
                    PageOperationType: 'dynamicform'
                },
                {
                    ShowDefault: false,
                    ComponentName: "ModulesReportDisplayGrid",
                    PageType: "displaygrid",
                    gridSettings: ModulesReportDisplayGridConfig,
                    PageOperationType: 'view'
                }
            ]
        },
        {
            TabKey: "Portfolio",
            TabName: "Portfolio",
            TabControls:[
                {
                    ShowDefault: true,
                    ComponentName: "PortfolioFormBuilder",
                    PageType: "formbuilder",
                    gridSettings: PortfolioFormBuilderConfig,
                    PageOperationType: 'dynamicform'
                },
                {
                    ShowDefault: false,
                    ComponentName: "PortfolioDisplayGrid",
                    PageType: "displaygrid",
                    gridSettings: PortfolioDisplayGridConfig,
                    PageOperationType: 'view'
                }
            ]
        }
    ]
};

