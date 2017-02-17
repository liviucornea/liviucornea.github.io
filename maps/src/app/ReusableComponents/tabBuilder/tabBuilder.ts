import { Component, Input, Output, EventEmitter} from '@angular/core';
import {InterFormsService} from "../../ReusableServices/interFormsService";

@Component({
    selector: 'tabBuilder',
    template: require('./tabBuilder.html'),
})

export class TabBuilder {
    @Input() tabsList: Array<any>;
    @Output() tabEmitter: EventEmitter<any> = new EventEmitter<any>();
    @Output() tabContentEmitter: EventEmitter<any> = new EventEmitter<any>();
    showTabHeaders: boolean = false;
    private selectedTab: any;
    pageControls: Array<any> = [];
    private tabs: Array<any> = [];
    @Input() messages: Array<any> = [];

    constructor(private intFormSvc: InterFormsService ) {
    }

    ngOnInit()
    {
        if(this.tabsList && this.tabsList.length)
        {
            if(this.tabsList.length > 1){
                this.showTabHeaders = true;
            }
            this.buildTabs();
            this.childClicked(this.tabs[0]);
        }
    }

    buildTabs()
    {
        if(this.tabsList && this.tabsList.length)
        {
            this.tabsList.forEach((x) => {
                this.tabs.push({
                    TabKey: x.TabKey,
                    TabName: x.TabName,
                    activeClassChild: "",
                    visible: false
                });
            });
        }
    }

    childClicked(tabData)
    {
        this.selectedTab = tabData;
        this.tabs.forEach((x)=>{
                x.activeClassChild = "";
                x.visible = false;
        });

        this.tabEmitter.emit({
            TabKey:  tabData.TabKey
        });
    }

    displayTabInfo(incomingTabInfo)
    {
        var tempTabData = this.tabs.find(p=>p.TabKey == incomingTabInfo.TabKey);
        tempTabData.activeClassChild = "active";
        tempTabData.visible = true;
        this.pageControls =[];
        this.messages = [];

        incomingTabInfo.TabControls.forEach(x=>{
            this.pageControls.push(x);
        });
        this.intFormSvc.stopSpinner();
    }

    updateDataFromComponents(outputValue,componentName)
    {
        //TODO: Balaji
        // this.intFormSvc.spinnerRunning = true;
         this.tabContentEmitter.emit({
             updatedValue :outputValue,
             ComponentName: componentName,
             TabKey: this.selectedTab.TabKey
         });
    }

    LoadSpecificTabsByUpdate(incomingTabsList: Array<any>) {

        if (this.pageControls && this.pageControls.length)
        {
            incomingTabsList.forEach(x=>
            {
                var index = this.pageControls.findIndex(p=>p.ComponentName == x.ComponentName);
                if(index >=0) {
                    this.pageControls[index] = x;
                }
            });
        }
        this.intFormSvc.stopSpinner();
    }
}