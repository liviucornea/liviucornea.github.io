/**
 * Created by vikhnv2 on 6/13/2016.
 */
import {Component, Input, OnChanges} from 'angular2/core';

@Component({
    selector: 'file-import',
    templateUrl: 'app/EMT/EtfCreationRedemption/controls/fileImport.html',
    styleUrls: ['app/EMT/EtfCreationRedemption/etfCreationRedemption.css']
})

export class FileImport{

    constructor(){

    }

    onFileChange(e){
        console.log(e);
    }
}