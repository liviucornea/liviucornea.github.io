import {Observable} from 'rxjs'
import {Injectable} from 'angular2/core'
import {Instruction} from 'angular2/router'
import {Router, Location} from 'angular2/router'
import {ApiService} from "../../../../ReusableServices/apiService";


@Injectable()
export class AuthService {
    componentRoles = {};

    constructor(private _api: ApiService, private _router: Router, private _location: Location) {
        // main page stuff
        this.componentRoles["home"] = [];
        this.componentRoles["contact"] = [];
        this.componentRoles["test"] = ['test'];

        // main applications
        this.componentRoles["logs"] = ['all', 'logs'];
        this.componentRoles["auth"] = ['all', 'auth'];

        // auth sub controls (for example
        this.componentRoles["auth/resource"] = [];
        this.componentRoles["auth/roleresource"] = [];

        // subscribe to the router events
        this._router.subscribe(
            value => {

                //this.isAuthorizedPath(_location.path(), auth => {
                this.isAuthorizedPath('/' + value, auth => {

                    //this.isAuthenticated = auth;

                    if (!auth) {
                        _router.navigateByUrl('noauth');
                    }
                });
            });
    }

    getComponentRoles(urlPath) {
        if (urlPath[0] == '/')
            urlPath = urlPath.substring(1);

        return this.componentRoles[urlPath] ? this.componentRoles[urlPath] : [];
    }

    isAuthorizedPath(urlPath: string, callback: (result: boolean) => void) {
        var requiredRoles = this.getComponentRoles(urlPath);

        if (requiredRoles && requiredRoles.length > 0) {
            this._api.getAuthCurrentUserRoles()
                .subscribe(
                res => {
                    var roles = res.json();

                    var isAuthorized: boolean = false;
                    for (var role of roles) {
                        if (requiredRoles.indexOf(role.Name.toLowerCase()) >= 0)
                            isAuthorized = true;
                    }

                    callback(isAuthorized);
                },
                error => {
                    console.log(`error: ${error}`);
                });
        }
        else {
            callback(true);
        }
    }

    isAuthorizedInstruction(instruction: Instruction, callback: (result: boolean) => void) {
        var componentPath = instruction.component.urlPath;

        var instChild = instruction.child;
        while (instChild != null) {
            componentPath += '/' + instChild.component.urlPath;

            instChild = instChild.child;
        }

        this.isAuthorizedPath(componentPath, callback);
    }
}