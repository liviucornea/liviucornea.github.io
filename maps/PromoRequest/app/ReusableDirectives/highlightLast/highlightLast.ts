import {Directive, ElementRef, Input} from 'angular2/core';

@Directive({
    selector: '[highlightlast]'
})

export class highlightlast {
    constructor(el: ElementRef) {
        //el.nativeElement.style.backgroundColor = 'yellow';
        //el.nativeElement.style.color = 'green';

        var element: HTMLElement = el.nativeElement;
        //element.setAttribute("color", "green");
        element.setAttribute("selected", "true");
        element.setAttribute("selected", "false");
    }
}