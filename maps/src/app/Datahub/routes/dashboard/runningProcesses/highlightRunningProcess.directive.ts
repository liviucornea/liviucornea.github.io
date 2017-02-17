import { Directive, ElementRef, Input, Renderer, AfterViewInit } from '@angular/core';
@Directive({
    selector: '[processHighlight]'
})
export class ProcessHighlightDirective implements AfterViewInit{

    @Input('processHighlight') highlightColor: string;

    private _defaultColor = 'white';

    constructor(private el: ElementRef, private renderer: Renderer) {

    }

    ngAfterViewInit() {
        if (this.highlightColor )
        this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', this.highlightColor || this._defaultColor);
    }

}