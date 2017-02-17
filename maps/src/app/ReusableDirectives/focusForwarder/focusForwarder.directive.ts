import {Renderer, ElementRef, Directive} from "@angular/core";
@Directive({
    selector: 'input,select',
    host: {'(blur)': 'onBlur($event)', '(focus)': 'onFocus($event)'}
})

export class FocusForwarder {
    constructor(private elemRef: ElementRef, private renderer: Renderer) {
    }

    onBlur($event) {
        this.renderer.invokeElementMethod(this.elemRef.nativeElement,
            'dispatchEvent',
            [new CustomEvent('input-blur', {bubbles: true})]);
    }

    onFocus($event) {
        this.renderer.invokeElementMethod(this.elemRef.nativeElement,
            'dispatchEvent',
            [new CustomEvent('input-focus', {bubbles: true})]);
    }
}