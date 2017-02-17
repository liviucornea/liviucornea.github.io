import {
    Component, Input, Output, EventEmitter, ElementRef, Renderer, forwardRef, OnInit,
    HostListener, DoCheck
} from "@angular/core";
import {Subscription} from "rxjs";
import {matrixService} from "../../ReusableServices/matrixService";
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";

const MULTISELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckBoxListComponent),
    multi: true
};

export interface IMultiSelectOption {
    Value: any;
    Description: string;
}

@Component({
    template: require("./checkBoxList.html"),
    selector: 'checkBoxList',
    providers: [MULTISELECT_VALUE_ACCESSOR],
    host: {
        '(document:click)': 'onClick($event)',
    }
})

export class CheckBoxListComponent implements OnInit,DoCheck, ControlValueAccessor{
    @Input() DataSource: any;
    @Input() value: any;
    @Input() set Disabled(value: any) {
        this.disabled = value;
    }

    //@Output() public CheckBoxListEmitter: EventEmitter<any> = new EventEmitter<any>();

    expanded: boolean = false;
    disabled: boolean = false;
    checked: any;

    private checkedAllObservable: Subscription;


    model = [];
    title: string;
    numSelected: number = 0;
    isVisible: boolean = false;
    searchFilterText: string = '';

    constructor(private matrixService: matrixService, private element: ElementRef) {
    }

    ngOnInit() {
/*        this.settings = Object.assign(this.defaultSettings, this.settings);
        this.texts = Object.assign(this.defaultTexts, this.texts);
        this.title = this.texts.defaultTitle;*/
    }

    @HostListener('document: click', ['$event.target'])
    onClick(target: HTMLElement) {
        let parentFound = false;
        while (target != null && !parentFound) {
            if (target === this.element.nativeElement) {
                parentFound = true;
            }
            target = target.parentElement;
        }
        // target is null when clicking off of the checkboxlist
        if (!parentFound && typeof target !== 'undefined') {
         this.isVisible = false;
        }
    }

    onModelChange: Function = (_: any) => { };
    onModelTouched: Function = () => { };


    writeValue(value: any): void {
        if (value !== undefined) {
            this.model = value;
        }
    }

    ngDoCheck() {
        this.updateNumSelected();
        this.updateTitle();

    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    clearSearch() {
        this.searchFilterText = '';
    }

    toggleDropdown() {
        this.isVisible = !this.isVisible;
        if (!this.isVisible) {
            //this.dropdownClosed.emit();
        }
    }

    isSelected(option): boolean {
        return this.model && this.model.indexOf(option.Value) > -1;
    }

    setSelected(event: Event, option) {
        if (!this.model) {
            this.model = [];
        }
        let index = this.model.indexOf(option.Value);
        if (index > -1) {
            this.model.splice(index, 1);
        } else {
            //if (this.settings.selectionLimit === 0 || this.model.length < this.settings.selectionLimit) {
                this.model.push(option.Value);
            /*} else {
                if (this.settings.autoUnselect) {
                    this.model.push(option.id);
                    this.model.shift();
                } else {
                    this.selectionLimitReached.emit(this.model.length);
                    return;
                }
            }*/
        }
        //if (this.settings.closeOnSelect) {
        //     this.toggleDropdown();
        //}
        this.onModelChange(this.model);
    }

    updateNumSelected() {
        this.numSelected = this.model && this.model.length || 0;
    }

    updateTitle() {
        if (this.numSelected === 0) {
            this.title = "Select an option";//this.texts.defaultTitle;
        } else if (3 >= this.numSelected) {
            this.title = this.DataSource
                .filter((option) =>
                    this.model && this.model.indexOf(option.Value) > -1
                )
                .map((option) => option.Description)
                .join(', ');
        } else {
            this.title = this.numSelected
                + '  selected';
               // + (this.numSelected === 1 ? this.texts.checked : this.texts.checkedPlural);
        }
    }

    checkAll() {
        this.model = this.DataSource.map(option => option.Value);
        this.onModelChange(this.model);
    }

    uncheckAll() {
        this.model = [];
        this.onModelChange(this.model);
    }


    /*ngOnInit() {
        let self = this;
        self.checkedAllObservable = this.matrixService.resetCheckBoxList.subscribe((response) => {
            self.checked = (response)? true: '';
        });
    }

    ngOnDestroy() {
        if (this.checkedAllObservable) {
            this.checkedAllObservable.unsubscribe();
        }
    }

    addRemoveAll(event: any): void {
        if (event.target.checked) {
            this.DataSource.forEach(opt => {
                if (!opt.Checked) {
                    opt.Checked = true;
                }
            });
        }
        else {
            this.DataSource.forEach(opt => {
                opt.Checked = false;
            });
        }
        //this.emitSelectedValue();
    }

    get selectedOptions() {
        var selected = this.DataSource
            .filter(opt => opt.Checked);
        return selected.length == 0 ? [] : selected;
    }

    toggleExpanded() {
        this.expanded = !this.expanded;
    }*/

   /* emitSelectedValue() {
        this.CheckBoxListEmitter.emit({Value: this.selectedOptions});
    }*/

    /*onClick(event) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.expanded = false;
        }
    }

    updateValueBySelection()
    {
        this.value = this.selectedOptions.map(p=>p.Value);
    }*/
}