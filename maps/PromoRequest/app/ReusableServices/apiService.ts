import {Component, Injector, Injectable} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS, BrowserXhr} from 'angular2/http'
import {Observable} from 'rxjs/Observable';
import {HttpAbstract} from "./httpAbstract";
import {AppSettingsService} from "./appSettingsService";

@Injectable()
export class ApiService {
    httpAbs:HttpAbstract;
    prefixurl: string = '/auth';
    contentType: string = 'application/json; charset=utf-8';

    base: string = this.appSettingsService.appSettings.apiSettings.apiURL_BASE + '/api/tdam/datahub/ae';

    userbaseurl: string = this.prefixurl + '/user';
    currentuserbaseurl: string = this.prefixurl + '/currentuser';
    logbaseurl: string = '/logs';
    rolebaseurl: string = this.prefixurl + '/role';
    resourcebaseurl: string = this.prefixurl + '/resource';
    roleresourcebaseurl: string = this.prefixurl + '/roleresource';
    userrolebaseurl: string = this.prefixurl + '/userrole';
    latestalertbaseurl: string = '/notification/getalert?UserId=';
    alertbaseurl: string = '/notification/alert';

    constructor(private abstractHttp:HttpAbstract, private appSettingsService: AppSettingsService) {
        this.httpAbs = abstractHttp;
        this.httpAbs.setBaseAddress(this.base);
    }

    getNlogInstance(): Observable<any> {
        return this.httpAbs.fetch(this.logbaseurl + '/nloginstance');
    }

    getNlogInstanceFiltered(filter: string): Observable<any> {
        return this.httpAbs.fetchWithFilter(this.logbaseurl + '/nloginstance/paged'
            , filter
            , this.contentType);
    }

    getNLogByInstanceId(instanceId: number) {
        return this.httpAbs.fetch(this.logbaseurl + '/instanceId/' + instanceId + '/nlog');
    }

    getAuthCurrentUser() {
        return this.httpAbs.fetch(this.currentuserbaseurl);
    }
    getAuthCurrentUserRoles() {
        return this.httpAbs.fetch(this.currentuserbaseurl + '/role');
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
    getAuthCurrentUserRole(roleName) {
        return this.httpAbs.fetch(this.currentuserbaseurl + '/role/' + roleName);
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
        //return this.httpAbs.insertJson(this.alertbaseurl,JSON.stringify(obj));
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

    ExecuteUpdate(obj, pagename)
    {
        switch(pagename.toLowerCase())
        {
            case "user":
                return this.updateAuthUser(obj);
            // break;
            case "role":
                return this.updateAuthRole(obj);
            //break;
            case "resource":
                return this.updateAuthResource(obj);
            case "role_child":
            case "resource_child":
                return this.updateAuthRoleResource(obj);
            case "user_child":
                return this.updateUserRole(obj);
            case "alert":
                return this.updateNotificationAlert(obj);
            // break;
        }
    }

    ExecutePageFilter(pagename, filterObject: string) {
        switch (pagename.toLowerCase()) {
            case "logs":
                return this.getNlogInstanceFiltered(filterObject);
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


    ExecutePageRefersh(pagename,id = null)
    {
        switch(pagename.toLowerCase())
        {
            case "user":
                return this.getAuthUser();
            // break;
            case "role":
                return this.getAuthRole();
            //break;
            case "resource":
                return this.getAuthResource();
            case "logs":
                return this.getNlogInstance();
            case "role_child":
                return this.getAuthRoleByRoleId(id);
            case "resource_child":
                return this.getAuthRoleByResourceId(id);
            case "user_child":
                return this.getAuthUserRolesByUserId(id);
            case "logs_child":
                return this.getNLogByInstanceId(id);
            case "alert":
                return this.getNotificationAlerts(id);
        }
    }

    ExecuteDelete(obj, pagename) {
        switch (pagename.toLowerCase()) {
            case "user":
                return this.deleteAuthUser(obj);
            // break;
            case "role":
                return this.deleteAuthRole(obj);
            //break;
            case "resource":
                return this.deleteAuthResource(obj);
            case "role_child":
            case "resource_child":
                return this.deleteAuthRoleResource(obj);
            case "user_child":
                return this.deleteUserRole(obj);
            // break;
        }
    }

    ExecuteInsert(obj, pagename) {
        switch (pagename.toLowerCase()) {
            case "user":
                return this.createAuthUser(obj);
            // break;
            case "role":
                return this.createAuthRole(obj);
            //break;
            case "resource":
                return this.createAuthResource(obj);
            case "role_child":
            case "resource_child":
                return this.createAuthRoleResource(obj);
            case "user_child":
                return this.createUserRole(obj);
            case "alert":
                return this.createNotificationAlert(obj);
            // break;
        }
    }
    getPromoRequestByLogin(id){
        return this.httpAbs.fetch('/promorequeststartdata?username=' + id  );
    }
    // dbo.sp_PromotionGetPromotionDetails
    getPromoDetailByPromoId(id){
        return this.httpAbs.fetch('/promotiongetpromotiondetail?promotionid=' + id  );
    }
    // dbo.sp_PromotionSearchByID
    getPromoSearchByPromoId(promoId, showRefPromo:boolean, reportDetail:boolean ){
        //promotionsearchbyid?promotionid={promotionid:int}&showrefpromotion={showrefpromotion:bool}&reportdetail={reportdetail:bool}
        return this.httpAbs.fetch('/promotionsearchbyid?promotionid=' + promoId + '&showrefpromotion=' + showRefPromo + '&reportdetail=' + reportDetail);
    }
   getPromoAllSystemUsers(){
       //api/tdam/datahub/ae/promotiongetallsystemuser
        //promotionsearchbyid?promotionid={promotionid:int}&showrefpromotion={showrefpromotion:bool}&reportdetail={reportdetail:bool}
        return this.httpAbs.fetch('/promotiongetallsystemuser' );
    }
// [dbo].[sp_PromotionSearch]
    getPromoSearch(searchObject){
        return this.httpAbs.fetchWithFilter('/promotionsearch'
            , JSON.stringify(searchObject)
            , this.contentType);
    }
    // dbo.sp_PromotionGetPreapprovalDetails
    getPromoPreApprovalDetails(id){
        return this.httpAbs.fetch('/promotiongetpreapprovaldetail?promotionid=' + id  );
    }
    insertPromotion(promotionObject){
        return this.httpAbs.fetchWithFilter('/promotioninsertpromotion'
            , JSON.stringify(promotionObject)
            , this.contentType);
    }
    updatePromotion(promotionObject){
        return this.httpAbs.fetchWithFilter('/promotionupdatepromotion'
            , JSON.stringify(promotionObject)
            , this.contentType);
    }
// use store procedure dbo.sp_PromotionInsertNewPreapproval
    insertPreApprovalItem(preApprovalItem){
        return this.httpAbs.fetchWithFilter('/promotioninsertnewpreapproval'
            , JSON.stringify(preApprovalItem)
            , this.contentType);
    }
    // store procedure dbo.sp_PromotionGetPreapprovalMsg
    getPromoPreApprovalMsg(promoId: string, preapprovalitemid: string){
        return this.httpAbs.fetch('/promotiongetpreapprovalmsg?promotionid=' + promoId + '&preapprovalitemid=' + preapprovalitemid);
    }

}