"use strict";
var NavItem = (function () {
    function NavItem(name, title, lookupKey, routeLink, children, menuType, active) {
        if (active === void 0) { active = false; }
        this.Children = [];
        this.Name = name;
        this.Title = title;
        this.LookupKey = lookupKey;
        this.RouteLink = routeLink;
        this.Children = children;
        this.Active = active;
        this.MenuType = menuType;
    }
    return NavItem;
}());
exports.NavItem = NavItem;
//# sourceMappingURL=navItem.js.map