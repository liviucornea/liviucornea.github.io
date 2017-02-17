/**
 * Created by noutaa2 on 6/2/2016.
 */
interface  INavItem{
    Name: string;
    RouteLink: Array<string>;
    Path: string;
    Roles: Array<string>;
    Children: Array<NavItem>;
    active: boolean;
}

export class NavItem implements INavItem  {
    public active: boolean;
    public Name: string;
    public RouteLink: string[];
    public Path: string;
    public Roles: Array<string>=[] ;
    public Children: Array<NavItem>=[];
    constructor(name: string,routeLink: Array<string>,path: string,roles: Array<string> ,children?:Array<any> ) {
        this.Name = name;
        this.RouteLink = routeLink;
        this.Path = path;
        this.Roles = roles;
        this.Children = children;
    }
}