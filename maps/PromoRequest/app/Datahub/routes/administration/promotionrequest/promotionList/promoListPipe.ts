import { Pipe, PipeTransform } from 'angular2/core';
import {PromotionActiveItemList, promoStatuses} from '../promotionrequestObjects';

@Pipe({
    name: 'filterList'
})

export class PromoListPipe  implements PipeTransform {
   promoStatuses: Array<string>;

    transform(value: PromotionActiveItemList[],  args: string[]): PromotionActiveItemList[] {
        let filterStatus = promoStatuses.indexOf(args[0]);
        return filterStatus > -1 ? value.filter(item => item.status == filterStatus): value;
    }

}