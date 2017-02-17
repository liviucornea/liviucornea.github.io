import {Component, Input, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'accordion',
    template: require('./accordion.html'),
})

export class Accordion {
    @Input() title: string;
    @Input() collapsed: boolean = false;
    @Output() collapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
}