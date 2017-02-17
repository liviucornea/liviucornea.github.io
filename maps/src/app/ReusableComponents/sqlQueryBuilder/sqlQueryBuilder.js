"use strict";
var core_1 = require("@angular/core");
var httpAbstract_1 = require("../../ReusableServices/httpAbstract");
var alertService_1 = require("../../ReusableServices/alertService");
var sqlQueryBuilder = (function () {
    function sqlQueryBuilder(httpPrx, alt) {
        this.httpPrx = httpPrx;
        this.alt = alt;
        this.newBase = '/schedules/';
        this.pluginValue = "";
        this.visiblePlugin = true;
        this.showValidation = false;
        this.enableInsert = false;
        this.outputNotifier = new core_1.EventEmitter();
        this.isEmptyResult = false;
        this.disableForm();
        this.httpProxy = httpPrx;
        this.alert = alt;
        this.getDaysAttributes();
    }
    sqlQueryBuilder.prototype.ngOnInit = function () {
        this.pluginValue = this.pluginInput;
    };
    sqlQueryBuilder.prototype.getDaysAttributes = function () {
        var _this = this;
        this.httpProxy.fetch(this.newBase + 'dayattributeslimit').subscribe(function (res) {
            _this.transformAttributes(res);
            _this.cleanUp();
        }, function (error) {
            _this.alert.error("async error #" + error.status);
            _this.enableForm();
        }, function () {
        });
    };
    sqlQueryBuilder.prototype.getDaysAttributesValidation = function () {
        var _this = this;
        var fullPath = this.newBase + 'getvaliddaysfordayattribute';
        var tt = '{"LookupDaysWhereClause":"' + this.pluginValue + '"}';
        this.httpProxy.insertJson(fullPath, tt).subscribe(function (res) {
            if (res.DataTable.length === 0) {
                _this.enableInsert = false;
                _this.isEmptyResult = true;
            }
            else {
                _this.enableInsert = true;
                _this.isEmptyResult = false;
                _this.applicableDates = res.DataTable;
                _this.rebuildDates();
            }
        }, function (error) {
            _this.alert.error("async error #" + error.status);
            _this.enableInsert = false;
        }, function () {
        });
    };
    sqlQueryBuilder.prototype.rebuildDates = function () {
        var allDates = this.applicableDates;
        var newUI = new Array();
        allDates.forEach(function (x) {
            var tt = x.ApplicableDate.substring(0, 10);
            var date = new Date(tt);
            newUI.push({ "ApplicableDate": date });
        });
        this.applicableDatesUI = newUI;
    };
    sqlQueryBuilder.prototype.transformAttributes = function (data) {
        var vm = new Array();
        var sequence = 0;
        data.forEach(function (x) {
            vm.push({
                Id: sequence,
                AttributeName: x.AttributeName.replace('[', '').replace(']', ''),
                UpperLimit: x.UpperLimit,
                LowerLimit: x.LowerLimit
            });
        });
        this.attributesVM = vm;
    };
    sqlQueryBuilder.prototype.cleanUp = function () {
    };
    sqlQueryBuilder.prototype.disableForm = function () {
        var dsbControls = new Array();
        var form = document.forms[0];
        var allElements = [].slice.call(form.elements);
        for (var element in allElements) {
            var item = allElements[element];
            var isDisabled = item.disabled;
            if (isDisabled) {
                dsbControls.push(item.id);
            }
            item.readOnly = 'true';
            item.disabled = 'true';
        }
        ;
        this.disabledControles = dsbControls;
    };
    sqlQueryBuilder.prototype.enableForm = function () {
        var form = document.forms[0];
        var allElements = [].slice.call(form.elements);
        for (var element in allElements) {
            var item = allElements[element];
            if (this.disabledControles.indexOf(item.id) === -1) {
                item.readOnly = false;
                item.disabled = false;
                item.enabled = true;
            }
        }
        ;
    };
    sqlQueryBuilder.prototype.validateClicked = function () {
        this.getDaysAttributesValidation();
        this.showValidation = true;
    };
    sqlQueryBuilder.prototype.insertClicked = function () {
        this.enableForm();
        this.outputNotifier.emit({
            value: this.pluginValue.replace("\n", "")
        });
        this.enableInsert = false;
        this.showValidation = false;
        this.visiblePlugin = false;
    };
    sqlQueryBuilder.prototype.resetClicked = function () {
        this.showValidation = false;
        this.pluginValue = "";
        this.enableInsert = false;
    };
    sqlQueryBuilder.prototype.cancelClicked = function () {
        this.enableForm();
        this.visiblePlugin = false;
        this.showValidation = false;
        this.enableInsert = false;
    };
    sqlQueryBuilder.prototype.attributeClicked = function (attr) {
        this.showValidation = false;
        if (this.pluginValue === "") {
            this.pluginValue = " " + attr.AttributeName + "=" + attr.LowerLimit;
        }
        else {
            this.pluginValue = this.pluginValue + '\n' + " AND " + attr.AttributeName + "=" + attr.LowerLimit;
        }
        this.enableInsert = false;
        this.showValidation = false;
    };
    sqlQueryBuilder.prototype.textAreaClicked = function () {
        this.showValidation = false;
        this.enableInsert = false;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], sqlQueryBuilder.prototype, "outputNotifier", void 0);
    __decorate([
        core_1.Input('pluginInput'), 
        __metadata('design:type', Object)
    ], sqlQueryBuilder.prototype, "pluginInput", void 0);
    sqlQueryBuilder = __decorate([
        core_1.Component({
            selector: 'sql-query-builder',
            template: require("./sqlQueryBuilder.html"),
        }), 
        __metadata('design:paramtypes', [httpAbstract_1.HttpAbstract, alertService_1.AlertService])
    ], sqlQueryBuilder);
    return sqlQueryBuilder;
}());
exports.sqlQueryBuilder = sqlQueryBuilder;
//# sourceMappingURL=sqlQueryBuilder.js.map