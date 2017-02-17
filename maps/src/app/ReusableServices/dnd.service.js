"use strict";
var core_1 = require('@angular/core');
var dnd_config_1 = require("../ReusableComponents/dragdrop/dnd.config");
var dnd_utils_1 = require("../ReusableComponents/dragdrop/dnd.utils");
var DragDropService = (function () {
    function DragDropService() {
        this.allowedDropZones = [];
    }
    DragDropService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DragDropService);
    return DragDropService;
}());
exports.DragDropService = DragDropService;
var DragDropSortableService = (function () {
    function DragDropSortableService(_config) {
        this._config = _config;
    }
    Object.defineProperty(DragDropSortableService.prototype, "elem", {
        get: function () {
            return this._elem;
        },
        enumerable: true,
        configurable: true
    });
    DragDropSortableService.prototype.markSortable = function (elem) {
        if (dnd_utils_1.isPresent(this._elem)) {
            this._elem.classList.remove(this._config.onSortableDragClass);
        }
        if (dnd_utils_1.isPresent(elem)) {
            this._elem = elem;
            this._elem.classList.add(this._config.onSortableDragClass);
        }
    };
    DragDropSortableService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [dnd_config_1.DragDropConfig])
    ], DragDropSortableService);
    return DragDropSortableService;
}());
exports.DragDropSortableService = DragDropSortableService;
//# sourceMappingURL=dnd.service.js.map