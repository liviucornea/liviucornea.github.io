import {Injectable, EventEmitter} from "@angular/core";
import {NavItem} from "../ReusableComponents/navbarVert/navItem";
import {Router} from "@angular/router";
import {LocalizationService} from "./localizationService";
import {ApiService} from "./apiService";
import {Location} from "@angular/common";



@Injectable()
export class NavigationService {

    mainPageNavigationArray:Array<any>;
    mainPageFilteredArray:string="";
    leftMenuItems: any;
    allowedPageArray:Array<any>;
    rtService:Router;
    public navigationCb: EventEmitter<any>;
    public navigationLeftMenuEmitter: EventEmitter<any>;
    public bredCrumbEmitter: EventEmitter<any>;
    breadCrumbList: Array<any>=[];
    pageTitle: string = "";

    constructor(private router: Router, private localizationService: LocalizationService, private apiService: ApiService, private loc: Location){
        this.navigationCb= new EventEmitter<any>();
        this.navigationLeftMenuEmitter = new EventEmitter<any>();
        this.allowedPageArray= new Array<any>();
        this.bredCrumbEmitter= new EventEmitter<any>();
        this.rtService=router;
    }

    getMainPageNavigation(profile:any){
        this.mainPageNavigationArray = this.getNavigationStructure(profile.Children);
        return this.mainPageNavigationArray;
    }


    getFiltertedPageNavigation(parentName: string)
    {
        var myChildren= this.mainPageNavigationArray.find(p=>p.Name == parentName).Children;
        this.mainPageFilteredArray = JSON.stringify(myChildren);
    }


    getNavigationStructure( navigationArray: Array<any>){

        var navContent: NavItem[] = [];
        var children = [];
        if(navigationArray && navigationArray.length) {
            for (var index = 0; index < navigationArray.length; index++) {
                var temp = navigationArray[index];
                children=[];
                if(temp.Children && temp.Children.length > 0)
                {
                    children = this.getNavigationStructure(temp.Children);
                    var t= 0;
                }
                if (temp) {//MenuType.NONE
                    if(temp.ParamValue)
                    {
                        temp.RouteParts.push(temp.ParamValue);
                    }
                    navContent.push(
                        new NavItem(temp.LookupKey, temp.Title, temp.LookupKey, temp.RouteParts, children, temp.MenuType)
                    );
                }
            }
        }

        return navContent;
    }

    buildNavigationMenu(navigationArray):Array<any> {
        var navContent: NavItem[] = [];
        var children = [];

        if(navigationArray && navigationArray.length) {
            for (var index = 0; index < navigationArray.length; index++) {
                var temp = navigationArray[index];

                children=[];
                if(temp.Children && temp.Children.length > 0) {
                    children = this.buildNavigationMenu(temp.Children);
                }
                if (temp && temp.MenuType != "NONE") {
                    if(temp.ParamValue) {
                        temp.RouteLink.push(temp.ParamValue);
                    }
                    var formattedTitle = this.localizationService.getLocalizedValueDescription(temp.LookupKey);
                    navContent.push(
                        new NavItem(temp.LookupKey, formattedTitle, temp.LookupKey, temp.RouteLink, children,temp.MenuType, temp.Active)
                    );
                }
            }

        }
        return navContent;

    }

    getChildMenu(input: Array<any> = []):Array<any>{
        if(this.mainPageFilteredArray) {
            var navItems = JSON.parse(this.mainPageFilteredArray);
            this.GetTempNavigationArray(navItems, input);
            this.navigationCb.emit(navItems);
            this.navigationLeftMenuEmitter.emit([]);
            return navItems;
        }
    }


