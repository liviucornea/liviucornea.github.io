
import {Injectable, ChangeDetectorRef} from '@angular/core';
import {Directive, Input, Output, EventEmitter, ElementRef} from '@angular/core';

import {DragDropConfig, DragImage} from './dnd.config';

import {isString, isFunction, isPresent, createImage, callFun} from './dnd.utils';
import {DragDropService} from "../../ReusableServices/dnd.service";

//@Injectable()
export abstract class AbstractComponent {
    _elem: HTMLElement;
    _dragHelper: HTMLElement;
    _defaultCursor: string;
    private _dragEnabled: boolean = false;
    set dragEnabled(enabled: boolean) {
        this._dragEnabled = !!enabled;
        this._elem.draggable = this._dragEnabled;
    }
    get dragEnabled(): boolean {
        return this._dragEnabled
    }

    dropEnabled: boolean = false;
    effectAllowed: string;
    effectCursor: string;

    allowDrop: (dropData: any) => boolean;
    dropZones: string[] = [];


    dragImage: string | DragImage | Function;

    cloneItem: boolean = false;

    constructor(elemRef: ElementRef, public _dragDropService: DragDropService, public _config: DragDropConfig,
        private _cdr: ChangeDetectorRef) {

        this._elem = elemRef.nativeElement;
        //
        // DROP events
        //
        this._elem.ondragenter = (event: Event) => {
            this._onDragEnter(event);
        };
        this._elem.ondragover = (event: DragEvent) => {
            this._onDragOver(event);
            //
            if (event.dataTransfer != null) {
                event.dataTransfer.dropEffect = this._config.dropEffect.name;
            }

            return false;
        };
        this._elem.ondragleave = (event: Event) => {
            this._onDragLeave(event);
        };
        this._elem.ondrop = (event: Event) => {
            this._onDrop(event);
        };
        //
        // Drag events
        //
        this._elem.ondragstart = (event: DragEvent) => {
            // console.log('ondragstart', event.target);
            this._onDragStart(event);
            //
            if (event.dataTransfer != null) {
                event.dataTransfer.setData('text', '');
                // Change drag effect
                event.dataTransfer.effectAllowed = this.effectAllowed || this._config.dragEffect.name;
                // Change drag image
                if (isPresent(this.dragImage)) {
                    if (isString(this.dragImage)) {
                        (<any>event.dataTransfer).setDragImage(createImage(<string>this.dragImage));
                    } else if (isFunction(this.dragImage)) {
                        (<any>event.dataTransfer).setDragImage(callFun(<Function>this.dragImage));
                    } else {
                        let img: DragImage = <DragImage>this.dragImage;
                        (<any>event.dataTransfer).setDragImage(img.imageElement, img.x_offset, img.y_offset);
                    }
                } else if (isPresent(this._config.dragImage)) {
                    let dragImage: DragImage = this._config.dragImage;
                    (<any>event.dataTransfer).setDragImage(dragImage.imageElement, dragImage.x_offset, dragImage.y_offset);
                } else if (this.cloneItem) {
                    this._dragHelper = <HTMLElement>this._elem.cloneNode(true);
                    this._dragHelper.classList.add('dnd-drag-item');
                    this._dragHelper.style.position = "absolute";
                    this._dragHelper.style.top = "0px";
                    this._dragHelper.style.left = "-1000px";
                    this._elem.parentElement.appendChild(this._dragHelper);
                    (<any>event.dataTransfer).setDragImage(this._dragHelper, event.offsetX, event.offsetY);
                }
                // Change drag cursor
                if (this._dragEnabled) {
                    this._elem.style.cursor = this.effectCursor ? this.effectCursor : this._config.dragCursor;
                } else {
                    this._elem.style.cursor = this._defaultCursor;
                }
            }
        };
        this._elem.ondragend = (event: Event) => {
            if (this._elem.parentElement && this._dragHelper) {
                this._elem.parentElement.removeChild(this._dragHelper);
            }
            // console.log('ondragend', event.target);
            this._onDragEnd(event);
            // Restore style of dragged element
            this._elem.style.cursor = this._defaultCursor;
        };
    }

    detectChanges() {
        // Programmatically run change detection to fix issue in Safari
        setTimeout(() => {
            this._cdr.detectChanges();
        }, 250);
    }

    private _onDragEnter(event: Event): void {
        // console.log('ondragenter._isDropAllowed', this._isDropAllowed);
        if (this._isDropAllowed) {
             event.preventDefault(); // prevent's default handling for drops; required for IE ondragover
            this._onDragEnterCallback(event);
        }
    }

    private _onDragOver(event: Event) {
        // // console.log('ondragover._isDropAllowed', this._isDropAllowed);
        if (this._isDropAllowed) {
            // The element is over the same source element - do nothing
            if (event.preventDefault) {
                // Necessary. Allows us to drop.
                event.preventDefault();
            }

            this._onDragOverCallback(event);
        }
    }

    private _onDragLeave(event: Event): void {
        // console.log('ondragleave._isDropAllowed', this._isDropAllowed);
        if (this._isDropAllowed) {
            // event.preventDefault();
            this._onDragLeaveCallback(event);
        }
    }

    private _onDrop(event: Event): void {
        // console.log('ondrop._isDropAllowed', this._isDropAllowed);
        if (this._isDropAllowed) {
            if (event.preventDefault) {
                // Necessary. Allows us to drop.
                event.preventDefault();
            }

            if (event.stopPropagation) {
                // Necessary. Allows us to drop.
                event.stopPropagation();
            }

            this._onDropCallback(event);

            this.detectChanges();
        }
    }

    private get _isDropAllowed(): boolean {
        if (this._dragDropService.isDragged && this.dropEnabled) {
            // First, if `allowDrop` is set, call it to determine whether the
            // dragged element can be dropped here.
            if (this.allowDrop) {
                return this.allowDrop(this._dragDropService.dragData);
            }

            // Otherwise, use dropZones if they are set.
            if (this.dropZones.length === 0 && this._dragDropService.allowedDropZones.length === 0) {
                return true;
            }
            for (let i: number = 0; i < this._dragDropService.allowedDropZones.length; i++) {
                let dragZone: string = this._dragDropService.allowedDropZones[i];
                if (this.dropZones.indexOf(dragZone) !== -1) {
                    return true;
                }
            }
        }
        return false;
    }

    private _onDragStart(event: Event): void {
        // console.log('ondragstart.dragEnabled', this._dragEnabled);
        if (this._dragEnabled) {
            this._dragDropService.allowedDropZones = this.dropZones;
            // console.log('ondragstart.allowedDropZones', this._dragDropService.allowedDropZones);
            this._onDragStartCallback(event);
        }
    }

    private _onDragEnd(event: Event): void {
        this._dragDropService.allowedDropZones = [];
        // console.log('ondragend.allowedDropZones', this._dragDropService.allowedDropZones);
        this._onDragEndCallback(event);
    }

    //**** Drop Callbacks ****//
    _onDragEnterCallback(event: Event) { }
    _onDragOverCallback(event: Event) { }
    _onDragLeaveCallback(event: Event) { }
    _onDropCallback(event: Event) { }

    _onDragStartCallback(event: Event) { }
    _onDragEndCallback(event: Event) { }
}
