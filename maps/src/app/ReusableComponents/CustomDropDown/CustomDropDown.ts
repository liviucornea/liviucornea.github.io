import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';


@Component({
    selector: "customDropDown",
    template:   `
                <select name="dropdowncontrol" class="form-control" [disabled]="disabled" [(ngModel)]="selectedValue" (change)="EmitSelectedValue($event.target.value)">
                    <option *ngFor="let itemOption of DataSource" value="{{itemOption.Value}}" selected = "itemOption.Value == selectedValue">{{itemOption.Description}}</option>
                </select>
                `
})
export class CustomDropDown
{
    @Input() set Disabled (value: any) {
        this.disabled = value;
    }
    @Input() selectedValue: any;
    @Input() DataSource: Array<any>;
    @Output() public DropDownEmitter: EventEmitter<any> = new EventEmitter<any>();
    disabled: boolean = false;

    ngOnInit()
    {
    }

    EmitSelectedValue(data)
    {
        this.DropDownEmitter.emit({Value: data});
    }
}