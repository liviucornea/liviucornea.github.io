/// bellow are objects ( to be used to separate file
export class Pipeline {
    public pipeLineSchematics:PipelineSchematic[] = [];
    public pipeLineSchematicsAPI: Array<any> = [];
    public isNew: boolean = false;
    public VersionStamp : string;
    constructor(public  pipelineId:string,
                public  description:string,
                public  isActive:boolean = true) {
    }
}

export class PipelineSchematic {
    public stopPipelineOnFailure:boolean = false;
    public isActive:boolean = true;
    public description:string;
    public sequenceNumber:string;
    public id:string = undefined;
    constructor(public pipeLineId:string,
                public schematicId:string) {
    }
}
// these are objects that come from API and will be assigned to the pipelines
export class Schematic {
    constructor(public  id:string,
                public  description:string) {
    }
}

export function sortById(a,b){
    return Number(a.id) - Number(b.id);
}