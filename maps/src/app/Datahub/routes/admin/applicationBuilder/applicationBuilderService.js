System.register(['@angular/core', "../../../../ReusableServices/httpAbstract", "../../../../ReusableServices/genericfunctions"], function(exports_1, context_1) {
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
    var core_1, httpAbstract_1, genericfunctions_1;
    var ApplicationBuilderApiService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (httpAbstract_1_1) {
                httpAbstract_1 = httpAbstract_1_1;
            },
            function (genericfunctions_1_1) {
                genericfunctions_1 = genericfunctions_1_1;
            }],
        execute: function() {
            ApplicationBuilderApiService = class ApplicationBuilderApiService {
                constructor(httpAbstract) {
                    this.httpAbstract = httpAbstract;
                    this.contentType = 'application/json; charset=utf-8';
                    this.metaDataTreeViewUrl = '/ui/treemodelmetadata';
                    this.publishTreeView = '/treemodel/publish';
                    this.menuItemRoleUrl = '';
                    this.httpAbs = httpAbstract;
                }
                getTreemodelmetadataList() {
                    return this.httpAbs.fetch(this.metaDataTreeViewUrl);
                }
                updateTreemodelmetadata(obj, primaryKeyColumn) {
                    var Id = 0;
                    Id = genericfunctions_1.getIdValue(obj, primaryKeyColumn);
                    return this.httpAbs.updateWithHeader(this.metaDataTreeViewUrl + '/' + Id, JSON.stringify(obj), '', '' //empty headers
                    , this.contentType);
                }
                deleteTreemodelmetadata(obj, primaryKeyColumn) {
                    var Id = 0;
                    Id = genericfunctions_1.getIdValue(obj, primaryKeyColumn);
                    return this.httpAbs.remove(this.metaDataTreeViewUrl + '/' + Id);
                }
                createTreemodelmetadata(obj) {
                    return this.httpAbs.insertWithHeader(this.metaDataTreeViewUrl, JSON.stringify(obj), '', '' //empty headers
                    , this.contentType);
                }
                publishTreemodelmetadata(rootModelName) {
                    return this.httpAbs.insertWithHeader(this.publishTreeView + "/" + rootModelName, '' // rootModelName
                    , '', '' //empty headers
                    , this.contentType);
                }
                getRolesByPage() {
                    return this.httpAbs.fetch(this.metaDataTreeViewUrl);
                }
                ExecuteUpdate(obj, pagename) {
                    switch (pagename.toLowerCase()) {
                    }
                }
                ExecutePageFilter(pagename, filterObject) {
                    switch (pagename.toLowerCase()) {
                    }
                }
                ExecutePageRefresh(pagename, id = null) {
                    switch (pagename.toLowerCase()) {
                        case "applicationbuilder":
                    }
                }
                ExecuteDelete(obj, pagename) {
                    switch (pagename.toLowerCase()) {
                    }
                }
                ExecuteInsert(obj, pagename) {
                    switch (pagename.toLowerCase()) {
                    }
                }
            };
            ApplicationBuilderApiService = __decorate([
                core_1.Injectable(), 
                __metadata('design:paramtypes', [httpAbstract_1.HttpAbstract])
            ], ApplicationBuilderApiService);
            exports_1("ApplicationBuilderApiService", ApplicationBuilderApiService);
        }
    }
});
//# sourceMappingURL=applicationBuilderService.js.map