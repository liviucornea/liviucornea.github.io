import {Directive} from 'angular2/core'
import {Router, Location, Instruction, CanActivate} from 'angular2/router'
import {isString} from 'angular2/src/facade/lang'
import {AuthService} from "../../Datahub/routes/auth/authService/auth";
import {ApiService} from "../../ReusableServices/apiService";


/*
    arlows2
    2016-01-27
    custom version of the angular2/router RouterLink
        overrided onClick to allow for a more natural and flexible behavior
*/
@Directive({
    selector: '[routerLink]',
    providers:[AuthService],
    inputs: [
        'routeParams: routerLink',
        'roles: roles',
        'target: target',
        'width: width',
        'height: height'
    ],
    host: {
        '(click)': 'onClick()',
        '[attr.href]': 'visibleHref',

        // highlight
        '[class.list-group-item-info]': 'isRouteActive',

        // not authorized
        '[class.list-group-item-warning]': '!isAuthorized',
        //'[class.hidden]': '!isAuthorized',

        // not working
        //'[class.router-link-active]': 'isRouteActive',
    },
    outputs: [

    ]
})
export class CustomRouterLink {
    private _routeParams: any[];
    width: number = 800;
    height: number = 600;
    target: string;
    roles: string[] = [];

    public isAuthorized: boolean = true;

    // No auth route info
    private routeParamsNoAuth: any[] = ['NoAuth'];

    // the url displayed on the anchor element.

    visibleHref: string;

    // the instruction passed to the router to navigate
    private _navigationInstruction: Instruction;

    constructor(private _router: Router, private _location: Location, private _api: ApiService, private _auth: AuthService) {
    }

    ngOnInit() {
        this._auth.isAuthorizedInstruction(this._navigationInstruction, auth => {
            this.isAuthorized = auth;
        });
    }

    get isRouteActive(): boolean {
        return this._router.isRouteActive(this._navigationInstruction);
    }

    set routeParams(changes: any[]) {
        this._routeParams = changes;
        this._navigationInstruction = this._router.generate(this._routeParams);

        var navigationHref = this._navigationInstruction.toLinkUrl();
        this.visibleHref = this._location.prepareExternalUrl(navigationHref);
    }

    onClick(): any {
        var instruction: Instruction = this._router.generate(this._routeParams);
        var url = '#/' + instruction.urlPath;

        // Check any roles vs live authorization service
        //if (!this.isAuthorized){
        //    this._router.navigateByInstruction(this._router.generate(this.routeParamsNoAuth))
        //    return false;
        //}

        // Handle navigation
        switch (this.target) {

            // Keep it simple and let the browser figure it out
            default:
            case undefined:
            case null:
                // do nothing... return true below
                break;

            // bit of custom tweaking..
            case "_top":
            case "_parent":
            case "_blank":
                window.open(url, this.target);
                return false;
                //break;

            // custom value
            case 'modal':
                var style =
                    "width=" + this.width + "," +
                    "height=" + this.height + "," +
                    "top=" + ((window.screen.availHeight / 2) - (this.height / 2)) + "," +
                    //"left=" + ((window.screen.availWidth / 2) - (this.width / 2)) + "," +
                    "";

                window.open(url, this.target, style);
                return false;
                //break;

            // navigation in THIS frame only
            case "_self":
                // let angular router navigate cause it's fast that way
                this._router.navigateByInstruction(this._navigationInstruction)
                return false;
                //break;
        }

        // by default allow the borwser to handle this event
        return true;
    }
}
