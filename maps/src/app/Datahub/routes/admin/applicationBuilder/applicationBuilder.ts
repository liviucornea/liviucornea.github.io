import {Component, ViewChild} from '@angular/core';
import {AlertService} from "../../../../ReusableServices/alertService";
import {AppSettingsService} from "../../../../ReusableServices/appSettingsService";
import {MenuItemControlConfig} from "../auth/menuItem/menuItemControlConfig";
import {DisplayGridComponent} from "../../../../ReusableComponents/displayGrid/displayGrid";
import {AdminApiService} from "../adminApiService";


@Component({
    selector: 'applicationBuilder',
    template: require('./applicationBuilder.html'),

})

export class ApplicationBuilder {

    private showControls : boolean = false;
    private selectedTreeModelMetadataId: number;
    private treeViewMetadataTemplate: any = {ConnectionString: "",MetadataJSON:"",RootModelName:"",TreeModelMetadataId:0, Route:"",PublishDate:"", MenuItemName:"", MenuItemId:0 };
    private selectedTreeModelMetadata: any ;
    private treeModelMetadataList: Array<any>;
    private primaryKeyColumn: string = "TreeModelMetadataId";
    private pageView: string = "edit";
    private showPublishButton: boolean = false;
    private menuItemExists: boolean = false;
    private menuItemsList: Array<any> = [];
    private menuPageName: string ='menuitem_child';

    private menuRoleItemcontrolConfig = MenuItemControlConfig.ChildControlConfig;
    /*@ViewChild(DisplayGridComponent)
    private dataTable:DisplayGridComponent;*/

    constructor( private adminApiService: AdminApiService,
                private alert: AlertService, private appSettingsService: AppSettingsService) {

        this.selectedTreeModelMetadata = this.treeViewMetadataTemplate;
        this.getTreeViewMetadataList();

    }

    /*ngAfterViewInit() {
        this.refreshMenuItemRoles();
    }*/

    saveClicked()
    {
        if(this.selectedTreeModelMetadata) {
            if (this.selectedTreeModelMetadata.MenuItemId > 0) {
                this.processTreeViewdata();
            }
            else
            {
                this.addMenuItem();
            }
        }
    }


    addMenuItem()
    {
        var menuItemObj = {
             Id: 0
            ,LookupKey: this.selectedTreeModelMetadata.MenuItemName
            ,Route: this.selectedTreeModelMetadata.Route
            ,VersionStamp:""
        }

        this.adminApiService.createMenuItem(menuItemObj).subscribe(
          res=>{
              this.adminApiService.getMenuItems().subscribe(
                  res=> {
                      this.menuItemsList = res;
                      this.processTreeViewdata();
                  },
                  error => {}
                  ,() =>{});
          },
            error => {this.alert.error("Error in creating new MenuItem: async error #" + error.status);}
            ,()=>{}
        );
    }

    processTreeViewdata()
    {
        if(this.selectedTreeModelMetadata) {
            var x = this.buildUIToApiTreeViewTemplate(this.selectedTreeModelMetadata);// this.selectedTreeModelMetadata;
            if(this.pageView == 'edit')
            {
                this.saveTreeViewdata(x)
            }
            else {
                this.addTreeViewdata(x);
            }
        }
    }

    saveTreeViewdata(x)
    {
        this.adminApiService.updateTreemodelmetadata(x, this.primaryKeyColumn).subscribe(
            res => {
                this.alert.addAlert( this.appSettingsService.appNotificationsMsg.saveConfirmedMsg);
                this.getTreeViewSchemaList();
            }
            ,
            error => {
                this.alert.error("Error in Updating MetaData: async error #" + error.status);
            },
            () => { }
        );
    }

    addTreeViewdata(x)
    {
        this.adminApiService.createTreemodelmetadata(x).subscribe(
            res => {
                this.alert.addAlert( this.appSettingsService.appNotificationsMsg.saveConfirmedMsg);
                this.getTreeViewSchemaList();
            }
            ,
            error => {
                this.alert.error("Error in Adding MetaData: async error #" + error.status);
            },
            () => { }
        );
    }

    addClicked()
    {
        this.pageView = "add";
        this.showControls = true;
        this.selectedTreeModelMetadata = JSON.parse(JSON.stringify(this.treeViewMetadataTemplate));
    }

    cancelClicked()
    {
        this.pageView = "edit";
        if(this.selectedTreeModelMetadata.TreeModelMetadataId > 0) {
            this.populateSelectedSchema(this.selectedTreeModelMetadata.TreeModelMetadataId);
        }
        else {
            var len = this.treeModelMetadataList.length;
            if(len > 0) {
                this.populateSelectedSchema(this.treeModelMetadataList[len-1].TreeModelMetadataId)
            }
            else
            {
                this.showControls = false;
            }
        }
    }

    deleteClicked()
    {
        if(this.selectedTreeModelMetadata  && this.pageView == "edit")
        {
            this.alert.addAlertAndRequestAnswer(this.appSettingsService.appNotificationsMsg.deletionQuestionMsg);
            this.alert.requestConfirmationAnswer$.subscribe(item => {
                this.alert.askConfirmation = false;
                if (item != "OK")
                    return;
                this.deleteSelectedSchema();
            });
        }
    }


    deleteSelectedSchema()
    {
        var x = this.selectedTreeModelMetadata;
        this.adminApiService.deleteTreemodelmetadata(x, this.primaryKeyColumn).subscribe(
            res => {
                this.alert.addAlert( this.appSettingsService.appNotificationsMsg.deletionConfirmationMsg);
                //reset the values
                this.selectedTreeModelMetadata = JSON.parse(JSON.stringify(this.treeViewMetadataTemplate));
                this.selectedTreeModelMetadataId = 0;
                this.getTreeViewSchemaList();
            }
            ,
            error => {
                this.alert.error("Error in Deleting MetaData: async error #" + error.status);
            },
            () => { }
        );
    }

