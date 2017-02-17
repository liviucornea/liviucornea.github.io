/**
 * Created by vikhnv2 on 5/27/2016.
 */
import {Component, Input, OnChanges} from 'angular2/core';
import {FileImport} from '../controls/fileImport';

@Component({
    selector: 'nscc-basket',
    templateUrl: 'app/EMT/EtfCreationRedemption/nsccBasket/nsccBasket.html',
    styleUrls: ['app/EMT/EtfCreationRedemption/etfCreationRedemption.css'],
    directives: [FileImport]
})

export class NsccBasket implements OnChanges {

    //@ViewChild(DisplayGridComponent)
    @Input() basketDate:string;

    private status:string = "Not Loaded";
    private statusColour:string = "danger";
    private exists:boolean = false;

    ngOnChanges(changes) {
        if (changes['basketDate']) {
            this.exists = (Date.parse(this.basketDate) > 0);
            this.status = this.exists ? "Loaded" : "Not Loaded";
            this.statusColour = this.exists ? "success" : "danger";
        }
    }

    /*constructor() {
     }

     ngAfterViewInit() {
     //this.renderDataTable();
     }*/

    /*renderDataTable(){
     //TODO
     //this.dataTable.GetParentPageDetails(this.controlConfig, this.schedulesApi, "holiday");
     }*/
}



