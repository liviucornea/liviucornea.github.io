import {Component, Injectable, EventEmitter} from 'angular2/core';
import {PromotionActiveItemList, PromotionGeneralItem} from "../promotionrequestObjects";

@Injectable()
@Component({})
export class PromotionRequestListService {
    public outputValue$:EventEmitter<PromotionActiveItemList>;
    public askToCreatePromo$:EventEmitter<number>;
    public qaMessage: EventEmitter<number>;
    public allPromosList: PromotionGeneralItem[] = [];

    constructor() {
        this.outputValue$ = new EventEmitter();
        this.askToCreatePromo$ = new EventEmitter();
        this.qaMessage = new EventEmitter();
    }

    searchAllPromos (){
        var self = this;
        return (filter: string): Promise<Array<{ id: string, text: string }>> => {
            return new Promise<Array<{ id: string, text: string }>>((resolve, reject) => {

                let outputList = new Array<any>();
                self.allPromosList.forEach(function (x) {
                    if (x.description.toUpperCase().indexOf(filter.toUpperCase()) > -1 || x.id == filter || filter.trim() === ''  )
                        outputList.push({
                            'id': x.id,
                            'text': x.description,
                        })
                });
                resolve(outputList);

            });

        };
    };



};

export class modalObject {
    constructor( public type:string, public value:string, public toBeSaved:boolean = true) {
    }
}
;