"use strict";
var Pipeline = (function () {
    function Pipeline(id, description) {
        this.id = id;
        this.description = description;
        this.schematics = [];
        this.pipelineRuntimeValue = '{';
        this.idForSchematics = []; /// these ARE NOT schematicIds but are id for schematics inside of pipeline
    }
    return Pipeline;
}());
exports.Pipeline = Pipeline;
var Schematic = (function () {
    function Schematic(id, pipelineId, schematicId, sequenceNbr) {
        this.id = id;
        this.pipelineId = pipelineId;
        this.schematicId = schematicId;
        this.sequenceNbr = sequenceNbr;
    }
    return Schematic;
}());
exports.Schematic = Schematic;
//# sourceMappingURL=executionUtils.js.map