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
var TypeAhead = (function () {
    function TypeAhead(el) {
        this.el = el;
        // public  search: (term: string) => Promise<Array<{ id: string, text: string }>>;
        this.placeholderText = 'Start typing the value you search for here ...';
        this.focused = new core_1.EventEmitter();
        this.itemDescriptionChanged = new core_1.EventEmitter();
        this.selected = new core_1.EventEmitter();
        this.term = "";
        this.listCmp = [];
        this.refreshTimer = undefined;
        this.searchInProgress = false;
        this.searchRequired = false;
    }
    TypeAhead.prototype.ngAfterViewInit = function () {
        this.theInput.first.nativeElement.focus();
    };
    TypeAhead.prototype.onKey = function (event) {
        var _this = this;
        if (event.keyCode === 27) {
            this.listCmp = [];
            event.target.value = null;
            return;
        }
        this.term = event.target.value;
        if (!this.refreshTimer) {
            this.refreshTimer = setTimeout(function () {
                if (!_this.searchInProgress) {
                    _this.doSearch(event.keyCode);
                }
                else {
                    _this.searchRequired = true;
                }
            }, 200);
        }
    };
    TypeAhead.prototype.doSearch = function (keyCode) {
        var self = this;
        self.refreshTimer = undefined;
        if (self.search && self.term !== "") {
            self.searchInProgress = true;
            self.search(self.term)
                .then(function (res) {
                self.searchInProgress = false;
                if (self.searchRequired) {
                    self.searchRequired = false;
                    self.listCmp = [];
                    self.doSearch(keyCode);
                }
                else {
                    if (keyCode === 13 && parseInt(self.term) && res.find(function (x) { return x.id == self.term; })) {
                        self.listCmp = [];
                        self.selected.emit({ 'id': self.term, 'text': '' });
                    }
                    else {
                        self.displayList(res);
                    }
                }
            });
        }
    };
    TypeAhead.prototype.displayList = function (list) {
        this.listCmp = list;
    };
    TypeAhead.prototype.selectItem = function (item) {
        this.selected.emit(item);
        if (this.listCmp) {
            this.listCmp = [];
            this.itemDescription = item.id + ' - ' + item.text;
        }
    };
    TypeAhead.prototype.reset = function () {
        this.listCmp = [];
        this.itemDescription = '';
    };
    __decorate([
        core_1.ViewChildren('theInput'), 
        __metadata('design:type', Object)
    ], TypeAhead.prototype, "theInput", void 0);
    __decorate([
        core_1.Input("search"), 
        __metadata('design:type', Function)
    ], TypeAhead.prototype, "search", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TypeAhead.prototype, "placeholderText", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TypeAhead.prototype, "focused", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TypeAhead.prototype, "itemDescriptionChanged", void 0);
    __decorate([
        core_1.Output("onSelected"), 
        __metadata('design:type', Object)
    ], TypeAhead.prototype, "selected", void 0);
    TypeAhead = __decorate([
        core_1.Component({
            selector: "typeahead-input",
            host: {
                "(keyup)": "onKey($event)"
            },
            template: require("./typeahead.html")
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], TypeAhead);
    return TypeAhead;
}());
exports.TypeAhead = TypeAhead;
//# sourceMappingURL=typeahead.js.map