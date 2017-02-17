import { Injectable, ElementRef, EventEmitter } from '@angular/core';
import { DragDropConfig } from '../ReusableComponents/dragdrop/dnd.config';
import { isPresent } from '../ReusableComponents/dragdrop/dnd.utils';

export interface DragDropData {
    dragData: any;
    mouseEvent: MouseEvent;
}

@Injectable()
export class DragDropService {
    allowedDropZones: Array<string> = [];
    onDragSuccessCallback: EventEmitter<DragDropData>;
    dragData: any;
    isDragged: boolean;
}

@Injectable()
export class DragDropSortableService {
    index: number;
    sortableData: Array<any>;
    isDragged: boolean;

    private _elem: HTMLElement;
    constructor(private _config: DragDropConfig) { }
    public get elem(): HTMLElement {
        return this._elem;
    }

    markSortable(elem: HTMLElement) {
        if (isPresent(this._elem)) {
            this._elem.classList.remove(this._config.onSortableDragClass);
        }
        if (isPresent(elem)) {
            this._elem = elem;
            this._elem.classList.add(this._config.onSortableDragClass);
        }
    }
}
