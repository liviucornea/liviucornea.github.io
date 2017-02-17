import { Component} from '@angular/core';
import {AlertService} from "../../../../ReusableServices/alertService";
import {ActivatedRoute, Params} from "@angular/router";
import {AdminApiService} from "../adminApiService";

@Component({
    selector: 'auth',
    template: `<treeViewBuilder *ngIf="showTreeViewdata" [jsonConfig]="jsonSchemaConfig" [treeViewApiUrl]="apiUrl" ></treeViewBuilder>`,
})

export class ApplicationTreeView {

    private jsonSchemaConfig;
    private apiUrl: string= '';
    private showTreeViewdata: boolean = false;

    constructor(private alertService: AlertService, private activatedRoute: ActivatedRoute, private adminApiService:AdminApiService) {
    }

    ngOnInit()
    {
        var self=this;
        var treeName = '';
        var id;

        self.activatedRoute.params.forEach((params:Params) => {
            treeName = params['modelName'];
            id=params['id'];
            self.apiUrl = '/treemodel/' + treeName + '/' + id;
            self.populateApplicationTreeViewdata(treeName);
        });
    }

    populateApplicationTreeViewdata(treeName)
    {
        this.adminApiService.getTreeModeMetadataByRootName(treeName).subscribe(
            res => {
                this.jsonSchemaConfig = JSON.parse(res.MetadataJSON);
                this.showTreeViewdata = true;
            },
            error=> { this.alertService.error("Error in retrieving json schema: async error #" + error.status);
            },
            ()=>  {}
        );
    }
}