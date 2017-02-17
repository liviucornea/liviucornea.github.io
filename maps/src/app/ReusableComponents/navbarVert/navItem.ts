
interface  INavItem{
    Name: string;
    Title: string;
    LookupKey: string;
    Active: boolean;
    RouteLink: Array<string>;
    Children: Array<NavItem>;
    MenuType:string;
}

export class NavItem implements INavItem  {
    public Active: boolean;
    public Name: string;
    public Title: string;
    public RouteLink: string[];
    public LookupKey: string;
    public Children: Array<NavItem>=[];
    public MenuType : string;

    constructor(name,title, lookupKey, routeLink, children, menuType,active = false) {
        this.Name= name;
        this.Title= title;
        this.LookupKey = lookupKey;
        this.RouteLink = routeLink;
        this.Children = children;
        this.Active = active;
        this.MenuType = menuType;
    }
}