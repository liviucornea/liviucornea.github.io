import { Injectable } from '@angular/core';
import {saveAs} from 'file-saver'


@Injectable()
export class ExcelService {
    constructor()
    {

    }


    exportToExcel(gridSettings: any, records: Array<any>=[])
    {
        var dataList = this.buildExportList(gridSettings, records);
        var bufferedData = this.getBufferedData(dataList);
        var fileName = 'excelFile.xlsx';

        if(gridSettings.ExcelConfiguration && gridSettings.ExcelConfiguration.FileName)
        {
            fileName = gridSettings.ExcelConfiguration.FileName;
        }

        this.saveExcelFile(bufferedData, fileName);
    }

    buildExportList(gridSettings: any, records: Array<any>=[])
    {
        var dbColumnNames = [];//to get respective data from records
        var displayNames=[];
        var dataList: Array<any>=[];
        if(gridSettings.ColumnConfiguration) {
            gridSettings.ColumnConfiguration.forEach(p=>{
                if(p.isVisible)   {
                    displayNames.push(p.displayName);
                    dbColumnNames.push(p.dbColumnName);
                }
            });

            dataList.push(displayNames);

            records.forEach(x=>{
                let tempRecord =[];
                dbColumnNames.forEach(y=>{
                    tempRecord.push(x[y]);
                });
                dataList.push(tempRecord);
            });
        }
        else
        {
            //just export only records without header
            return records;
        }

        return dataList;
    }

    getBufferedData(data)
    {
        var ws_name = "Sheet1";

        /* require XLSX */
        //var fs = require('fs');
        var XLSX = require('ts-xlsx');

        /* set up workbook objects -- some of these will not be required in the future */
        var wb: any={};
        wb.Sheets = {};
        //wb.Props = {};
        //wb.SSF = {};
        wb.SheetNames = [];

        /* create worksheet: */
        var ws: any = {};

        /* the range object is used to keep track of the range of the sheet */
        var range = {s: {c:0, r:0}, e: {c:0, r:0 }};

        /* Iterate through each element in the structure */
        for(var R = 0; R != data.length; ++R) {
            if(range.e.r < R) range.e.r = R;
            for(var C = 0; C != data[R].length; ++C) {
                if(range.e.c < C) range.e.c = C;

                /* create cell object: .v is the actual data */
                var cell:any = { v: data[R][C] };
                if(cell.v == null) continue;

                /* create the correct cell reference */
                var cell_ref = XLSX.utils.encode_cell({c:C,r:R});

                /* determine the cell type */                    if(typeof cell.v === 'number') cell.t = 'n';
                else if(typeof cell.v === 'boolean') cell.t = 'b';
                else cell.t = 's';

                /* add to structure */
                ws[cell_ref] = cell;
            }
        }
        ws['!ref'] = XLSX.utils.encode_range(range);

        /* add worksheet to workbook */
        wb.SheetNames.push(ws_name);
        wb.Sheets[ws_name] = ws;

        var bufferdata = XLSX.write(wb, {bookType:'xlsx', bookSST:false, type: 'binary'});

        return bufferdata;
    }

    saveExcelFile(bufferdata, fileName) {
        saveAs(new Blob([this.s2ab(bufferdata)], {type: "application/octet-stream"}), fileName);
    }

    s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }
}