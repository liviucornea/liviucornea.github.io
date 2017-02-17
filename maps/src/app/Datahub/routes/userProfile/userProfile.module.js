"use strict";
/**
 * Created by vikhnv2 on 11/30/2016.
 */
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var SharedModule_1 = require('../../../ReusableComponents/SharedModule');
// import {TreeViewModule} from '../../../ReusableComponents/treeView/TreeViewModule';
var userProfile_component_1 = require('./userProfile.component');
var userProfile_routes_1 = require('./userProfile.routes');
var userProfile_service_1 = require('./userProfile.service');
var collapsePanel_component_1 = require('../../../ReusableComponents/collapsePanel/collapsePanel.component');
var UserProfileModule = (function () {
    function UserProfileModule() {
    }
    UserProfileModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                SharedModule_1.SharedModule,
                // TreeViewModule,
                userProfile_routes_1.UserProfileRouting
            ],
            declarations: [
                userProfile_component_1.UserProfile,
                collapsePanel_component_1.CollapsePanel
            ],
            providers: [userProfile_service_1.UserProfileService]
        }), 
        __metadata('design:paramtypes', [])
    ], UserProfileModule);
    return UserProfileModule;
}());
exports.UserProfileModule = UserProfileModule;
//# sourceMappingURL=userProfile.module.js.map