"use strict";
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
        this.selectedConfigValue = '';
        this.isComplete = true;
    }
    ;
    return Step;
}());
exports.Step = Step;
//# sourceMappingURL=Step.js.map