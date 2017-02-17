"use strict";
/// bellow are objects ( to be used to separate file
var Pipeline = (function () {
    function Pipeline(pipelineId, description, isActive) {
        if (isActive === void 0) { isActive = true; }
        this.pipelineId = pipelineId;
        this.description = description;
        this.isActive = isActive;
        this.pipeLineSchematics = [];
        this.pipeLineSchematicsAPI = [];
        this.isNew = false;
    }
    return Pipeline;
}());
exports.Pipeline = Pipeline;
var PipelineSchematic = (function () {
    function PipelineSchematic(pipeLineId, schematicId) {
        this.pipeLineId = pipeLineId;
        this.schematicId = schematicId;
        this.stopPipelineOnFailure = false;
        this.isActive = true;
        this.id = undefined;
    }
    return PipelineSchematic;
}());
exports.PipelineSchematic = PipelineSchematic;
// these are objects that come from API and will be assigned to the pipelines
var Schematic = (function () {
    function Schematic(id, description) {
        this.id = id;
        this.description = description;
    }
    return Schematic;
}());
exports.Schematic = Schematic;
function sortById(a, b) {
    return Number(a.id) - Number(b.id);
}
exports.sortById = sortById;
//# sourceMappingURL=pipeLineUtils.js.map