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
var forms_1 = require("@angular/forms");
exports.CUSTOM_PAGINATION_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return Pagination; }),
    multi: true
};
var Pagination = (function () {
    function Pagination() {
        this.isInit = false;
        this.boundaryLinks = false;
        this.directionLinks = true;
        // labels
        this.firstText = 'First';
        this.previousText = 'Previous';
        this.nextText = 'Next';
        this.lastText = 'Last';
        this.rotate = true;
        this.numPages = new core_1.EventEmitter();
        this.pageChanged = new core_1.EventEmitter();
        this.currentMasterPage = 1;
        this.currentChildPage = 1;
        this._isChildPage = false;
        this.onChange = function (_) {
        };
        this.onTouched = function () {
        };
    }
    Object.defineProperty(Pagination.prototype, "page", {
        get: function () {
            return (this.IsChildPage) ? this.currentChildPage : this.currentMasterPage;
        },
        set: function (value) {
            var _page = (value > this.totalPages) ? this.totalPages : (value || 1);
            if (this.isInit) {
                this.pageChanged.emit({
                    page: (this.IsChildPage) ? this.currentChildPage = _page : this.currentMasterPage = _page
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pagination.prototype, "IsChildPage", {
        get: function () {
            return this._isChildPage;
        },
        set: function (v) {
            this._isChildPage = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pagination.prototype, "totalPages", {
        get: function () {
            return this._totalPages;
        },
        set: function (v) {
            this._totalPages = v;
            this.numPages.emit(v);
            if (this.isInit) {
                this.selectPage(this.page);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pagination.prototype, "totalItems", {
        get: function () {
            return this._totalItems;
        },
        set: function (v) {
            this._totalItems = v;
            this.totalPages = this.calculateTotalPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pagination.prototype, "itemsPerPage", {
        get: function () {
            return this._itemsPerPage;
        },
        set: function (v) {
            this._itemsPerPage = v;
            this.totalPages = this.calculateTotalPages();
        },
        enumerable: true,
        configurable: true
    });
    Pagination.prototype.ngOnInit = function () {
        this.totalPages = this.calculateTotalPages();
        this.pages = this.getPages(this.page, this.totalPages);
        this.page = 1;
    };
    Pagination.prototype.calculateTotalPages = function () {
        var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage);
        return Math.max(totalPages || 0, 1);
    };
    Pagination.prototype.getPages = function (currentPage, totalPages) {
        var pages = [];
        // Default page limits
        var startPage = 1;
        var endPage = totalPages;
        var isMaxSized = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;
        // recompute if maxSize
        if (isMaxSized) {
            if (this.rotate) {
                // Current page is displayed in the middle of the visible ones
                startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 1);
                endPage = startPage + this.maxSize - 1;
                // Adjust if limit is exceeded
                if (endPage > totalPages) {
                    endPage = totalPages;
                    startPage = endPage - this.maxSize + 1;
                }
            }
            else {
                // Visible pages are paginated with maxSize
                startPage = ((Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize) + 1;
                // Adjust last page if limit is exceeded
                endPage = Math.min(startPage + this.maxSize - 1, totalPages);
            }
        }
        // Add page number links
        for (var number = startPage; number <= endPage; number++) {
            var page = this.makePage(number, number.toString(), number === currentPage);
            pages.push(page);
        }
        // Add links to move between page sets
        if (isMaxSized && !this.rotate) {
            if (startPage > 1) {
                var previousPageSet = this.makePage(startPage - 1, '...', false);
                pages.unshift(previousPageSet);
            }
            if (endPage < totalPages) {
                var nextPageSet = this.makePage(endPage + 1, '...', false);
                pages.push(nextPageSet);
            }
        }
        return pages;
    };
    Pagination.prototype.writeValue = function (value) {
        this.page = value;
        this.pages = this.getPages(this.page, this.totalPages);
        if (!this.isInit) {
            this.isInit = true;
        }
    };
    Pagination.prototype.selectPage = function (page, event) {
        if (event) {
            event.preventDefault();
        }
        if (!this.disabled) {
            if (event && event.target) {
                var target = event.target;
                target.blur();
            }
            this.writeValue(page);
            this.pageChanged.emit({
                page: this.page
            });
        }
    };
    Pagination.prototype.getText = function (key) {
        return key;
    };
    Pagination.prototype.noPrevious = function () {
        return this.page === 1;
    };
    Pagination.prototype.noNext = function () {
        return this.page === this.totalPages;
    };
    // Create page object used in template
    Pagination.prototype.makePage = function (number, text, isActive) {
        return {
            number: number,
            text: text,
            active: isActive
        };
    };
    Pagination.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    Pagination.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Pagination.prototype, "maxSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Pagination.prototype, "boundaryLinks", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Pagination.prototype, "directionLinks", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Pagination.prototype, "firstText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Pagination.prototype, "previousText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Pagination.prototype, "nextText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Pagination.prototype, "lastText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Pagination.prototype, "rotate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Pagination.prototype, "disabled", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Pagination.prototype, "numPages", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Pagination.prototype, "pageChanged", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Pagination.prototype, "IsChildPage", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Pagination.prototype, "totalItems", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Pagination.prototype, "itemsPerPage", null);
    Pagination = __decorate([
        core_1.Component({
            template: require("./pagination.html"),
            selector: 'pagination',
            providers: [exports.CUSTOM_PAGINATION_ACCESSOR],
        }), 
        __metadata('design:paramtypes', [])
    ], Pagination);
    return Pagination;
}());
exports.Pagination = Pagination;
//# sourceMappingURL=pagination.js.map