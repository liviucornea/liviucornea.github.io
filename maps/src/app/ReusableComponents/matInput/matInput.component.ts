/**
 * Created by LINGM2 on 1/20/2017.
 */
import {Component, Input, ElementRef, ViewChild, Inject} from "@angular/core";
import {DOCUMENT} from "@angular/platform-browser";
import {Subject} from "rxjs/Subject";

@Component({
    selector: 'mat-input',
    template: require('./matInput.html'),
    host: {'(input-blur)': 'onInputBlur($event)', '(input-focus)': 'onInputFocus($event)'}
})

export class MatInputComponent {
    editing: boolean = false;
    // floating: boolean = false;
    disabled: boolean = false;
    @Input() placeholderText: string = '';

    private pageLoaded: boolean = false;
    private pageLoadedEmitter: Subject<any>;

    private labelElement: any;

    @ViewChild('matContent') matContent: ElementRef;

    constructor(@Inject(DOCUMENT) private document: any) {
        this.pageLoadedEmitter = new Subject();
    }

    ngAfterViewInit() {
        // forbid updates to the view until after it has been composed
        // see https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#parent-to-view-child
        setTimeout(_ => this.initializeFloating());
    }

    setFloating() {
        let inputValue = "";
        let inputElement = this.matContent.nativeElement.childNodes[1].parentNode.children[1];

        // if (inputElement == undefined) {
        //     inputElement = this.matContent.nativeElement.childNodes[0].parentNode.children[0]
        // }

        // find the correct input element if it is nested inside a component
        if (inputElement.nodeName.toLowerCase() == 'customdropdown' || inputElement.nodeName.toLowerCase() == 'typeahead-input') {
            inputValue = inputElement.children[0].value;
        } else {
            if (inputElement.nodeName.toLowerCase() != 'checkboxlist') {
                inputValue = inputElement.value;
            }
        }

        // given the correct input element, float based on its value
        if (inputElement.nodeName.toLowerCase() == 'checkboxlist') {
            this.floatLabel();
        }
        else if ((inputElement.nodeName.toLowerCase() == 'input') && (inputElement.type.toLowerCase() == 'date' || inputElement.type.toLowerCase() == 'datetime-local')) {
            this.floatLabel();
        }
        else if (inputElement.nodeName.toLowerCase() == 'select' && inputElement.selectedIndex > -1) {
            // required for filter select (e.g., displayGrid) - selected "ALL" option has value of ""
            this.floatLabel();
        }
        else if (this.editing == true || this.isNonemptyInput(inputValue)) {
            this.floatLabel();
        }
        else {
            this.sinkLabel();
        }
    }

    onInputBlur(event: any) {
        this.notEditingInput();
        this.setFloating();
    }

    onInputFocus(event: any) {
        // if the page is not loaded, we must wait before initializing these values
        if (!this.pageLoaded) {
            this.pageLoadedEmitter.subscribe((value) => {
                this.editingInput();
                this.setFloating();
            });
        }
        else {
            this.editingInput();
            this.setFloating();
        }
    }

    private isNonemptyInput(inputValue): boolean {
        if (inputValue != undefined && inputValue != null && inputValue.length != 0) {
            return true;
        }
        else {
            return false;
        }
    }

    private initializeFloating() {
        this.labelElement = this.matContent.nativeElement.childNodes[0].parentNode.children[0];
        this.initializeLabel();

        if (this.disabled == false) {
            this.setFloating();
        }

        this.pageLoaded = true;
        this.pageLoadedEmitter.next();
    }

    private initializeLabel() {
        this.addLabelCssClass('mat-input-placeholder');
        // this.addLabelCssClass('form-label');
        // if disabled
        if (this.matContent.nativeElement.childNodes[1].parentNode.children.length < 1) {
            this.disabled = true;
        }
    }

    private addLabelCssClass(cssClass: string) {
        if (!this.labelElement.classList.contains(cssClass)) {
            this.labelElement.classList.add(cssClass);
        }
    }

    private removeLabelCssClass(cssClass: string) {
        this.labelElement.classList.remove(cssClass);
    }

    private floatLabel() {
        this.addLabelCssClass('mat-input-placeholder-floating');
    }

    private sinkLabel() {
        this.removeLabelCssClass('mat-input-placeholder-floating');
    }

    private editingInput() {
        this.editing = true;
        this.addLabelCssClass('mat-editing');
    }

    private notEditingInput() {
        this.editing = false;
        this.removeLabelCssClass('mat-editing');
    }
}