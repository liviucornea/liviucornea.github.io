"use strict";
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
            template: "\n                <select name=\"dropdowncontrol\" class=\"form-control\" [disabled]=\"disabled\" [(ngModel)]=\"selectedValue\" (change)=\"EmitSelectedValue($event.target.value)\">\n                    <option *ngFor=\"let itemOption of DataSource\" value=\"{{itemOption.Value}}\" selected = \"itemOption.Value == selectedValue\">{{itemOption.Description}}</option>\n                </select>\n                "
        }), 
        __metadata('design:paramtypes', [])
    ], CustomDropDown);
    return CustomDropDown;
}());
exports.CustomDropDown = CustomDropDown;
//# sourceMappingURL=CustomDropDown.js.map