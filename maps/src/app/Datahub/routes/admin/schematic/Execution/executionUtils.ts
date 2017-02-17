export class Pipeline {
    constructor(public id?:string, public description?:string){
    }
    public schematics: Array<Schematic> = [];
    public pipelineRuntimeValue: string = '{';
    public idForSchematics : Array<string>   = [] ;/// these ARE NOT schematicIds but are id for schematics inside of pipeline

}
 export class Schematic {
     constructor(public id?:string, public pipelineId?:string, public schematicId?:string, public sequenceNbr?:string){
     }
 }