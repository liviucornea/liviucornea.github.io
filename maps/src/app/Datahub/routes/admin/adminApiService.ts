import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpAbstract} from "../../../ReusableServices/httpAbstract";
import {getIdValue} from "../../../ReusableServices/genericfunctions";
import {ApiService} from "../../../ReusableServices/apiService";


@Injectable()
export class AdminApiService {
    prefixurl: string = '/auth';
    contentType: string = 'application/json; charset=utf-8';
    logbaseurl: string = '/log';
    treemodelmetadataUrl: string= '/ui/treemodelmetadata';
    menuItemUrl: string = this.prefixurl + '/menuitem';
    roleMenuItemUrl: string = this.prefixurl + '/rolemenuitem';
    metaDataTreeViewUrl: string ='/ui/treemodelmetadata';
    publishTreeView: string = '/treemodel/publish';

    constructor(private httpAbs:HttpAbstract, private apiService: ApiService) {
        this.httpAbs.setBaseAddress(this.apiService.base);
    }

    getLogHeader(): Observable<any> {
        return this.httpAbs.fetch(this.logbaseurl + '/logheaderview');
    }

    getLogHeaderFiltered(filter: string): Observable<any> {
        return this.httpAbs.fetchWithFilter(this.logbaseurl + '/logheaderview/paged'
            , filter
            , this.contentType);
    }

    getLogDetail(taskGUID: string) {
        return this.httpAbs.fetch(this.logbaseurl + '/TaskGUID/' + taskGUID + '/logdetailview');
    }

    getLogDetailFiltered(filter: string): Observable<any> {
        return this.httpAbs.fetchWithFilter(this.logbaseurl + '/logdetailview/paged'
            , filter
            , this.contentType);
    }

    updateLog(obj) {
        return this.httpAbs.updateWithHeader(this.logbaseurl + '/logheaderview/update'
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }


    //TreeModelMetadata
    getTreeModeMetadataByRootName(rootName) {
        return this.httpAbs.fetch(this.treemodelmetadataUrl  + '?RootModelName=' + rootName);
    }

    //MenuItems List
    getMenuItems()
    {
        return this.httpAbs.fetch(this.menuItemUrl)
    }

    updateMenuItem(obj,primaryKeyColumn) {
        var id = getIdValue(obj,primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.menuItemUrl + '/' + id
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);

    }

    createMenuItem(obj) {
        return this.httpAbs.insertWithHeader(this.menuItemUrl
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }


    deleteMenuItem(obj,primaryKeyColumn) {
        var id = getIdValue(obj,primaryKeyColumn);
        return this.httpAbs.remove(
            this.menuItemUrl + '/' + id
        );
    }

    //RoleMenuItems
    getMenuItemsRoleByMenuItemId(id) {
        return this.httpAbs.fetch(this.menuItemUrl + '/' + id + '/rolemenuitem');
    }

    createMenuItemRole(obj) {
        return this.httpAbs.insertWithHeader(this.roleMenuItemUrl
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }
    updateMenuItemRole(obj,primaryKeyColumn) {
        var Id = getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.roleMenuItemUrl + '/' + Id
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }

    deleteMenuItemRole(obj,primaryKeyColumn) {
        var Id = getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.remove(
            this.roleMenuItemUrl + '/' + Id
        );
    }


    getTreemodelmetadataList(): Observable<any> {
        return this.httpAbs.fetch(this.metaDataTreeViewUrl );
    }

    updateTreemodelmetadata(obj, primaryKeyColumn)
    {
        var Id = 0;
        Id = getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.updateWithHeader(this.metaDataTreeViewUrl + '/' + Id
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }

    deleteTreemodelmetadata(obj, primaryKeyColumn) {
        var Id = 0;
        Id = getIdValue(obj, primaryKeyColumn);
        return this.httpAbs.remove(
            this.metaDataTreeViewUrl + '/' + Id
        );
    }

    createTreemodelmetadata(obj) {
        return this.httpAbs.insertWithHeader(this.metaDataTreeViewUrl
            , JSON.stringify(obj)
            , '', ''    //empty headers
            , this.contentType);
    }

    publishTreemodelmetadata(rootModelName:string)
    {
        return this.httpAbs.insertWithHeader(this.publishTreeView + "/" + rootModelName
            , ''// rootModelName
            , '', ''    //empty headers
            , this.contentType);
    }

    getRolesByPage()
    {
        return this.httpAbs.fetch(this.metaDataTreeViewUrl );
    }

    ExecuteUpdate(obj, pagename, primaryKeyColumn = "")
    {
        switch(pagename.toLowerCase())
        {
            case "logs":
                return this.updateLog(obj);
            case "menuitem":
                return this.updateMenuItem(obj,primaryKeyColumn);
            case "menuitem_child":
                return this.updateMenuItemRole(obj,primaryKeyColumn);
        }
    }

    ExecutePageFilter(pagename, filterObject: string) {
        switch (pagename.toLowerCase()) {
            case "logs":
                return this.getLogHeaderFiltered(filterObject);
            case "logs_child":
                return this.getLogDetailFiltered(filterObject);
        }
    }


    ExecutePageRefresh(pagename,id = null)
    {
        switch(pagename.toLowerCase())
        {
            case "logs":
                return this.getLogHeader();
            case "logs_child":
                return this.getLogDetail(id);
            case "menuitem":
                return this.getMenuItems();
            case "menuitem_child":
                return this.getMenuItemsRoleByMenuItemId(id);
        }
    }

    ExecuteDelete(obj, pagename, primaryKeyColumn="") {
        switch (pagename.toLowerCase()) {
            case "menuitem_child":
                return this.deleteMenuItemRole(obj,primaryKeyColumn);
            case "menuitem":
                return this.deleteMenuItem(obj,primaryKeyColumn)
        }
    }

    ExecuteInsert(obj, pagename) {
        switch (pagename.toLowerCase()) {
            case "menuitem":
                return this.createMenuItem(obj);
            case "menuitem_child":
                return this.createMenuItemRole(obj);
        }
    }
}