    setCurrentPage(urlPath)
    {
        this.breadCrumbList = [];
        var routeStringList = urlPath.split(/[//]+/).filter(function(e) { return e; });
        var lenArray =routeStringList.length;
        if(lenArray > 0 && this.mainPageNavigationArray)
        {
            var lastRoute = routeStringList[lenArray - 1];
            var tempParamsList = lastRoute.split(";");
            routeStringList[lenArray - 1] = tempParamsList[0];

            var paramCount =0;
            var modelName: string ="";

            if(Object.prototype.toString.call(tempParamsList) === '[object Array]') {
                tempParamsList.forEach(function (x) {
                    if (paramCount > 0) {
                        var formattedData = x.split("=");
                        if(formattedData[0].toLowerCase() == 'modelname')
                        {
                            modelName = formattedData[1];
                        }
                    }
                    paramCount++;
                });
            }

            if(modelName)
            {
                routeStringList[lenArray -1] = modelName;
            }

            this.buildBreadCrumbList(routeStringList, this.mainPageNavigationArray);

        }
        this.setPageTitle();
        this.bredCrumbEmitter.emit(this.breadCrumbList);
    }


    buildBreadCrumbList(routeStringList, navItemList)
    {
        if(routeStringList.length > 0)
        {
            var routeName= routeStringList[0];
            var tempNavItem = navItemList.find(p=>p.Name.toLowerCase() == routeName.toLowerCase());
            if(tempNavItem)
            {
                var formattedTitle = this.localizationService.getLocalizedValueDescription(tempNavItem.LookupKey);
                this.breadCrumbList.push({Title: formattedTitle, RouteLink: tempNavItem.RouteLink});
                routeStringList.splice(0,1);
                if(routeStringList.length > 0)
                {
                    this.buildBreadCrumbList(routeStringList,tempNavItem.Children);
                }
            }
        }
    }


    setPageTitle()
    {
        this.pageTitle ="";
        if(this.breadCrumbList && this.breadCrumbList.length > 0)
        {
            var lenArray = this.breadCrumbList.length;
            this.pageTitle = this.breadCrumbList[lenArray - 1 ].Title;
        }
    }

    NavigateToPage(items:Array<any>, pageName:string){
        if (!items){
            this.router.navigate(['Datahub/Home']);
            return;
        }
        var path: any;
        if (pageName) {
            let item=items.find(x=> x.Name===pageName);
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
                path.forEach(x=> {
                    link = link + '/' + x;
                });
                let arr = [];
                arr.push(link);
                if (arr)
                    this.router.navigate(arr);
            }
        }
    }


    NavigateByLocationUrl(urlPath)
    {
        var routeStringList = urlPath.split(/[//]+/).filter(function(e) { return e; });
        var lenArray = routeStringList.length;
        var routeArray=[];
        var childMenuArrayList=[];
        var tempCustomChildMenuList = [];
        if(routeStringList.length > 0)
        {
            var lastRoute = routeStringList[lenArray - 1];
            var tempParamsList = lastRoute.split(";");
            routeStringList[lenArray - 1] = tempParamsList[0];
            var count = 0;
            routeStringList.forEach(function(x)
            {
               routeArray.push(x);
                if(count > 0 )//&& count < lenArray - 1
                {
                    childMenuArrayList.push(x);
                    tempCustomChildMenuList.push(x);
                }
                count++;
            });

            //Adding parameters to route navigation
            var paramCount =0;
            var modelName: string ="";
            if(Object.prototype.toString.call(tempParamsList) === '[object Array]') {
                tempParamsList.forEach(function (x) {
                    if (paramCount > 0) {
                        var formattedData = x.split("=");
                        if(formattedData[0].toLowerCase() == 'modelname')
                        {
                            modelName = formattedData[1];
                        }
                    }
                    paramCount++;
                });
            }

            if(modelName && tempCustomChildMenuList.length > 0)
            {
                tempCustomChildMenuList[tempCustomChildMenuList.length -1] = modelName;
            }

            this.getChildMenu(tempCustomChildMenuList);
            this.getLeftMenuRoutes(childMenuArrayList, (modelName)? modelName : routeStringList[lenArray - 1]);

        }
        this.setCurrentPage(urlPath);

    }

    GetTempNavigationArray(navItems: Array<any> = [], inputData: Array<any>=[]){
       if(inputData.length > 0){
            var x = navItems.find(p=>p.Name == inputData[0]);
            if(x && x.Children)
            {
                x.Active = true;
                this.leftMenuItems = x;
                var y = inputData.slice(1,2);
                if(y.length > 0)
                {
                    this.GetTempNavigationArray(x.Children ,y);
                }
            }
        }
    }

    getLeftMenuRoutes(inputData: Array<any>=[], childName: string = ""):Array<any>
    {
        var tempLeftMenuItems =[];
        if(this.leftMenuItems && this.leftMenuItems.Children && this.leftMenuItems.Children.length > 0){
            this.getTempLeftMenuArray(this.leftMenuItems.Children, inputData);
            tempLeftMenuItems = this.leftMenuItems.Children;
            if(childName)
            {
                var tempItem = tempLeftMenuItems.find(p=>p.Name.toLowerCase() == childName.toLowerCase());
                if(tempItem)
                {
                    tempItem.Active = true;
                }
            }
        }

        this.navigationLeftMenuEmitter.emit(tempLeftMenuItems);
        return tempLeftMenuItems;
    }

    getTempLeftMenuArray(navItems: Array<any> = [], inputData: Array<any>=[]){
        if(inputData.length > 0){
            var x = navItems.find(p=>p.Name == inputData[0]);
            if(x && x.Children)
            {
                var y = inputData.slice(1,2);
                if(y.length > 0)
                {
                    this.getTempLeftMenuArray(x.Children ,y);
                }
            }
        }
    }


    getChildMenusForTileView(leftchildmenuName):Array<any>
    {
        var tempLeftMenuItems =[];

        if(this.leftMenuItems && this.leftMenuItems.Children && this.leftMenuItems.Children.length > 0){

            var tempLeftMenuItemChildren = this.leftMenuItems.Children.find(p=>p.Name.toLowerCase() == leftchildmenuName.toLowerCase());
            if(tempLeftMenuItemChildren && tempLeftMenuItemChildren.Children)
            {
                tempLeftMenuItems = tempLeftMenuItemChildren.Children;
            }
        }

        //this.navigationLeftMenuEmitter.emit(tempLeftMenuItems);
        return tempLeftMenuItems;
    }
}
