import {Component, Input, Output, EventEmitter, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";

export const CUSTOM_PAGINATION_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Pagination),
    multi: true
};

@Component({
    template: require("./pagination.html"),
    selector: 'pagination',
    providers: [CUSTOM_PAGINATION_ACCESSOR],
})

export class Pagination implements ControlValueAccessor{


    private isInit:boolean = false;
    private pages:Array<any>;

    @Input() public maxSize:number;
    @Input() public boundaryLinks:boolean = false;
    @Input() public directionLinks:boolean = true;
    // labels
    @Input() public firstText:string = 'First';
    @Input() public previousText:string = 'Previous';
    @Input() public nextText:string = 'Next';
    @Input() public lastText:string = 'Last';
    @Input() public rotate:boolean = true;
    @Input() private disabled:boolean;

    @Output() private numPages:EventEmitter<any> = new EventEmitter();
    @Output() private pageChanged:EventEmitter<any> = new EventEmitter();

    private currentMasterPage: number = 1;
    private currentChildPage: number = 1;

    public set page(value) {
        let _page = (value > this.totalPages) ? this.totalPages : (value || 1);
        if (this.isInit) {
            this.pageChanged.emit({
                page: (this.IsChildPage) ? this.currentChildPage = _page : this.currentMasterPage = _page
                //, itemsPerPage: this.itemsPerPage
            });
        }
    }
    public get page() {
        return (this.IsChildPage) ? this.currentChildPage : this.currentMasterPage;
    }

    private _isChildPage:boolean = false;
    @Input() private get IsChildPage():boolean {
        return this._isChildPage;
    }
    private set IsChildPage(v:boolean) {
        this._isChildPage = v;
    }

    private _totalPages:number;
    private get totalPages() {
        return this._totalPages;
    }
    private set totalPages(v:number) {
        this._totalPages = v;
        this.numPages.emit(v);
        if (this.isInit) {
            this.selectPage(this.page);
        }
    }

    private _totalItems:number;
    @Input() private get totalItems():number {
        return this._totalItems;
    }
    private set totalItems(v:number) {
        this._totalItems = v;
        this.totalPages = this.calculateTotalPages();
    }

    private _itemsPerPage:number;
    @Input() public get itemsPerPage() {
        return this._itemsPerPage;
    }
    public set itemsPerPage(v:number) {
        this._itemsPerPage = v;
        this.totalPages = this.calculateTotalPages();
    }

    ngOnInit() {
        this.totalPages = this.calculateTotalPages();
        this.pages = this.getPages(this.page, this.totalPages);
        this.page= 1;
    }

    private calculateTotalPages():number {
        let totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage);
        return Math.max(totalPages || 0, 1);
    }

    private getPages(currentPage:number, totalPages:number):Array<any> {
        let pages:any[] = [];

        // Default page limits
        let startPage = 1;
        let endPage = totalPages;
        let isMaxSized = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;

        // recompute if maxSize
        if (isMaxSized) {
            if (this.rotate) {
                // Current page is displayed in the middle of the visible ones
                startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 1);
                endPage = startPage + this.maxSize - 1;

                // Adjust if limit is exceeded
                if (endPage > totalPages) {
                    endPage = totalPages;
                    startPage = endPage - this.maxSize + 1;
                }
            } else {
                // Visible pages are paginated with maxSize
                startPage = ((Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize) + 1;

                // Adjust last page if limit is exceeded
                endPage = Math.min(startPage + this.maxSize - 1, totalPages);
            }
        }

        // Add page number links
        for (var number = startPage; number <= endPage; number++) {
            let page = this.makePage(number, number.toString(), number === currentPage);
            pages.push(page);
        }

        // Add links to move between page sets
        if (isMaxSized && !this.rotate) {
            if (startPage > 1) {
                let previousPageSet = this.makePage(startPage - 1, '...', false);
                pages.unshift(previousPageSet);
            }

            if (endPage < totalPages) {
                let nextPageSet = this.makePage(endPage + 1, '...', false);
                pages.push(nextPageSet);
            }
        }
        return pages;
    }

    writeValue(value:number) {
        this.page = value;
        this.pages = this.getPages(this.page, this.totalPages);
        if (!this.isInit) {
            this.isInit = true;
        }
    }

    private selectPage(page:number, event?:MouseEvent) {

        if (event) {
            event.preventDefault();
        }
        if (!this.disabled) {

            if (event && event.target) {
                let target: any = event.target;
                target.blur();
            }
            this.writeValue(page);

            this.pageChanged.emit({
                page: this.page
                //, itemsPerPage: this.itemsPerPage
            });
        }
    }

    private getText(key:string):string {
        return key;
    }

    private noPrevious():boolean {
        return this.page === 1;
    }

    private noNext():boolean {
        return this.page === this.totalPages;
    }

    // Create page object used in template
    private makePage(number:number, text:string, isActive:boolean):{number: number, text: string, active: boolean} {
        return {
            number: number,
            text: text,
            active: isActive
        };
    }

    onChange = (_:any) => {
    };
    onTouched = () => {
    };

    registerOnChange(fn:(_:any) => {}):void {
        this.onChange = fn;
    }

    registerOnTouched(fn:() => {}):void {
        this.onTouched = fn;
    }
}