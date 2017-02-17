"use strict";
/*
 file contains the objects and util functions used
in schematicDesigner.ts
*/
var BaseSchematicDesigner = (function () {
    function BaseSchematicDesigner() {
        this.IsAddpage = false;
        this.allSteps = new Array();
        this.sequence = 1;
        this.allSchematicConfigurationVM = new Array();
        this.addConfigVisibility = false;
        this.apiIsLoaded = false;
        this.unitFrozen = false;
        this.showAdd = false;
        this.addSchematicVisibility = false;
        this.deleteStepVisibility = false;
        this.addStepVisibility = false;
        this.newStepDescription = '';
        this.isNewSchematic = false;
        this.newSchematicDescription = '';
        this.updatedStep = undefined;
        this.isClone = false;
        this.schematicState = "neutral";
    }
    return BaseSchematicDesigner;
}());
exports.BaseSchematicDesigner = BaseSchematicDesigner;
var Schematic = (function () {
    function Schematic(schematicId, description, Status, isActive) {
        if (isActive === void 0) { isActive = true; }
        this.schematicId = schematicId;
        this.description = description;
        this.Status = Status;
        this.isActive = isActive;
        this.Steps = [];
    }
    return Schematic;
}());
exports.Schematic = Schematic;
var Step = (function () {
    function Step(SchematicStepId, StepNumber, StepDescription, SchematicId, UnitName) {
        this.SchematicStepId = SchematicStepId;
        this.StepNumber = StepNumber;
        this.StepDescription = StepDescription;
        this.SchematicId = SchematicId;
        this.UnitName = UnitName;
        this.isVisible = false;
        this.StepAssets = [];
        this.StepActive = true;
        this.StepAddingConfiguration = false;
        this.isAddingJSON = false;
        this.isArrayLike = false;
        this.selectedConfigValue = '';
        this.isComplete = true;
        this.state = 'none';
        this.isCollapsed = true;
    }
    ;
    return Step;
}());
exports.Step = Step;
var ConfigValueType = (function () {
    function ConfigValueType(id, unitId, description, template, isMandatory, defaultValue) {
        if (isMandatory === void 0) { isMandatory = false; }
        this.id = id;
        this.unitId = unitId;
        this.description = description;
        this.template = template;
        this.isMandatory = isMandatory;
        this.defaultValue = defaultValue;
    }
    return ConfigValueType;
}());
exports.ConfigValueType = ConfigValueType;
function sortByDesc(a, b) {
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
exports.sortByDesc = sortByDesc;
function jsonToDoc(template, step) {
    if (template.length == 0) {
        return '';
    }
    var result = '{';
    try {
        var jsonObject = JSON.parse(template);
        Object.keys(jsonObject).forEach(function (x) {
            if (!(/^\#.*\#$/.test(x)))
                result += '"' + x + '"' + ' : "" ,';
        });
    }
    catch (error) {
        console.log('Error converting template to object in schematic designer: ' + error.message);
        step.isAddingJSON = false;
        return '';
    }
    result = result.slice(0, -1);
    result += '}';
    return result;
}
exports.jsonToDoc = jsonToDoc;
//# sourceMappingURL=schematicDesignerUtils.js.map