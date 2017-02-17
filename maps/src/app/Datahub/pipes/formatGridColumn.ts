import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe, DecimalPipe, PercentPipe, CurrencyPipe, I18nSelectPipe} from "@angular/common";
import {LocalizationService} from "../../ReusableServices/localizationService";
import {toUTCDate} from "../../ReusableServices/genericfunctions";
import * as _ from 'lodash';

@Pipe({ name: 'formatGridColumn' })
export class FormatGridColumnPipe implements PipeTransform {

    constructor(private localization: LocalizationService ){

    }
    transform(value: any, args:any[]): any {

        if (!(args)) { return value;}
        if(value == null){return;}

        var output: any;

        var locale = this.localization.selectedLanguage.LangCode;

        var tokens: any;
        var digitalInfo: Array<any>=[];
        let formatType = args["format"].toLowerCase();
        if(formatType === "select" || formatType === "font-awesome"){
            tokens = args["pattern"];
        }
        else{
            tokens = args["pattern"].split(':');
        }
        switch (formatType) {
            case "date":
                if (isNaN(Date.parse(value))) {
                    return "";
                }
                var datePipe = new DatePipe(locale);
                output = datePipe.transform(toUTCDate(new Date(value)), tokens[0]);
                break;
            case "number":
                if (isNaN(value)) {
                    return "";
                }
                digitalInfo = this.getDigitInfo(tokens[0]);
                var numPipe = new DecimalPipe(locale);
                var result = numPipe.transform(parseFloat(value), tokens[0]);

                output = this.addTrailingZeros(result, digitalInfo[2]);
                break;
            case "percent":
                if (isNaN(value)) {
                    return "";
                }
                digitalInfo = this.getDigitInfo(tokens[0]);
                var percentPipe = new PercentPipe(locale);
                result = percentPipe.transform(parseFloat(value), tokens[0]);

                output = this.addTrailingZeros(result, digitalInfo[2]);
                break;
            case "currency":
                if (isNaN(value)) {
                    return "";
                }
                digitalInfo = this.getDigitInfo(tokens[2]);
                var currencyPipe = new CurrencyPipe(locale);
                result = currencyPipe.transform(parseFloat(value), tokens[0], tokens[1], tokens[2]);

                output = this.addTrailingZeros(result, digitalInfo[2]);
                break;
            case "select":
                var selectPipe = new I18nSelectPipe();
                output = selectPipe.transform(String(value), tokens);
                break;
            case "font-awesome":
                var selectPipe = new I18nSelectPipe();
                output = selectPipe.transform(String(value), tokens);
                break;
            case "uppercase":
                output = value.toUpperCase();
                break;
            case "lowercase":
                output = value.toLowerCase();
                break;
            default:
                output = value;
        }
        return output;
    }

    getDigitInfo(input): Array<any>{
        return input.split(/[.-]+/);
    }

    addTrailingZeros(input: string, fractionDigits: number) {
        var res = input.split(".");
        var out = input;
        if(input.indexOf('.') === -1) {
            out = input + '.' + _.repeat('0', fractionDigits);
        } else if (res[1].length < fractionDigits) {
            out = res[0]+ '.' + _.padEnd(res[1], fractionDigits, '0');
        }
        return out;
    }
}
