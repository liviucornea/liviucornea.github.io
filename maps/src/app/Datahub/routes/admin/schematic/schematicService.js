"use strict";
var core_1 = require('@angular/core');
var httpAbstract_1 = require("../../../../ReusableServices/httpAbstract");
var SchematicApiService = (function () {
    function SchematicApiService(httpAbstract) {
        this.httpAbstract = httpAbstract;
        this.prefixurl = '/config';
        this.contentType = 'application/json; charset=utf-8';
        this.configValueTypeBaseUrl = this.prefixurl + '/configvaluetype';
        this.unitbaseurl = this.prefixurl + '/unit';
        this.unittypebaseurl = this.prefixurl + '/unittype';
        this.configvaluebaseurl = this.prefixurl + '/configvalue';
        this.schematicBaseUrl = this.prefixurl + '/schematic';
        this.schematicViewUrl = this.prefixurl + '/schematicconfiguration';
        this.schematicStepurl = this.prefixurl + '/schematicstep';
        this.pipeLineBaseUrl = this.prefixurl + '/pipeline';
        this.pipeLineSchematicBaseUrl = this.prefixurl + '/pipelineschematic';
        this.httpAbs = httpAbstract;
    }
    // pipeline region
    SchematicApiService.prototype.deleteMultiplePipelineSchematics = function (obj) {
        return this.httpAbs.removeBulkRecords(this.pipeLineSchematicBaseUrl + '/multiple', JSON.stringify(obj), '', '', this.contentType);
    };
    SchematicApiService.prototype.getPipelineByDescription = function (descrtiption) {
        return this.httpAbs.fetch(this.pipeLineBaseUrl + '?LookupKey=' + descrtiption);
    };
    SchematicApiService.prototype.insertMultiplePipelineSchematics = function (obj) {
        return this.httpAbs.insertWithHeader(this.pipeLineSchematicBaseUrl + '/multiple', JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    SchematicApiService.prototype.updateMultiplePipelineSchematics = function (obj) {
        return this.httpAbs.updateWithHeader(this.pipeLineSchematicBaseUrl + '/multiple', JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    SchematicApiService.prototype.updatePipeline = function (obj, primaryKeyColumn) {
        var Id = 0;
        Id = this.getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.pipeLineBaseUrl + '/' + Id, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    SchematicApiService.prototype.createPipeline = function (obj) {
        return this.httpAbs.insertWithHeader(this.pipeLineBaseUrl, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    SchematicApiService.prototype.getallPipelines = function () {
        return this.httpAbs.fetch(this.pipeLineBaseUrl);
    };
    SchematicApiService.prototype.getSchematicsForPipelineById = function (id) {
        return this.httpAbs.fetch(this.pipeLineBaseUrl + '/' + id + '/pipelineschematic');
    };
    /// schematic region
    //Clone Schematic by id
    SchematicApiService.prototype.cloneStepToSchematic = function (obj) {
        return this.httpAbs.insertWithHeader(this.schematicBaseUrl + '/clonestep/', JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    SchematicApiService.prototype.deleteStepByStepId = function (id) {
        return this.httpAbs.remove(this.schematicBaseUrl + '/step/' + id);
    };
    //Clone Schematic by id
    SchematicApiService.prototype.cloneSchematicbyId = function (obj) {
        return this.httpAbs.insertWithHeader(this.schematicBaseUrl + '/clone/', JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    SchematicApiService.prototype.genSQLScriptBySchematicId = function (id) {
        return this.httpAbs.fetch(this.schematicBaseUrl + '/promotion/' + id);
    };
    //Start: ConfigValueType
    SchematicApiService.prototype.getConfigValueTypes = function () {
        return this.httpAbs.fetch(this.configValueTypeBaseUrl);
    };
    SchematicApiService.prototype.getConfigValueTypesById = function (id) {
        return this.httpAbs.fetch(this.configValueTypeBaseUrl + '/' + id);
    };
    SchematicApiService.prototype.getConfigValueTypesByUnitId = function (id) {
        return this.httpAbs.fetch(this.unitbaseurl + '/' + id + '/configValueType');
    };
    SchematicApiService.prototype.createConfigValueType = function (obj) {
        return this.httpAbs.insertWithHeader(this.configValueTypeBaseUrl, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    SchematicApiService.prototype.getallSchematics = function () {
        return this.httpAbs.fetch(this.schematicBaseUrl);
    };
    SchematicApiService.prototype.createSchematic = function (obj) {
        return this.httpAbs.insertWithHeader(this.schematicBaseUrl, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    SchematicApiService.prototype.updateSchematic = function (obj, primaryKeyColumn) {
        var Id = 0;
        Id = this.getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.schematicBaseUrl + '/' + Id, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    SchematicApiService.prototype.updateConfigValueType = function (obj, primaryKeyColumn) {
        var Id = 0;
        Id = this.getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.configValueTypeBaseUrl + '/' + Id, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    SchematicApiService.prototype.getIdValue = function (obj, primaryKeyColumn) {
        var Id;
        if (primaryKeyColumn != undefined && primaryKeyColumn != "") {
            for (var i = 0; i < Object.keys(obj).length; i++) {
                if (Object.keys(obj)[i] === primaryKeyColumn || Object.keys(obj)[i] === "Id") {
                    Id = obj[Object.keys(obj)[i]];
                    break;
                }
            }
        }
        return Id;
    };
    SchematicApiService.prototype.deleteConfigValueType = function (obj) {
        return this.httpAbs.remove(this.configValueTypeBaseUrl + '/' + obj.Id);
    };
    //End: ConfigValueType
    //ConfigValue
    SchematicApiService.prototype.updateConfigValues = function (obj, primaryKeyColumn) {
        var Id = 0;
        Id = this.getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.configvaluebaseurl + '/' + Id, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    SchematicApiService.prototype.createConfigValues = function (obj) {
        return this.httpAbs.insertWithHeader(this.configvaluebaseurl, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    SchematicApiService.prototype.deleteConfigValues = function (obj, primaryKeyColumn) {
        var Id = 0;
        Id = this.getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.remove(this.configvaluebaseurl + '/' + Id);
    };
    //Config.Unit
    SchematicApiService.prototype.getConfigUnits = function () {
        return this.httpAbs.fetch(this.unitbaseurl);
    };
    SchematicApiService.prototype.getConfigUnitssById = function (id) {
        return this.httpAbs.fetch(this.unitbaseurl + '/' + id);
    };
    SchematicApiService.prototype.getConfigUnitsFiltered = function (filter) {
        return this.httpAbs.fetchWithFilter(this.unitbaseurl + '/paged', filter, this.contentType);
    };
    SchematicApiService.prototype.getConfigUnitsByUnitTypeId = function (id) {
        return this.httpAbs.fetch(this.unittypebaseurl + '/' + id + '/unit');
    };
    SchematicApiService.prototype.createConfigUnits = function (obj) {
        return this.httpAbs.insertWithHeader(this.unitbaseurl, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    SchematicApiService.prototype.updateConfigUnits = function (obj, primaryKeyColumn) {
        var Id = 0;
        Id = this.getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.unitbaseurl + '/' + Id, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    SchematicApiService.prototype.getSchematicConfiguartionById = function (id) {
        return this.httpAbs.fetch(this.schematicViewUrl + "?schematicId=" + id);
    };
    SchematicApiService.prototype.fetchMultipleForSchematics = function () {
        var processTablesArray = new Array();
        processTablesArray.push("/config/schematic");
        processTablesArray.push("/config/unit");
        processTablesArray.push("/config/configvaluetype");
        processTablesArray.push("/config/unitType");
        //processTablesArray.push("/config/SchematicStep");
        return this.httpAbs.fetchMultiple(processTablesArray);
    };
    SchematicApiService.prototype.fetchMultipleForSchematicConfiguration = function (id) {
        var schematicConfigArray = new Array();
        schematicConfigArray.push(this.schematicViewUrl + "?schematicId=" + id);
        schematicConfigArray.push(this.configValueTypeBaseUrl);
        return this.httpAbs.fetchMultiple(schematicConfigArray);
    };
    SchematicApiService.prototype.getSchematicStepsBySchematicId = function (id) {
        var processTablesArray = new Array();
        processTablesArray.push(this.schematicBaseUrl + "/" + id + '/schematicstep');
        processTablesArray.push("/config/getconfigvaluesbyschematicid?SchematicID=" + id);
        return this.httpAbs.fetchMultiple(processTablesArray);
        //return this.httpAbs.fetch(this.schematicBaseUrl +"/" + id + '/schematicstep');
    };
    SchematicApiService.prototype.createSchematicStep = function (obj) {
        return this.httpAbs.insertWithHeader(this.schematicStepurl, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    SchematicApiService.prototype.updateSchematicStep = function (obj, primaryKeyColumn) {
        var Id = 0;
        Id = this.getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.schematicStepurl + '/' + Id, JSON.stringify(obj), '', '' //empty headers
        , this.contentType);
    };
    SchematicApiService.prototype.ExecuteUpdate = function (obj, pagename, primaryKeyColumn) {
        switch (pagename.toLowerCase()) {
            case "unit_child":
                return this.updateConfigValueType(obj, primaryKeyColumn);
            // break;
            case "unit":
                return this.updateConfigUnits(obj, primaryKeyColumn);
            case "configvalue":
                return this.updateConfigValues(obj, primaryKeyColumn);
        }
    };
    SchematicApiService.prototype.ExecuteInsert = function (obj, pagename) {
        switch (pagename.toLowerCase()) {
            case "unit_child":
                return this.createConfigValueType(obj);
            case "unit":
                return this.createConfigUnits(obj);
            case "configvalue":
                return this.createConfigValues(obj);
            case "schematic":
                return this.createSchematic(obj);
        }
    };
    SchematicApiService.prototype.ExecuteDelete = function (obj, pagename) {
        switch (pagename.toLowerCase()) {
            case "unit_child":
                return this.deleteConfigValueType(obj);
        }
    };
    SchematicApiService.prototype.ExecutePageRefresh = function (pagename, id) {
        if (id === void 0) { id = null; }
        switch (pagename.toLowerCase()) {
            case "unit_child":
                return this.getConfigValueTypesByUnitId(id);
            case "unit":
                return this.getConfigUnits();
            case "unittype_child":
                return this.getConfigUnitsByUnitTypeId(id);
        }
    };
    SchematicApiService.prototype.ExecutePageFilter = function (pagename, filterObject) {
        switch (pagename.toLowerCase()) {
            case "unit":
                return this.getConfigUnitsFiltered(filterObject);
        }
    };
    SchematicApiService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [httpAbstract_1.HttpAbstract])
    ], SchematicApiService);
    return SchematicApiService;
}());
exports.SchematicApiService = SchematicApiService;
//# sourceMappingURL=schematicService.js.map