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
var core_1 = require("@angular/core");
var matrixService_1 = require("../../ReusableServices/matrixService");
var forms_1 = require("@angular/forms");
var MULTISELECT_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return CheckBoxListComponent; }),
    multi: true
};
var CheckBoxListComponent = (function () {
    function CheckBoxListComponent(matrixService, element) {
        this.matrixService = matrixService;
        this.element = element;
        this.focused = new core_1.EventEmitter();
        //@Output() public CheckBoxListEmitter: EventEmitter<any> = new EventEmitter<any>();
        this.expanded = false;
        this.disabled = false;
        this.model = [];
        this.numSelected = 0;
        this.isVisible = false;
        this.searchFilterText = '';
        this.onModelChange = function (_) { };
        this.onModelTouched = function () { };
    }
    Object.defineProperty(CheckBoxListComponent.prototype, "Disabled", {
        set: function (value) {
            this.disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    CheckBoxListComponent.prototype.ngOnInit = function () {
        /*        this.settings = Object.assign(this.defaultSettings, this.settings);
                this.texts = Object.assign(this.defaultTexts, this.texts);
                this.title = this.texts.defaultTitle;*/
    };
    CheckBoxListComponent.prototype.onClick = function (target) {
        var parentFound = false;
        while (target != null && !parentFound) {
            if (target === this.element.nativeElement) {
                parentFound = true;
            }
            target = target.parentElement;
        }
        // target is null when clicking off of the checkboxlist
        if (!parentFound && typeof target !== 'undefined') {
            this.isVisible = false;
            this.focused.next(false);
        }
    };
    CheckBoxListComponent.prototype.writeValue = function (value) {
        if (value !== undefined) {
            this.model = value;
        }
    };
    CheckBoxListComponent.prototype.ngDoCheck = function () {
        this.updateNumSelected();
        this.updateTitle();
    };
    CheckBoxListComponent.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    CheckBoxListComponent.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    CheckBoxListComponent.prototype.clearSearch = function () {
        this.searchFilterText = '';
    };
    CheckBoxListComponent.prototype.toggleDropdown = function () {
        this.isVisible = !this.isVisible;
        if (!this.isVisible) {
            //this.dropdownClosed.emit();
            this.focused.emit(false);
        }
        else {
            this.focused.emit(true);
        }
    };
    CheckBoxListComponent.prototype.isSelected = function (option) {
        return this.model && this.model.indexOf(option.Value) > -1;
    };
    CheckBoxListComponent.prototype.setSelected = function (event, option) {
        if (!this.model) {
            this.model = [];
        }
        var index = this.model.indexOf(option.Value);
        if (index > -1) {
            this.model.splice(index, 1);
        }
        else {
            //if (this.settings.selectionLimit === 0 || this.model.length < this.settings.selectionLimit) {
            this.model.push(option.Value);
        }
        //if (this.settings.closeOnSelect) {
        //     this.toggleDropdown();
        //}
        this.onModelChange(this.model);
    };
    CheckBoxListComponent.prototype.updateNumSelected = function () {
        this.numSelected = this.model && this.model.length || 0;
    };
    CheckBoxListComponent.prototype.updateTitle = function () {
        var _this = this;
        if (this.numSelected === 0) {
            this.title = "Select an option"; //this.texts.defaultTitle;
        }
        else if (3 >= this.numSelected) {
            this.title = this.DataSource
                .filter(function (option) {
                return _this.model && _this.model.indexOf(option.Value) > -1;
            })
                .map(function (option) { return option.Description; })
                .join(', ');
        }
        else {
            this.title = this.numSelected
                + '  selected';
        }
    };
    CheckBoxListComponent.prototype.checkAll = function () {
        this.model = this.DataSource.map(function (option) { return option.Value; });
        this.onModelChange(this.model);
    };
    CheckBoxListComponent.prototype.uncheckAll = function () {
        this.model = [];
        this.onModelChange(this.model);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CheckBoxListComponent.prototype, "DataSource", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CheckBoxListComponent.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], CheckBoxListComponent.prototype, "Disabled", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CheckBoxListComponent.prototype, "focused", void 0);
    __decorate([
        core_1.HostListener('document: click', ['$event.target']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [HTMLElement]), 
        __metadata('design:returntype', void 0)
    ], CheckBoxListComponent.prototype, "onClick", null);
    CheckBoxListComponent = __decorate([
        core_1.Component({
            template: require("./checkBoxList.html"),
            selector: 'checkBoxList',
            providers: [MULTISELECT_VALUE_ACCESSOR],
            host: {
                '(document:click)': 'onClick($event)',
            }
        }), 
        __metadata('design:paramtypes', [matrixService_1.matrixService, core_1.ElementRef])
    ], CheckBoxListComponent);
    return CheckBoxListComponent;
}());
exports.CheckBoxListComponent = CheckBoxListComponent;
//# sourceMappingURL=checkBoxList.js.map