    getTreeViewMetadataList()
    {
        this.pageView = "edit";
        this.showControls = false;

        this.adminApiService.getMenuItems().subscribe(
          res=>{
              this.menuItemsList = res;
              this.getTreeViewSchemaList();
          },
          error => {this.alert.error("Error in retrieving MenuItems List: async error #" + error.status);},
            ()=>{}
        );

    }

    getTreeViewSchemaList()
    {
        this.pageView = "edit";

        this.showControls = false;

        this.adminApiService.getTreemodelmetadataList().subscribe
        (
            res => {
                this.treeModelMetadataList = res;
                if(this.selectedTreeModelMetadata.TreeModelMetadataId > 0)
                {
                    this.populateSelectedSchema(this.selectedTreeModelMetadata.TreeModelMetadataId);
                }
                else {
                    var len = this.treeModelMetadataList.length;
                    if(len > 0) {
                        this.populateSelectedSchema(this.treeModelMetadataList[len-1].TreeModelMetadataId)
                    }
                }
            }
            ,
            error => {
                this.alert.error("Error in retrieving MetaData List: async error #" + error.status);
            },
            () => { }
        );
    }

    populateSelectedSchema(selectedValue)
    {
        this.showControls = true;
        this.menuItemExists = false;
        this.selectedTreeModelMetadataId = selectedValue;
        this.showPublishButton = false;
        //Convert to string and back to json -> to convert reference type data to value type
        this.buildApiToUITreeViewTemplate(JSON.parse(JSON.stringify(this.getSelectedSchema(selectedValue))));

        if(this.selectedTreeModelMetadata && !this.selectedTreeModelMetadata.PublishDate)
        {
            this.showPublishButton = true;
        }
        //this.refreshMenuItemRoles();
    }

    getSelectedSchema(selectedValue)
    {
        return this.treeModelMetadataList.find(p=>p.TreeModelMetadataId == selectedValue);
    }

    publishClicked()
    {
        var metaDataToPublish = this.getSelectedSchema(this.selectedTreeModelMetadataId);
        if(metaDataToPublish)
        {
        //if(this.selectedTreeModelMetadata && this.selectedTreeModelMetadata.MetadataJSON) {
            this.adminApiService.publishTreemodelmetadata(metaDataToPublish.RootModelName).subscribe(
                res => {
                    this.alert.addAlert(this.appSettingsService.appNotificationsMsg.saveConfirmedMsg);
                    this.getTreeViewSchemaList();
                }
                ,
                error => {
                    this.alert.error("Error in Publishing MetaData: async error #" + error.status);
                },
                () => {
                }
            );
        }
    }

    checkMenuItem()
    {
        var menuItemId = 0;
        var route="";
        this.menuItemExists = false;
        //var menuItemValue = this.selectedTreeModelMetadata.MenuItemName;

        var tempMenuItem = this.menuItemsList.find(p=>p.LookupKey.toLowerCase() === this.selectedTreeModelMetadata.MenuItemName.toLowerCase());
        if(tempMenuItem)
        {
            menuItemId = tempMenuItem.Id;
            route = tempMenuItem.Route;
        }
        this.selectedTreeModelMetadata.MenuItemId = menuItemId;
        this.selectedTreeModelMetadata.Route = route;
        if(menuItemId > 0)
        {
            if(this.treeModelMetadataList.find(p=>p.MenuItemId == menuItemId && p.TreeModelMetadataId != this.selectedTreeModelMetadata.TreeModelMetadataId))
            {
                this.menuItemExists = true;
            }
        }
    }


    buildApiToUITreeViewTemplate(obj)
    {

        var tempMenuItem;
        var menuItemRoute = "";
        var menuItemName = "";
        var menuItemId = 0;
        if(obj.MenuItemId) {
            tempMenuItem = this.menuItemsList.find(p=>p.Id == obj.MenuItemId);

            if (tempMenuItem) {
                menuItemRoute = tempMenuItem.Route;
                menuItemName = tempMenuItem.LookupKey;
                menuItemId = obj.MenuItemId;
            }
        }

        this.selectedTreeModelMetadataId = obj.TreeModelMetadataId;

        this.selectedTreeModelMetadata = {
             ConnectionString: obj.ConnectionString
            ,MetadataJSON: obj.MetadataJSON
            ,RootModelName: obj.RootModelName
            ,TreeModelMetadataId:obj.TreeModelMetadataId
            ,Route: menuItemRoute
            ,PublishDate: obj.PublishDate
            ,MenuItemName: menuItemName
            ,MenuItemId: menuItemId
        }
    }


    buildUIToApiTreeViewTemplate(objTreeView)
    {
        var tempMenuItem = this.menuItemsList.find(p=>p.LookupKey.toLowerCase() == objTreeView.MenuItemName.toLowerCase());
        return {
             ConnectionString: objTreeView.ConnectionString
            ,MetadataJSON: objTreeView.MetadataJSON
            ,RootModelName: objTreeView.RootModelName
            ,TreeModelMetadataId: objTreeView.TreeModelMetadataId
            ,PublishDate: objTreeView.PublishDate
            ,MenuItemId: tempMenuItem.Id
        }
    }

    /*refreshMenuItemRoles()
    {
        if(this.dataTable && this.selectedTreeModelMetadata)
        {
            this.dataTable.GetParentPageDetails(this.menuRoleItemcontrolConfig,this.adminApiService,"menuitem_child", this.selectedTreeModelMetadata.MenuItemId);
        }
    }*/

}