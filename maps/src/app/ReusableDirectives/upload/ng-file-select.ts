import {
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    HostListener
} from '@angular/core';
import {Ng2Uploader} from "../../ReusableServices/uploadService";

@Directive({
    selector: '[ngFileSelect]'
})
export class NgFileSelectDirective {

    @Input() events: EventEmitter<any>;
    @Output() onUpload: EventEmitter<any> = new EventEmitter();

    _options:any;
    get options(): any {
        return this._options;
    }

    @Input('options')
    set options(value: any) {
        this._options = value;
        this.uploader.setOptions(this.options);
    }

    files: any[] = [];

    constructor(public el: ElementRef, private uploader: Ng2Uploader) {

        setTimeout(() => {
            this.uploader.setOptions(this.options);
        });

        this.uploader._emitter.subscribe((data: any) => {
            this.onUpload.emit(data);
            if (data.done) {
                this.files = this.files.filter(f => f.name !== data.originalName);
            }
        });

        setTimeout(() => {
            if (this.events) {
                this.events.subscribe((data: string) => {
                    if (data === 'startUpload') {
                        this.uploader.uploadFilesInQueue();
                    }
                });
            }
        });
    }

    filterFilesByExtension(): boolean {
        var allowedExtensions = true;

        this.files = this.files.filter(f => {
            if (this.uploader.options.allowedExtensions.indexOf(f.type) !== -1) {
                return true;
            }

            let ext: string = f.name.split('.').pop();
            if (this.uploader.options.allowedExtensions.indexOf(ext) !== -1 ) {
                return true;
            }

            allowedExtensions = false;
            return false;
        });

        return (allowedExtensions);
    }

    filterUploadSize(): boolean {
        var allowedMaxUploadSize = true;

        this.files = this.files.filter(f => {
            if (f.size > this.uploader.options.maxUploadSize) {
                allowedMaxUploadSize =  false;
                return false;
            }
            return true;
        });

        return (allowedMaxUploadSize);
    }

    @HostListener('change') onChange() {
        this.files = Array.from(this.el.nativeElement.files);

        if((this.files.length + this.uploader.queue.length) > this.uploader.options.maxUploads) {
            this.uploader.validateFileEventEmitter.emit("Too many files selected");
            return;
        }

        if (this.uploader.options.allowedExtensions.length) {
            if(!this.filterFilesByExtension()){
                this.uploader.validateFileEventEmitter.emit("Incorrect file(s) type selected");
            }
        }

        if(!this.filterUploadSize()) {
            this.uploader.validateFileEventEmitter.emit("Uploaded file(s) size too big");
        }

        if (this.files.length) {
            this.uploader.addFilesToQueue(this.files);
        }
    }
}