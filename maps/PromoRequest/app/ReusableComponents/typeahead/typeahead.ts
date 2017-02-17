import {Component, ElementRef, Input, Output, EventEmitter} from "angular2/core";

@Component({
    selector: "typeahead-input",
    host: {
        "(keyup)": "onKey($event)"
    },
    templateUrl:"app/ReusableComponents/typeahead/typeahead.html"

})
export class TypeAhead {
    @Input("search") public search:(term:string) => Promise<Array<{ id:string, text:string }>>;
    // public  search: (term: string) => Promise<Array<{ id: string, text: string }>>;
    @Output("onSelected") public selected = new EventEmitter();
    private term = "";
    private listCmp:Array<{ id:string, text:string }> = [];
    private refreshTimer:any = undefined;
    private searchInProgress = false;
    private searchRequired = false;
    private itemDescription: string;

    constructor(private el:ElementRef) {
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
                        this.doSearch();
                    } else {
                        this.searchRequired = true;
                    }
                },
                200);
        }

    }

    private doSearch() {
        this.refreshTimer = undefined;
        if (this.search && this.term !== "") {
            this.searchInProgress = true;
            this.search(this.term)
                .then((res) => {
                    this.searchInProgress = false;
                    if (this.searchRequired) {
                        this.searchRequired = false;
                        this.listCmp = [];
                        this.doSearch();
                    } else {
                        this.displayList(res);
                    }
                });
        }
    }

    private displayList(list:Array<{ id:string, text:string }>) {
                      this.listCmp = list;
    }

    selectItem(item){
        this.selected.emit(item);
        if (this.listCmp) {
            this.listCmp = [];
            this.itemDescription = item.id + ' - ' + item.text;
        }
    }



}