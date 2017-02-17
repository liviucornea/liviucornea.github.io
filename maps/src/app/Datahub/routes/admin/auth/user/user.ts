import {Component, ViewChild} from "@angular/core";

import {UserControlConfig, UserTabControlConfig} from "./userControlConfig";
import {AdminAuthApiService} from "../adminAuthApiService";
import {TabBuilder} from "../../../../../ReusableComponents/tabBuilder/tabBuilder";
import {matrixService} from "../../../../../ReusableServices/matrixService";
import {ApiService} from "../../../../../ReusableServices/apiService";
import {AlertService} from "../../../../../ReusableServices/alertService";
import {HttpAbstract} from "../../../../../ReusableServices/httpAbstract";
import {AppSettingsService} from "../../../../../ReusableServices/appSettingsService";

@Component({
    selector: 'authUser',
    template:`<tabBuilder [tabsList]="tabsListData" [messages] = "customMessages"
            (tabEmitter)="showSpecificTab($event)"
            (tabContentEmitter)="doActionFromChildTab($event)"></tabBuilder>`,
})
export class AuthUser {
    controlConfig:any = UserControlConfig;
    @ViewChild(TabBuilder) tabBuilderControl: TabBuilder;
    tabsListData: Array<any> = [];
    tabControlConfig: any = UserTabControlConfig;
    updatedControlsList: Array<any> = [];
    customMessages: Array<any> = [];
    selectedUserId: number=0;
    selectedTabInfo: any;

    constructor(private adminAuthApiService: AdminAuthApiService, private vmMatrix: matrixService
        , private apiService: ApiService, private alert: AlertService,private appSettingsService: AppSettingsService) {

    }

    ngOnInit() {
        this.tabsListData=[];
        this.getTabsData();
    }

    ngOnDestroy(): void {
        this.tabsListData = [];
    }

    getTabsData() {
        this.tabControlConfig.TabsList.forEach((x)=> {
            this.tabsListData.push(
                {
                    TabKey: x.TabKey,
                    TabName: x.TabName
                });
        });
    }

    showSpecificTab(tabData){
        this.vmMatrix.showSpecificTab(this,tabData,this.adminAuthApiService);
    }

    displayTabInfo(tabInfo) {
        switch (tabInfo.TabKey) {
            case 'UserRoles':
                let tempFormBuilder = tabInfo.TabControls.find(x=> x.ComponentName == "userroleform");
                if (tempFormBuilder) {
                    tempFormBuilder.data = this.vmMatrix.getFormBuilderControls(tempFormBuilder.gridSettings);
                }

                let tempGrid = tabInfo.TabControls.find(x=>x.ComponentName =="userrolegrid");
                if(tempGrid)
                {
                    tempGrid.ShowDefault = false;
                }
                break;
        }
        this.selectedTabInfo = tabInfo;
        this.tabBuilderControl.displayTabInfo(tabInfo);

    }

    doActionFromChildTab(outputData) {
        this.customMessages = [];

         switch (outputData.updatedValue.controlName) {
             case "Login":
                 this.selectedUserId = outputData.updatedValue.value;
                 this.getUserRoleTabInfo();
                 break;
             case "Save":
                 this.updateUserRoles(outputData);
                 break;
             case "Cancel":
                 this.getUserRoleTabInfo();
                 break;
         }
    }

    getUserRoleTabInfo()
    {
        var updatedTabsList: Array<any>=[];
        this.apiService.getArrayFromQuery("Admin_UserRoleMembership",
            JSON.stringify({Parameters:[{Name: "@UserId", Value:this.selectedUserId}]})).subscribe(
            res=> {
                if(this.selectedTabInfo)
                {
                    let userRolegrid = this.selectedTabInfo.TabControls.find(p=>p.ComponentName == 'userrolegrid');
                    if(userRolegrid)
                    {
                        userRolegrid['data']= res;
                        userRolegrid.ShowDefault = true;
                        updatedTabsList.push(userRolegrid);
                        this.tabBuilderControl.LoadSpecificTabsByUpdate(updatedTabsList);
                    }
                }
            },
            error => {
                this.alert.error("Error in retrieving User role Membership info" + error.status);
            },
            () => {
            }
        );
    }

    updateUserRoles(outputData)
    {
        let rolesTobeAddedList = [];
        let addedUserRolesList= [];
        let rolesTobeRemovedList=[];
        let removedUserRolesList=[];

        if(outputData.updatedValue){
            let selectedList = outputData.updatedValue.value;
            if(selectedList && selectedList.length)
            {
                rolesTobeAddedList = selectedList.filter(p=>(!p.primaryKey.value) && p.checkBox.checked);
            }

            let masterList = outputData.updatedValue.masterList;
            if(masterList && masterList.length)
            {
                rolesTobeRemovedList = masterList.filter(p=>p.primaryKey.value && (!p.checkBox.checked));
            }
        }

        rolesTobeAddedList.forEach(p=>{
            let formattedUserRole = this.buildUserRoleObject(p);
            addedUserRolesList.push(formattedUserRole);
        });

        rolesTobeRemovedList.forEach(p=>{
            let formattedUserRole = this.buildUserRoleObject(p);
            removedUserRolesList.push(formattedUserRole);
        });


        if(addedUserRolesList.length)
        {
            this.addUserRolesList(addedUserRolesList,removedUserRolesList);
        }
        else if(removedUserRolesList.length)
        {
            this.removeUserRolesList(removedUserRolesList);
        }
    }


    addUserRolesList(addedUserRolesList, removedUserRolesList: Array<any>=[])
    {
        this.apiService.insertBulkRecords('/auth/userrole/multiple',JSON.stringify(addedUserRolesList)).subscribe(
            res=>{
                if(removedUserRolesList && removedUserRolesList.length) {
                    this.removeUserRolesList(removedUserRolesList);
                }
                else {
                    this.alert.addAlert(this.appSettingsService.appNotificationsMsg.saveConfirmedMsg);
                    this.getUserRoleTabInfo();
                }
            },
            error=>{
                this.alert.error("Error in inserting User role Membership" + error.status);
            }
        )
    }

    removeUserRolesList(removedUserRolesList)
    {
        this.apiService.removeBulkRecords('/auth/userrole/multiple',JSON.stringify(removedUserRolesList)).subscribe(
            res=>{
                this.alert.addAlert(this.appSettingsService.appNotificationsMsg.saveConfirmedMsg);
                this.getUserRoleTabInfo();
            },
            error=>{
                this.alert.error("Error in deleting User role Membership" + error.status);
            }
        )
    }

    buildUserRoleObject(rowInfo)
    {
        //Always expect a roleId. If not error
        let roleId = rowInfo.cells.find(p=>p.name.toLowerCase() =='roleid').val;
        let id = rowInfo.primaryKey.value;
        if(!id) {
            id=0;
        }
        let tempUserRole = new UserRole(id,roleId, this.selectedUserId);
        return tempUserRole;
    }


}

export class UserRole{
    Id: number;
    RoleId: number;
    UserId: number;
    VersionStamp = '';

    constructor(id, roleId, userId){
        this.Id = id;
        this.RoleId = roleId;
        this.UserId = userId;
    }
}
