"use strict";
/**
 * Created by vikhnv2 on 12/2/2016.
 */
var core_1 = require('@angular/core');
var displayGrid_1 = require('../displayGrid/displayGrid');
var CollapsePanel = (function () {
    function CollapsePanel() {
        this.collapsed = true;
        this.enabled = false;
        //
    }
    CollapsePanel.prototype.collapsePanel = function (collapse) {
        this.collapsed = collapse;
    };
    CollapsePanel.prototype.setPanelContent = function (dataGridConfig, dataContent) {
        this.dataContent = dataContent;
        this.enabled = (dataContent && dataContent.length > 0);
        this.dataTable.injectConfigAndData(dataGridConfig, dataContent, null, null);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CollapsePanel.prototype, "key", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CollapsePanel.prototype, "title", void 0);
    __decorate([
        core_1.ViewChild(displayGrid_1.DisplayGridComponent), 
        __metadata('design:type', displayGrid_1.DisplayGridComponent)
    ], CollapsePanel.prototype, "dataTable", void 0);
    CollapsePanel = __decorate([
        core_1.Component({
            selector: 'collapse-panel',
            template: require('./collapsePanel.html'),
        }), 
        __metadata('design:paramtypes', [])
    ], CollapsePanel);
    return CollapsePanel;
}());
exports.CollapsePanel = CollapsePanel;
//# sourceMappingURL=collapsePanel.component.js.map