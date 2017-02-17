"use strict";
var core_1 = require("@angular/core");
var navItem_1 = require("../ReusableComponents/navbarVert/navItem");
var router_1 = require("@angular/router");
var localizationService_1 = require("./localizationService");
var apiService_1 = require("./apiService");
var common_1 = require("@angular/common");
var NavigationService = (function () {
    function NavigationService(router, localizationService, apiService, loc) {
        this.router = router;
        this.localizationService = localizationService;
        this.apiService = apiService;
        this.loc = loc;
        this.mainPageFilteredArray = "";
        this.breadCrumbList = [];
        this.pageTitle = "";
        this.navigationCb = new core_1.EventEmitter();
        this.navigationLeftMenuEmitter = new core_1.EventEmitter();
        this.allowedPageArray = new Array();
        this.bredCrumbEmitter = new core_1.EventEmitter();
        this.rtService = router;
    }
    NavigationService.prototype.getMainPageNavigation = function (profile) {
        this.mainPageNavigationArray = this.getNavigationStructure(profile.Children);
        return this.mainPageNavigationArray;
    };
    NavigationService.prototype.getFiltertedPageNavigation = function (parentName) {
        var myChildren = this.mainPageNavigationArray.find(function (p) { return p.Name == parentName; }).Children;
        this.mainPageFilteredArray = JSON.stringify(myChildren);
    };
    NavigationService.prototype.getNavigationStructure = function (navigationArray) {
        var navContent = [];
        var children = [];
        if (navigationArray && navigationArray.length) {
            for (var index = 0; index < navigationArray.length; index++) {
                var temp = navigationArray[index];
                children = [];
                if (temp.Children && temp.Children.length > 0) {
                    children = this.getNavigationStructure(temp.Children);
                    var t = 0;
                }
                if (temp) {
                    if (temp.ParamValue) {
                        temp.RouteParts.push(temp.ParamValue);
                    }
                    navContent.push(new navItem_1.NavItem(temp.LookupKey, temp.Title, temp.LookupKey, temp.RouteParts, children, temp.MenuType));
                }
            }
        }
        return navContent;
    };
    NavigationService.prototype.buildNavigationMenu = function (navigationArray) {
        var navContent = [];
        var children = [];
        if (navigationArray && navigationArray.length) {
            for (var index = 0; index < navigationArray.length; index++) {
                var temp = navigationArray[index];
                children = [];
                if (temp.Children && temp.Children.length > 0) {
                    children = this.buildNavigationMenu(temp.Children);
                }
                if (temp && temp.MenuType != "NONE") {
                    if (temp.ParamValue) {
                        temp.RouteLink.push(temp.ParamValue);
                    }
                    var formattedTitle = this.localizationService.getLocalizedValueDescription(temp.LookupKey);
                    navContent.push(new navItem_1.NavItem(temp.LookupKey, formattedTitle, temp.LookupKey, temp.RouteLink, children, temp.MenuType, temp.Active));
                }
            }
        }
        return navContent;
    };
    NavigationService.prototype.getChildMenu = function (input) {
        if (input === void 0) { input = []; }
        if (this.mainPageFilteredArray) {
            var navItems = JSON.parse(this.mainPageFilteredArray);
            this.GetTempNavigationArray(navItems, input);
            this.navigationCb.emit(navItems);
            this.navigationLeftMenuEmitter.emit([]);
            return navItems;
        }
    };
    NavigationService.prototype.setCurrentPage = function (urlPath) {
        this.breadCrumbList = [];
        var routeStringList = urlPath.split(/[//]+/).filter(function (e) { return e; });
        var lenArray = routeStringList.length;
        if (lenArray > 0 && this.mainPageNavigationArray) {
            var lastRoute = routeStringList[lenArray - 1];
            var tempParamsList = lastRoute.split(";");
            routeStringList[lenArray - 1] = tempParamsList[0];
            var paramCount = 0;
            var modelName = "";
            if (Object.prototype.toString.call(tempParamsList) === '[object Array]') {
                tempParamsList.forEach(function (x) {
                    if (paramCount > 0) {
                        var formattedData = x.split("=");
                        if (formattedData[0].toLowerCase() == 'modelname') {
                            modelName = formattedData[1];
                        }
                    }
                    paramCount++;
                });
            }
            if (modelName) {
                routeStringList[lenArray - 1] = modelName;
            }
            this.buildBreadCrumbList(routeStringList, this.mainPageNavigationArray);
        }
        this.setPageTitle();
        this.bredCrumbEmitter.emit(this.breadCrumbList);
    };
    NavigationService.prototype.buildBreadCrumbList = function (routeStringList, navItemList) {
        if (routeStringList.length > 0) {
            var routeName = routeStringList[0];
            var tempNavItem = navItemList.find(function (p) { return p.Name.toLowerCase() == routeName.toLowerCase(); });
            if (tempNavItem) {
                var formattedTitle = this.localizationService.getLocalizedValueDescription(tempNavItem.LookupKey);
                this.breadCrumbList.push({ Title: formattedTitle, RouteLink: tempNavItem.RouteLink });
                routeStringList.splice(0, 1);
                if (routeStringList.length > 0) {
                    this.buildBreadCrumbList(routeStringList, tempNavItem.Children);
                }
            }
        }
    };
    NavigationService.prototype.setPageTitle = function () {
        this.pageTitle = "";
        if (this.breadCrumbList && this.breadCrumbList.length > 0) {
            var lenArray = this.breadCrumbList.length;
            this.pageTitle = this.breadCrumbList[lenArray - 1].Title;
        }
    };
    NavigationService.prototype.NavigateToPage = function (items, pageName) {
        if (!items) {
            this.router.navigate(['Datahub/Home']);
            return;
        }
        var path;
        if (pageName) {
            var item = items.find(function (x) { return x.Name === pageName; });
            if (item.Children.length > 0) {
                path = item.Children[0].RouteLink;
            }
        }
        else {
            path = items[0].RouteLink;
        }
        if (path) {
            if (path.length) {
                var link = '';
                path.forEach(function (x) {
                    link = link + '/' + x;
                });
                var arr = [];
                arr.push(link);
                if (arr)
                    this.router.navigate(arr);
            }
        }
    };
    NavigationService.prototype.NavigateByLocationUrl = function (urlPath) {
        var routeStringList = urlPath.split(/[//]+/).filter(function (e) { return e; });
        var lenArray = routeStringList.length;
        var routeArray = [];
        var childMenuArrayList = [];
        var tempCustomChildMenuList = [];
        if (routeStringList.length > 0) {
            var lastRoute = routeStringList[lenArray - 1];
            var tempParamsList = lastRoute.split(";");
            routeStringList[lenArray - 1] = tempParamsList[0];
            var count = 0;
            routeStringList.forEach(function (x) {
                routeArray.push(x);
                if (count > 0) {
                    childMenuArrayList.push(x);
                    tempCustomChildMenuList.push(x);
                }
                count++;
            });
            //Adding parameters to route navigation
            var paramCount = 0;
            var modelName = "";
            if (Object.prototype.toString.call(tempParamsList) === '[object Array]') {
                tempParamsList.forEach(function (x) {
                    if (paramCount > 0) {
                        var formattedData = x.split("=");
                        if (formattedData[0].toLowerCase() == 'modelname') {
                            modelName = formattedData[1];
                        }
                    }
                    paramCount++;
                });
            }
            if (modelName && tempCustomChildMenuList.length > 0) {
                tempCustomChildMenuList[tempCustomChildMenuList.length - 1] = modelName;
            }
            this.getChildMenu(tempCustomChildMenuList);
            this.getLeftMenuRoutes(childMenuArrayList, (modelName) ? modelName : routeStringList[lenArray - 1]);
        }
        this.setCurrentPage(urlPath);
    };
    NavigationService.prototype.GetTempNavigationArray = function (navItems, inputData) {
        if (navItems === void 0) { navItems = []; }
        if (inputData === void 0) { inputData = []; }
        if (inputData.length > 0) {
            var x = navItems.find(function (p) { return p.Name == inputData[0]; });
            if (x && x.Children) {
                x.Active = true;
                this.leftMenuItems = x;
                var y = inputData.slice(1, 2);
                if (y.length > 0) {
                    this.GetTempNavigationArray(x.Children, y);
                }
            }
        }
    };
    NavigationService.prototype.getLeftMenuRoutes = function (inputData, childName) {
        if (inputData === void 0) { inputData = []; }
        if (childName === void 0) { childName = ""; }
        var tempLeftMenuItems = [];
        if (this.leftMenuItems && this.leftMenuItems.Children && this.leftMenuItems.Children.length > 0) {
            this.getTempLeftMenuArray(this.leftMenuItems.Children, inputData);
            tempLeftMenuItems = this.leftMenuItems.Children;
            if (childName) {
                var tempItem = tempLeftMenuItems.find(function (p) { return p.Name.toLowerCase() == childName.toLowerCase(); });
                if (tempItem) {
                    tempItem.Active = true;
                }
            }
        }
        this.navigationLeftMenuEmitter.emit(tempLeftMenuItems);
        return tempLeftMenuItems;
    };
    NavigationService.prototype.getTempLeftMenuArray = function (navItems, inputData) {
        if (navItems === void 0) { navItems = []; }
        if (inputData === void 0) { inputData = []; }
        if (inputData.length > 0) {
            var x = navItems.find(function (p) { return p.Name == inputData[0]; });
            if (x && x.Children) {
                var y = inputData.slice(1, 2);
                if (y.length > 0) {
                    this.getTempLeftMenuArray(x.Children, y);
                }
            }
        }
    };
    NavigationService.prototype.getChildMenusForTileView = function (leftchildmenuName) {
        var tempLeftMenuItems = [];
        if (this.leftMenuItems && this.leftMenuItems.Children && this.leftMenuItems.Children.length > 0) {
            var tempLeftMenuItemChildren = this.leftMenuItems.Children.find(function (p) { return p.Name.toLowerCase() == leftchildmenuName.toLowerCase(); });
            if (tempLeftMenuItemChildren && tempLeftMenuItemChildren.Children) {
                tempLeftMenuItems = tempLeftMenuItemChildren.Children;
            }
        }
        //this.navigationLeftMenuEmitter.emit(tempLeftMenuItems);
        return tempLeftMenuItems;
    };
    NavigationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router, localizationService_1.LocalizationService, apiService_1.ApiService, common_1.Location])
    ], NavigationService);
    return NavigationService;
}());
exports.NavigationService = NavigationService;
//# sourceMappingURL=navigationService.js.map