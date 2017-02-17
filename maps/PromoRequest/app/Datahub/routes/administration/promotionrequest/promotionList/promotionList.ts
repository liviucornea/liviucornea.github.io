import {Component, OnInit, Input, AfterContentChecked} from 'angular2/core';
import {PromotionActiveItemList, promoStatuses, promoStatusesListAll, QAPromoEntry, cboItems,
    Promoter, UserPromoProfile, PromotionGeneralItem} from '../promotionrequestObjects'
import {QaMessage} from '../qaMessage/qaMessage'
import {ApiService} from "../../../../../ReusableServices/apiService";
import {AlertService} from "../../../../../ReusableServices/alertService";
import {PromotionRequestListService} from './promotionListService';
import {PromoListPipe} from './promoListPipe';
import {RadioControlValueAccessor} from "../../../../../ReusableComponents/inputControls/radio_value_accessor";
import {TypeAhead} from "../../../../../ReusableComponents/typeahead/typeahead";

@Component({
    selector: 'promotionList',
    templateUrl: 'app/Datahub/routes/administration/promotionrequest/promotionList/promotionList.html',
    pipes: [PromoListPipe],
    directives: [QaMessage, RadioControlValueAccessor, TypeAhead],
    styleUrls: ["../../../../../resources/Datahub/routes/administration/promotionrequest/promotionrequest.css"]
})

export class PromotionList implements OnInit, AfterContentChecked{
    @Input('promosActiveList') promosActiveList:Array<PromotionActiveItemList> ;
    @Input('user') user:UserPromoProfile;
    @Input('qaEntry') qaEntry: QAPromoEntry;
    @Input('promotersList') promotersList: Array<Promoter>;
    @Input('implementersList') implementersList: Array<Promoter>;
   // @Input('allPromosList') allPromosList: PromotionGeneralItem[];
   // @Input('statusFilter') statusFilter :string;
    showModal:boolean = false;
    searchTab:boolean = false;
    promoStatuses:Array<string> = promoStatuses;
    promoStatusesAll:Array<string> = promoStatusesListAll;
    cboItemsSelection = cboItems;
    promoSearchID: string;
    promoSearchResultList: Array<PromotionActiveItemList> = [];
    showPromoRef: boolean = false;
    dateType:number;
    fromDate:string;
    toDate:string;
    implementationType:string;
    keyWord: string;
    implementerId:string;
    promoterId:string;
    showQaMessage: boolean = false;
    statusFilter :string;
    workflowIDs: string;
    processesIds: string;
    autocompleteInput: any;
    allPromosList: PromotionGeneralItem[] ;

    constructor(private api:ApiService, private alert:AlertService, public listService:PromotionRequestListService) {

    }

    ngOnInit() {
        var self = this;
        self.defaultSearchParam();
        self.allPromosList = self.listService.allPromosList;
        self.autocompleteInput = new Object();
        self.autocompleteInput.searchAllPromos = self.listService.searchAllPromos();
    }
    ngAfterContentChecked () {
        var self= this;
        if (self.promosActiveList.length > 0 && !self.statusFilter)
           self.statusFilter = "-1" ; // promoStatuses[2]; // default filter to Submitted

    }
    defaultSearchParam(){
        var self = this;
        self.promoSearchID = null;
        self.implementationType = "-1";
        self.promoterId = "0";
        self.implementerId  = "0";
        self.dateType  = -1;
        self.fromDate = new Date().toJSON().slice(0,10);
        self.toDate = new Date().toJSON().slice(0,10);
        self.keyWord = "";
        self.workflowIDs = '';
        self.processesIds = '';
    }
    sendPromoOut(item:PromotionActiveItemList) {
        this.listService.outputValue$.emit(item);
    }
    createNewPromo(){
        this.listService.askToCreatePromo$.emit(0);
    }

    typeAheadSelected(item: any) {
        this.promoSearchID = item.id;
        this.doSearch();
        let promoOut = new PromotionActiveItemList(item.id)
        this.listService.outputValue$.emit(promoOut);
    }

    doSearch()
    {
        var self = this;
        self.promoSearchResultList = [];
        if(self.promoSearchID) {
//promotionsearchbyid?promotionid={promotionid:int}&showrefpromotion={showrefpromotion:bool}&reportdetail={reportdetail:bool}
            this.api.getPromoSearchByPromoId(self.promoSearchID, self.showPromoRef , false)
                .subscribe(res => {
                        // get promo searching by id
                        for (let i = 0, j = res.DataSet.Table.length; i < j; i++) {
                            let searchListItem = new PromotionActiveItemList(res.DataSet.Table[i].ID);
                            searchListItem.description = res.DataSet.Table[i]['Name'];
                            self.promoSearchResultList.push(searchListItem );
                        };
                    self.promoSearchID = undefined;
                    },
                    error => {
                        console.log(`error: ${error}`);
                    });

        }else {

            var searchPromosObj = {"DateType": self.dateType,
                "ImplementationType":self.implementationType,
                "Statu":"-1",
                "ImplementerID":self.implementerId ? self.implementerId : 0,
                "PromoterID": self.promoterId ? self.promoterId : 0 ,
                "ActiveOnly":"1",
                "InProduction":"0",
                "ReportDetail":"0",
                "From": self.fromDate ? self.fromDate : "",
                "To":self.toDate ? self.toDate : "",
                "KeyWord": self.keyWord

            };
            // getPromoSearch
            if(self.workflowIDs)
                var workflowIDS = self.workflowIDs.split(",");
            if (self.processesIds)
                var processesIDS = self.processesIds.split(",");
            this.api.getPromoSearch(searchPromosObj)
                .subscribe(res => {
                        // get promo searching by id
                        for (let i = 0, j = res.DataSet.Table.length; i < j; i++) {
                            let getIt = true;
                            var workflowStr = res.DataSet.Table[i]['Workflow ID'];
                            if(self.workflowIDs && workflowIDS.find( x => workflowStr.indexOf(x) == -1)) getIt = false;
                            var processStr = res.DataSet.Table[i]['Process ID'];
                            if(self.processesIds && processesIDS.find( x => processStr.indexOf(x) == -1)) getIt = false;
                            if(getIt) {
                                let searchListItem = new PromotionActiveItemList(res.DataSet.Table[i].ID);
                                searchListItem.description = res.DataSet.Table[i]['Project Name'] ? res.DataSet.Table[i]['Project Name']: res.DataSet.Table[i]['Name'] ;
                                self.promoSearchResultList.push(searchListItem);
                            }
                        };
                    },
                    error => {
                        console.log(`error: ${error}`);
                    });

           // alert(JSON.stringify(searchPromosObj));
        }
    }
    doQaMessage(){
        var self = this;
        self.showQaMessage = true;
        let subscription = this.listService.qaMessage.subscribe(
            item => {
                self.showQaMessage  = false;
                subscription.unsubscribe();
            }
        );
    }

}


