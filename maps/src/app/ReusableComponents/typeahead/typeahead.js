"use strict";
var core_1 = require("@angular/core");
var TypeAhead = (function () {
    function TypeAhead(el) {
        this.el = el;
        // public  search: (term: string) => Promise<Array<{ id: string, text: string }>>;
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