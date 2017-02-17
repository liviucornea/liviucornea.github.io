import {Component, ViewChild} from "@angular/core";
import {TabBuilder} from "../../../../../ReusableComponents/tabBuilder/tabBuilder";
import {ApplicationsListTabConfig} from "./applicationsListControlConfig";
import {AlertService} from "../../../../../ReusableServices/alertService";
import {ApiService} from "../../../../../ReusableServices/apiService";
import {matrixService} from "../../../../../ReusableServices/matrixService";
import {AdminAuthApiService} from "../adminAuthApiService";
import {AdminApiService} from "../../adminApiService";

@Component({
    selector: 'applicationsList',
    template:   `<tabBuilder [tabsList]="tabsListData" [messages] = "customMessages"
            (tabEmitter)="showSpecificTab($event)"
            (tabContentEmitter)="doActionFromChildTab($event)"></tabBuilder>`
})

export class ApplicationsList {
    @ViewChild(TabBuilder) tabBuilderControl: TabBuilder;
    tabsListData: Array<any> = [];
    tabControlConfig: any = ApplicationsListTabConfig;
    updatedControlsList: Array<any> = [];
    customMessages: Array<any> = [];
    rolesList: Array<any> =[];
    selectedTabInfo: any;
    selectedApplicationId: number =0;
    formBuilder: any;
    selectedRoleApplicationId: number=0;

    constructor(private alert: AlertService, private apiService: ApiService, private vmMatrix: matrixService
            , private adminAuthApiService: AdminAuthApiService, private adminApiService: AdminApiService) {
    }

    ngOnInit() {
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
        this.vmMatrix.showSpecificTab(this, tabData, this.adminAuthApiService);
    }

    displayTabInfo(tabInfo) {
        this.selectedTabInfo = tabInfo;
        this.formBuilder = null;
        switch (tabInfo.TabKey) {
            case "Resources":
                var menuItemControl = tabInfo.TabControls.find(p=>p.ComponentName == "menuitem");
                if(menuItemControl){
                    menuItemControl['httpProxy'] = this.adminApiService;
                }
                this.tabBuilderControl.displayTabInfo(tabInfo);
                break;

            case "ApplicationRoles":
                this.formBuilder = tabInfo.TabControls.find(x=> x.ComponentName == "applicationroles");
                if (this.formBuilder) {
                    this.formBuilder.data = this.vmMatrix.getFormBuilderControls(this.formBuilder.gridSettings);
                }

                tabInfo.TabControls.forEach(x=>{
                        if(x.ComponentName == "roleapplicationmenuitem" || x.ComponentName == "roleapplicationresource") {
                            x.ShowDefault = false;
                        }
                    }
                );

                if(!this.rolesList.length){
                    this.adminAuthApiService.getAuthRole().subscribe(
                        res=>{
                            this.rolesList = res;
                            this.tabBuilderControl.displayTabInfo(tabInfo);
                        },
                        error=>{
                            this.alert.error('Error in retrieving Roles' + error.status);
                        }
                    );
                }
                else {
                    this.tabBuilderControl.displayTabInfo(tabInfo);
                }
                break;
            default:
                this.tabBuilderControl.displayTabInfo(tabInfo);
                break;
        }

    }

    doActionFromChildTab(outputData) {
        switch (outputData.TabKey) {
            case "ApplicationRoles":
                this.executeApplicationRolesPage(outputData);
        }
    }

    executeApplicationRolesPage(outputData){
        switch (outputData.updatedValue.controlName) {
            case "Application":
                this.selectedApplicationId =outputData.updatedValue.value;
                this.getApplicationRolesList();
                break;
            case "Role":
                this.selectedRoleApplicationId = outputData.updatedValue.value;
                this.displayRoleApplicationChildItems()


        }
    }

    getApplicationRolesList()
    {
        var applicationRolesList: Array<any>=[];
        if(this.selectedApplicationId){
            this.adminAuthApiService.getApplicationRolesByApplicationId(this.selectedApplicationId).subscribe(
              res=>{
                  applicationRolesList = this.getformattedRoleApplicationsList(res);
                  var roleControl = this.formBuilder.data.find(x=> x.name == "Role");
                  this.vmMatrix.bindCustomDropDown(roleControl,applicationRolesList);
              },
              error=>{
                  this.alert.error('Error in retrieving Application Roles' + error.status);
                }
            );
        }
    }

    getformattedRoleApplicationsList(applicationRolesList: Array<any>){
        var formattedList: Array<any> = [];
        if(this.rolesList && this.rolesList.length && applicationRolesList && applicationRolesList.length)
        {
            applicationRolesList.forEach((x)=>{
                var tempRole = this.rolesList.find(p=>p.Id == x.RoleId);
                if(tempRole)
                {
                    formattedList.push({
                        RoleApplicationId: x.Id,
                        Name: tempRole.Name
                    });
                }
            });
        }
        return formattedList;

    }

    displayRoleApplicationChildItems(){
        var updatedTabsList: Array<any>=[];
        if(this.selectedRoleApplicationId && this.selectedTabInfo)
        {
            this.apiService.fetchMultipleList([this.adminAuthApiService.roleApplicationUrl + '/' + this.selectedRoleApplicationId + '/roleapplicationmenuitem',
                this.adminAuthApiService.roleApplicationUrl + '/' + this.selectedRoleApplicationId + '/roleapplicationresource'
            ]).subscribe(
                res=> {
                    this.selectedTabInfo.TabControls.forEach(x=> {
                            if (x.ComponentName == "roleapplicationmenuitem" || x.ComponentName == "roleapplicationresource") {
                                x.data = (x.ComponentName == "roleapplicationmenuitem") ? res[0] : res[1];
                                x.parentIdInputValue = this.selectedRoleApplicationId;
                                x.ShowDefault = true;
                                updatedTabsList.push(x)
                            }
                        }
                    );
                    this.tabBuilderControl.LoadSpecificTabsByUpdate(updatedTabsList);
                },
                error=>{
                    this.alert.error('Error in retrieving Application Roles Menu and Resources' + error.status);
                }
            );
        }
    }

}
