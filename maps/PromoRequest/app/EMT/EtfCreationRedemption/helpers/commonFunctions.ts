/**
 * Created by vikhnv2 on 6/3/2016.
 */
export class CommonFunctions {

    // Returns formatted today's date string.
    static today():string {
        let d:Date = new Date();
        return [d.getFullYear(), this.padLeft(d.getMonth() + 1), this.padLeft(d.getDate())].join('-');
    }

    // Pads a single digit number with a leading zero.
    static padLeft(value:number):string {
        return ('0' + (value)).slice(-2);
    }

    // Parses a date in '2016-12-31T00:00:00' format.
    static parseUTCDate(date:string):Date {
        return new Date(date.replace(/-/g, '\/').replace(/T.+/, ''));
    }

    // Clones an array of objects. Optionally, replaces JSON date strings with correct Date values.
    static  cloneObjectArray(source:any[], dateKeys:string[]):any[] {
        if (source && source.length > 0) {
            let copy:any[] = JSON.parse(JSON.stringify(source));
            // fix JSON string date values if any.
            if (dateKeys && dateKeys.length > 0) {
                for (var c = 0; c < copy.length; c++) {
                    let obj:any = copy[c];
                    for (var k = 0; k < dateKeys.length; k++) {
                        let key:string = dateKeys[k];
                        obj[key] = new Date(obj[key]);
                    }
                }
            }
            return copy;
        }
        else {
            return source;
        }
    }

    // Converts boolean value to byte representation.
    static convertBooleanToByte(value:boolean):number {
        return value ? 1 : 0;
    }

    // Converts byte value to boolean representation.
    static convertByteToBoolean(value:number):boolean {
        return value == 1 ? true : false;
    }

    // Converts boolean value to yes/no string representation.
    static convertToYesNo(value:boolean):string {
        return value ? "Yes" : "No";
    }
}