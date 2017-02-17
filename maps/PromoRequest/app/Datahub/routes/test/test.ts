import {Component} from 'angular2/core';
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {CustomRouterLink} from "../../../ReusableDirectives/routerLink/routerLink";

@Component({
    selector: 'login',
    templateUrl: 'app/Datahub/routes/test/test.html',
    directives: [CustomRouterLink, DROPDOWN_DIRECTIVES],
})
export class Test {
    constructor() {
    }

    private disabled: boolean = false;
    private status: { isopen: boolean } = { isopen: false };
    private items: Array<string> = ['The first choice!', 'And another choice for you.', 'but wait! A third!'];

    private toggled(open: boolean): void {
        console.log('Dropdown is now: ', open);
    }

    private toggleDropdown($event: MouseEvent): void {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    }
}