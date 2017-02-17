import {Component, ElementRef, Input, Output, EventEmitter, AfterViewInit, ViewChildren} from "@angular/core";


@Component({
    selector: "typeahead-input",
    host: {
        "(keyup)": "onKey($event)"
    },
    template: require("./typeahead.html")

})
export class TypeAhead implements AfterViewInit{
    @ViewChildren('theInput') theInput;
    @Input("search") public search:(term:string) => Promise<Array<{ id:string, text:string }>>;
    // public  search: (term: string) => Promise<Array<{ id: string, text: string }>>;
    @Output("onSelected") public selected = new EventEmitter();
    private term = "";
    private listCmp:Array<{ id:string, text:string }> = [];
    private refreshTimer:any = undefined;
    private searchInProgress = false;
    private searchRequired = false;
    private itemDescription:string;

    constructor(private el:ElementRef) {
    }

    ngAfterViewInit() {
        this.theInput.first.nativeElement.focus();
    }

    public onKey(event:any) {
        if (event.keyCode === 27) {
            this.listCmp = [];
            event.target.value = null;
            return;
        }
        this.term = event.target.value;
        if (!this.refreshTimer) {
            this.refreshTimer = setTimeout(
                () => {
                    if (!this.searchInProgress) {
                        this.doSearch(event.keyCode);
                    } else {
                        this.searchRequired = true;
                    }
                },
                200);
        }

    }

    private doSearch( keyCode: number) {
        let self = this;
        self.refreshTimer = undefined;
        if (self.search && self.term !== "") {
            self.searchInProgress = true;
            self.search(self.term)
                .then((res) => {
                    self.searchInProgress = false;
                    if (self.searchRequired) {
                        self.searchRequired = false;
                        self.listCmp = [];
                        self.doSearch(keyCode);
                    } else {
                        if ( keyCode === 13 && parseInt(self.term) && res.find(x => x.id == self.term)) {
                            self.listCmp = [];
                            self.selected.emit({'id': self.term  , 'text': ''})
                        }else{
                            self.displayList(res);
                        }
                    }
                });
        }
    }

    private displayList(list:Array<{ id:string, text:string }>) {
        this.listCmp = list;
    }

    selectItem(item) {
        this.selected.emit(item);
        if (this.listCmp) {
            this.listCmp = [];
            this.itemDescription = item.id + ' - ' + item.text;
        }
    }

    reset() {
            this.listCmp = [];
            this.itemDescription = '';
     }


}