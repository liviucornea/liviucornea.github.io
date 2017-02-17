"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var dnd_utils_1 = require('./dnd.utils');
var DataTransferEffect = (function () {
    function DataTransferEffect(name) {
        this.name = name;
    }
    DataTransferEffect.COPY = new DataTransferEffect('copy');
    DataTransferEffect.LINK = new DataTransferEffect('link');
    DataTransferEffect.MOVE = new DataTransferEffect('move');
    DataTransferEffect.NONE = new DataTransferEffect('none');
    DataTransferEffect = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [String])
    ], DataTransferEffect);
    return DataTransferEffect;
}());
exports.DataTransferEffect = DataTransferEffect;
var DragImage = (function () {
    function DragImage() {
        this.imageElement = "";
        this.x_offset = 0;
        this.y_offset = 0;
        if (dnd_utils_1.isString(this.imageElement)) {
            // Create real image from string source
            var imgScr = this.imageElement;
            this.imageElement = new HTMLImageElement();
            this.imageElement.src = imgScr;
        }
    }
    DragImage = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DragImage);
    return DragImage;
}());
exports.DragImage = DragImage;
var DragDropConfig = (function () {
    function DragDropConfig() {
        this.onDragStartClass = "dnd-drag-start";
        this.onDragEnterClass = "dnd-drag-enter";
        this.onDragOverClass = "dnd-drag-over";
        this.onSortableDragClass = "dnd-sortable-drag";
        this.dragEffect = DataTransferEffect.MOVE;
        this.dropEffect = DataTransferEffect.MOVE;
        this.dragCursor = "move";
    }
    DragDropConfig = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DragDropConfig);
    return DragDropConfig;
}());
exports.DragDropConfig = DragDropConfig;
//# sourceMappingURL=dnd.config.js.map