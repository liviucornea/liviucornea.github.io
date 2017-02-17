import {Component} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
    selector: 'pageRedirect',
    template: ''

})

export class PageRedirect {

    constructor( private router: Router, private activatedRoute: ActivatedRoute){
        this.activatedRoute.params.forEach((params:Params) => {
            let path = params['path'];
            this.router.navigateByUrl(path);
        });
    }
}