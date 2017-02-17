/*
 file contains the objects and util functions used
in schematicDesigner.ts
*/
export class BaseSchematicDesigner {
    IsAddpage:boolean = false;
    allSteps:Array<any> = new Array<any>();
    sequence:number = 1;
    allSchematics:Array<any>;
    allSchematicsVM:Array<Schematic>;
    allUnits:Array<any>;
    allUnitsVM:Array<any>;
    allConfigValues:Array<any>;
    allSchematicConfiguration:Array<any>;
    allSchematicConfigurationVM:Array<any> = new Array<any>();
    allConfigValueTypes:Array<any>;
    allConfigValueTypesVM:Array<any>;
    allUnitTypes:Array<any>;
    allSchematicSteps:Array<any>;
    allStepsVM:Array<any>;
    addConfigVisibility:boolean = false;
    apiIsLoaded:boolean = false;
    selectedUnit:any;
    selectedConfigType:any;
    selectedConfigValue:any;
    unitFrozen:boolean = false;
    selectedSchematic:any;
    selectedProcessName:string;
    showAdd:boolean = false;
    addSchematicVisibility:boolean = false;
    visiblityMatrix:Array<any>;
    lastStepNumber:number;
    deleteStepVisibility:boolean = false;
    addStepVisibility:boolean = false;
    autocompleteInput:any;
    newStepDescription:string = '';
    isNewSchematic:boolean = false;
    newSchematicDescription:string = '';
    updatedStep:Step = undefined;
    isClone:boolean = false;
    cloneID:number;
    schematicState:string = "neutral";
    sqlScript:string;

}



export class Schematic {
    public Steps:Array<Step> = [];

    constructor(public  schematicId:string,
                public  description:string,
                public  Status:string,
                public  isActive:boolean = true) {
    }
}

export class Step {
    public isVisible:boolean = false;
    public StepAssets:Array<any> = [];
    public StepActive:boolean = true;
    public StepAddingConfiguration:boolean = false;
    public isAddingJSON: boolean = false;
    public isArrayLike: boolean = false;
    public selectedConfigValue:string = '';
    public isComplete:boolean = true;
    public state:string = 'none';
    public isCollapsed: boolean = true;

    constructor(public SchematicStepId:number, public StepNumber:number, public StepDescription:string, public SchematicId?:string, public UnitName?:string) {

    };
}


export class ConfigValueType {
    constructor(public id:string,
                public unitId:string,
                public description:string,
                public template: string,
                public isMandatory: boolean = false,
                public defaultValue: string    ) {
    }
}

export function sortByDesc(a, b) {
    var descA = a.description.toUpperCase();
    var descB = b.description.toUpperCase();
    if (descA < descB) {
        return -1;
    }
    if (descA > descB) {
        return 1;
    }
    return 0;
}

export function jsonToDoc(template:string, step:any) {
    if (template.length == 0) { return '';}
    var result = '{';
    try {
        let jsonObject = JSON.parse(template);
        Object.keys(jsonObject).forEach((x) => {

         if (! (/^\#.*\#$/.test (x))  )
                result += '"' + x + '"' + ' : "" ,';
        });
        // step.isAddingJSON =  true;
    } catch (error) {
        console.log('Error converting template to object in schematic designer: ' + error.message);
        step.isAddingJSON = false;
        return '';
    }
    result = result.slice(0, -1);
    result += '}';
    return result;
}