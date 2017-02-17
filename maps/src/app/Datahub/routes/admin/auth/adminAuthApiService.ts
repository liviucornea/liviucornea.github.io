import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ApiService} from "../../../../ReusableServices/apiService";
import {HttpAbstract} from "../../../../ReusableServices/httpAbstract";
import {AdminApiService} from "../adminApiService";
import {getIdValue} from "../../../../ReusableServices/genericfunctions";

@Injectable()
export class AdminAuthApiService {

    prefixurl: string = '/auth';
    contentType: string = 'application/json; charset=utf-8';

    userbaseurl: string = this.prefixurl + '/user';
    rolebaseurl: string = this.prefixurl + '/role';
    resourcebaseurl: string = this.prefixurl + '/resource';
    roleresourcebaseurl: string = this.prefixurl + '/roleresource';
    userrolebaseurl: string = this.prefixurl + '/userrole';
    latestalertbaseurl: string = '/notification/getalert?UserId=';
    alertbaseurl: string = '/notification/alert';
    applicationsListUrl: string = this.prefixurl + '/application';
    roleApplicationUrl: string = this.prefixurl + '/roleapplication';
    roleApplicationMenuItemUrl: string = this.prefixurl + '/roleapplicationmenuitem';
    roleapplicationresource: string = this.prefixurl + '/roleapplicationresource';

    constructor(private httpAbs:HttpAbstract, private apiService: ApiService, private adminApiService: AdminApiService) {
        this.httpAbs.setBaseAddress(this.apiService.base);
    }

    getUserFiltered(filter: string): Observable<any> {
        return this.httpAbs.fetchWithFilter(this.userbaseurl + '/paged'
            , filter
            , this.contentType);
    }

