System.register(["@angular/core", '../schematicService', "../schematicpreview/schematicpreview", "../../../services/signalr", "../../../../ReusableComponents/typeahead/typeahead"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, schematicService_1, schematicpreview_1, signalr_1, typeahead_1;
    var SchematicExecution;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (schematicService_1_1) {
                schematicService_1 = schematicService_1_1;
            },
            function (schematicpreview_1_1) {
                schematicpreview_1 = schematicpreview_1_1;
            },
            function (signalr_1_1) {
                signalr_1 = signalr_1_1;
            },
            function (typeahead_1_1) {
                typeahead_1 = typeahead_1_1;
            }],
        execute: function() {
            SchematicExecution = (function () {
                function SchematicExecution(processService) {
                    this.processService = processService;
                    this.ItemName = "";
                    this.processApi = processService;
                }
                SchematicExecution.prototype.ngOnInit = function () {
                    this.getallSchematics();
                    this.autocompleteInput = new Object();
                    this.autocompleteInput.searchSchematics = this.searchSchematics();
                };
                SchematicExecution.prototype.getallSchematics = function () {
                    var _this = this;
                    var subscription = this.processApi.getallSchematics().subscribe(function (res) {
                        _this.allSchematics = res;
                        _this.allSchematicsVM = _this.buildSchematicsVM();
                        subscription.unsubscribe();
                    }, function (error) { }, function () { });
                };
                /// this method provide seeds input for typeahead component
                // and it will be passed via autocompleteInput object
                SchematicExecution.prototype.searchSchematics = function () {
                    var _this = this;
                    return function (filter) {
                        return new Promise(function (resolve, reject) {
                            var subscription = _this.processApi.getallSchematics().subscribe(function (res) {
                                _this.allSchematics = res;
                                var outputList = new Array();
                                _this.allSchematics.forEach(function (x) {
                                    if (x.LookupKey.toUpperCase().indexOf(filter.toUpperCase()) > -1 || x.SchematicId == filter || filter.trim() === '')
                                        outputList.push({
                                            'id': x.SchematicId,
                                            'text': x.LookupKey,
                                        });
                                });
                                resolve(outputList);
                                subscription.unsubscribe();
                            }, function (err) { return console.log("Error in search schematics", err); });
                        });
                    };
                };
                SchematicExecution.prototype.buildSchematicsVM = function () {
                    var newVM = new Array();
                    this.allSchematics.forEach(function (x) {
                        newVM.push({
                            schematicId: x.SchematicId,
                            description: x.LookupKey
                        });
                    });
                    return newVM;
                };
                SchematicExecution.prototype.SchematicSelected = function (schematicID) {
                    this.schematicId = parseInt(schematicID);
                    this.populateSchematicPreviewPage();
                };
                SchematicExecution.prototype.populateSchematicPreviewPage = function () {
                    this.schematicPreview.populateWithSchematicDetails(this.schematicId, true);
                };
                SchematicExecution.prototype.onSchematicSelected = function (schematic) {
                    this.SchematicSelected(schematic.id);
                };
                __decorate([
                    core_1.ViewChild(schematicpreview_1.SchematicPreview), 
                    __metadata('design:type', schematicpreview_1.SchematicPreview)
                ], SchematicExecution.prototype, "schematicPreview", void 0);
                SchematicExecution = __decorate([
                    core_1.Component({
                        templateUrl: '../../../..//Datahub/routes/schematic/execution/schematicExecution.html',
                        styleUrls: ['../../../../../../resources/Datahub/assets/default.css',],
                        directives: [schematicpreview_1.SchematicPreview, typeahead_1.TypeAhead],
                        providers: [schematicService_1.SchematicApiService, signalr_1.signalr]
                    }), 
                    __metadata('design:paramtypes', [schematicService_1.SchematicApiService])
                ], SchematicExecution);
                return SchematicExecution;
            }());
            exports_1("SchematicExecution", SchematicExecution);
        }
    }
});
//# sourceMappingURL=schematicExecution.js.map