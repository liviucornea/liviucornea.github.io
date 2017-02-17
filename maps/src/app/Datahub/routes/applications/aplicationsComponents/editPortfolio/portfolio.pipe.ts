import {Pipe, PipeTransform} from '@angular/core';
import {PortfolioItem} from "./editPortfolio";

@Pipe({name: 'portfoliosByNumberOrName'})
export class PortfolioFilter implements PipeTransform {
    transform(portfolios: any, filterValue:string, number:boolean) {
        if (filterValue) {
            if(number){
                return portfolios.filter(x => x.PortfolioNumber.includes(filterValue));
            }
            else{
                return portfolios.filter(x => x.PortfolioName.includes(filterValue));
            }
        } else {
            return [];
        }
    }
}