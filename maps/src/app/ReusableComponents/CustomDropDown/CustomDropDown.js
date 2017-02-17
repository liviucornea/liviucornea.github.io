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
var CustomDropDown = (function () {
    function CustomDropDown() {
        this.DropDownEmitter = new core_1.EventEmitter();
        this.disabled = false;
    }
    Object.defineProperty(CustomDropDown.prototype, "Disabled", {
        set: function (value) {
            this.disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    CustomDropDown.prototype.ngOnInit = function () {
    };
    CustomDropDown.prototype.EmitSelectedValue = function (data) {
        this.DropDownEmitter.emit({ Value: data });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], CustomDropDown.prototype, "Disabled", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CustomDropDown.prototype, "selectedValue", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], CustomDropDown.prototype, "DataSource", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], CustomDropDown.prototype, "DropDownEmitter", void 0);
    CustomDropDown = __decorate([
        core_1.Component({
            selector: "customDropDown",
            template: "\n                <select name=\"dropdowncontrol\" [disabled]=\"disabled\" [(ngModel)]=\"selectedValue\" (change)=\"EmitSelectedValue($event.target.value)\">\n                    <option *ngFor=\"let itemOption of DataSource\" value=\"{{itemOption.Value}}\" selected = \"itemOption.Value == selectedValue\">{{itemOption.Description}}</option>\n                </select>\n                "
        }), 
        __metadata('design:paramtypes', [])
    ], CustomDropDown);
    return CustomDropDown;
}());
exports.CustomDropDown = CustomDropDown;
//# sourceMappingURL=CustomDropDown.js.map