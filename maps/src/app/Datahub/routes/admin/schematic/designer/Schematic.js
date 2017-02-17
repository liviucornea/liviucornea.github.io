"use strict";
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
//# sourceMappingURL=Schematic.js.map