    getAuthUserRolesByUserId(id) {
        return this.httpAbs.fetch(this.userbaseurl + '/' + id + '/userrole');
    }
    createUserRole(obj) {
        return this.httpAbs.insertWithHeader(this.userrolebaseurl
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }

    updateUserRole(obj) {
        return this.httpAbs.updateWithHeader(this.userrolebaseurl + '/' + obj.Id
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }

    deleteUserRole(obj) {
        return this.httpAbs.remove(
            this.userrolebaseurl + '/' + obj.Id
        );
    }


    getRoleFiltered(filter: string): Observable<any> {
        return this.httpAbs.fetchWithFilter(this.rolebaseurl + '/paged'
            , filter
            , this.contentType);
    }

    getAuthUser(id = null) {
        if (id) {
            return this.httpAbs.fetch(this.userbaseurl + '/' + id);
        } else {
            return this.httpAbs.fetch(this.userbaseurl);
        }
    }
    createAuthUser(obj) {
        return this.httpAbs.insertWithHeader(this.userbaseurl
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }

    updateAuthUser(obj) {
        return this.httpAbs.updateWithHeader(this.userbaseurl + '/' + obj.Id
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }
    deleteAuthUser(obj) {
        return this.httpAbs.remove(
            this.userbaseurl + '/' + obj.Id
        );
    }

    getAuthRole(id = null) {
        if (id) {
            return this.httpAbs.fetch(this.rolebaseurl + '/' + id);
        } else {
            return this.httpAbs.fetch(this.rolebaseurl);
        }
    }
    createAuthRole(obj) {
        return this.httpAbs.insertWithHeader(this.rolebaseurl
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }
    updateAuthRole(obj) {
        return this.httpAbs.updateWithHeader(this.rolebaseurl + '/' + obj.Id
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }
    deleteAuthRole(obj) {
        return this.httpAbs.remove(
            this.rolebaseurl + '/' + obj.Id
        );
    }

    getAuthResource(id = null) {
        if (id) {
            return this.httpAbs.fetch(this.resourcebaseurl + '/' + id);
        }
        else {
            return this.httpAbs.fetch(this.resourcebaseurl);
        }
    }

    getResourceFiltered(filter: string): Observable<any> {
        return this.httpAbs.fetchWithFilter(this.resourcebaseurl + '/paged'
            , filter
            , this.contentType);
    }
    createAuthResource(obj) {
        return this.httpAbs.insertWithHeader(this.resourcebaseurl
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }
    updateAuthResource(obj) {
        return this.httpAbs.updateWithHeader(this.resourcebaseurl + '/' + obj.Id
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }
    deleteAuthResource(obj) {
        return this.httpAbs.remove(
            this.resourcebaseurl + '/' + obj.Id
        );
    }

    getAuthRoleResource(id = null) {
        if (id) {
            return this.httpAbs.fetch(this.roleresourcebaseurl + '/' + id);
        }
        else {
            return this.httpAbs.fetch(this.roleresourcebaseurl);
        }
    }

    getAuthRoleByResourceId(id) {
        return this.httpAbs.fetch(this.resourcebaseurl + '/' + id + '/roleresource');
    }

    getAuthRoleByRoleId(id) {
        return this.httpAbs.fetch(this.rolebaseurl + '/' + id + '/roleresource');
    }

    createAuthRoleResource(obj) {
        return this.httpAbs.insertWithHeader(this.roleresourcebaseurl
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }
    updateAuthRoleResource(obj) {
        return this.httpAbs.updateWithHeader(this.roleresourcebaseurl + '/' + obj.Id
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }
    deleteAuthRoleResource(obj) {
        return this.httpAbs.remove(
            this.roleresourcebaseurl + '/' + obj.Id
        );
    }

    getAuthUserRole() {
        return this.httpAbs.fetch(this.userrolebaseurl);
    }
    createAuthUserRole(obj) {
        return this.httpAbs.insertWithHeader(this.userrolebaseurl
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }
    updateAuthUserRole(obj) {
        return this.httpAbs.updateWithHeader(this.userrolebaseurl + '/' + obj.Id
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);

    }
    deleteAuthUserRole(obj) {
        return this.httpAbs.remove(
            this.userrolebaseurl + '/' + obj.Id
        );
    }

    //Notification Alert functions
    getLatestAlert(id) {
        return this.httpAbs.fetch(this.latestalertbaseurl + id);
    }

    getNotificationAlerts(id = null) {
        if (id) {
            return this.httpAbs.fetch(this.alertbaseurl + '/' + id);
        }
        else {
            return this.httpAbs.fetch(this.alertbaseurl);
        }
    }
    getAlertFiltered(filter: string): Observable<any> {
        return this.httpAbs.fetchWithFilter(this.alertbaseurl + '/paged'
            , filter
            , this.contentType);
    }

    createNotificationAlert(obj) {
        return this.httpAbs.insertWithHeader(this.alertbaseurl
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }

    updateNotificationAlert(obj) {
        return this.httpAbs.updateWithHeader(this.alertbaseurl + '/' + obj.Id
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);

    }


    //Applications List region
    getAuthApplicationsList() {
        return this.httpAbs.fetch(this.applicationsListUrl);
    }
    createAuthApplication(obj) {
        return this.httpAbs.insertWithHeader(this.applicationsListUrl
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }

    updateAuthApplication(obj, primaryKeyColumn) {
        var id = getIdValue(obj,primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.applicationsListUrl + '/' + id
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }

    deleteAuthApplication(obj,primaryKeyColumn) {
        var id = getIdValue(obj,primaryKeyColumn);
        return this.httpAbs.remove(
            this.applicationsListUrl + '/' + id
        );
    }

    //RoleApplication Region
    getRoleApplicationUrl(applicationId)
    {
        return this.applicationsListUrl + '/' + applicationId + '/roleapplication';
    }

    getApplicationRolesByApplicationId(applicationId)
    {
        return this.httpAbs.fetch(this.getRoleApplicationUrl(applicationId));
    }

    deleteApplicationRole(obj,primaryKeyColumn) {
        var id = getIdValue(obj,primaryKeyColumn);
        return this.httpAbs.remove(
            this.roleApplicationUrl + '/' + id
        );
    }

    createRoleApplication(obj) {
        return this.httpAbs.insertWithHeader(this.roleApplicationUrl
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }

    updateRoleApplication(obj, primaryKeyColumn) {
        var id = getIdValue(obj,primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.roleApplicationUrl + '/' + id
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }


    getRoleApplicationMenuItems(roleApplicationId)
    {
        return this.httpAbs.fetch(this.roleApplicationUrl + '/' + roleApplicationId + '/roleapplicationmenuitem')
    }

    updateRoleApplicationMenuItem(obj,primaryKeyColumn)
    {
        var id = getIdValue(obj,primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.roleApplicationMenuItemUrl + '/' + id
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }

    createRoleApplicationMenuItem(obj) {
        return this.httpAbs.insertWithHeader(this.roleApplicationMenuItemUrl
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }

    deleteRoleApplicationMenuItem(obj,primaryKeyColumn) {
        var id = getIdValue(obj,primaryKeyColumn);
        return this.httpAbs.remove(
            this.roleApplicationMenuItemUrl + '/' + id
        );
    }

    getRoleApplicationResources(roleApplicationId)
    {
        return this.httpAbs.fetch(this.roleApplicationUrl + '/' + roleApplicationId + '/roleapplicationresource')
    }

    updateRoleApplicationResources(obj,primaryKeyColumn)
    {
        var id = getIdValue(obj,primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.roleapplicationresource + '/' + id
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }

    createRoleApplicationResources(obj) {
        return this.httpAbs.insertWithHeader(this.roleapplicationresource
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }

    deleteRoleApplicationResources(obj,primaryKeyColumn) {
        var id = getIdValue(obj,primaryKeyColumn);
        return this.httpAbs.remove(
            this.roleapplicationresource + '/' + id
        );
    }

    getAutoCompleteInfo(componentName)
    {
        return this.getAuthApplicationsList();
    }

    ExecuteUpdate(obj, pagename, primaryKeyColumn = "")
    {
        switch(pagename.toLowerCase())
        {
            case "user":
                return this.updateAuthUser(obj);
            case "role":
                return this.updateAuthRole(obj);
            case "resource":
                return this.updateAuthResource(obj);
            case "role_child":
            case "resource_child":
                return this.updateAuthRoleResource(obj);
            case "user_child":
                return this.updateUserRole(obj);
            case "alert":
                return this.updateNotificationAlert(obj);
            case "applicationslist":
                return this.updateAuthApplication(obj,primaryKeyColumn);
            case "applicationslist_child":
                return this.updateRoleApplication(obj,primaryKeyColumn);
            case "roleapplicationmenuitem":
                return this.updateRoleApplicationMenuItem(obj, primaryKeyColumn);
            case "roleapplicationresource":
                return this.updateRoleApplicationResources(obj, primaryKeyColumn);
        }
    }

    ExecutePageFilter(pagename, filterObject: string) {
        switch (pagename.toLowerCase()) {
            case "user":
                return this.getUserFiltered(filterObject);
            case "role":
                return this.getRoleFiltered(filterObject);
            case "resource":
                return this.getResourceFiltered(filterObject);
            case "alert":
                return this.getAlertFiltered(filterObject);
        }
    }


    ExecutePageRefresh(pagename,id = null)
    {
        switch(pagename.toLowerCase())
        {
            case "user":
                return this.getAuthUser();
            case "role":
                return this.getAuthRole();
            case "resource":
                return this.getAuthResource();
            case "role_child":
                return this.getAuthRoleByRoleId(id);
            case "resource_child":
                return this.getAuthRoleByResourceId(id);
            case "user_child":
                return this.getAuthUserRolesByUserId(id);
            case "alert":
                return this.getNotificationAlerts(id);
            case "applicationslist":
                return this.getAuthApplicationsList();
            case "applicationslist_child":
                return this.getApplicationRolesByApplicationId(id);
            case "roleapplicationmenuitem":
                return this.getRoleApplicationMenuItems(id);
            case "roleapplicationresource":
                return this.getRoleApplicationResources(id);
        }
    }

    ExecuteDelete(obj, pagename, primaryKeyColumn="") {
        switch (pagename.toLowerCase()) {
            case "user":
                return this.deleteAuthUser(obj);
            case "role":
                return this.deleteAuthRole(obj);
            case "resource":
                return this.deleteAuthResource(obj);
            case "role_child":
            case "resource_child":
                return this.deleteAuthRoleResource(obj);
            case "user_child":
                return this.deleteUserRole(obj);
            case "applicationslist":
                return this.deleteAuthApplication(obj,primaryKeyColumn);
            case "applicationslist_child":
                return this.deleteApplicationRole(obj, primaryKeyColumn);
            case "roleapplicationmenuitem":
                return this.deleteRoleApplicationMenuItem(obj,primaryKeyColumn);
            case "roleapplicationresource":
                return this.deleteRoleApplicationResources(obj,primaryKeyColumn);

        }
    }

    ExecuteInsert(obj, pagename) {
        switch (pagename.toLowerCase()) {
            case "user":
                return this.createAuthUser(obj);
            case "role":
                return this.createAuthRole(obj);
            case "resource":
                return this.createAuthResource(obj);
            case "role_child":
            case "resource_child":
                return this.createAuthRoleResource(obj);
            case "user_child":
                return this.createUserRole(obj);
            case "alert":
                return this.createNotificationAlert(obj);
            case "applicationslist":
                return this.createAuthApplication(obj);
            case "applicationslist_child":
                return this.createRoleApplication(obj);
            case "roleapplicationmenuitem":
                return this.createRoleApplicationMenuItem(obj);
            case "roleapplicationresource":
                return this.createRoleApplicationResources(obj);

        }
    }


    checkBusinessValidations(inputRecords, pageName)
    {
        switch (pageName.toLowerCase()) {
            case "userrolegrid":
                inputRecords.forEach(x=> {
                    x.checkBox.checked = (x.primaryKey && x.primaryKey.value) ? true : false;
                });
                break;
        }
    }
}
