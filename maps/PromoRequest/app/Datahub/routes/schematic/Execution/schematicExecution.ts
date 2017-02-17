import {Component,OnInit} from "angular2/core";
import {ViewChild} from "angular2/core";
import {SchematicApiService} from '../schematicService';
import {SchematicPreview} from "../schematicpreview/schematicpreview";
import {signalr} from "../../../services/signalr";
import {TypeAhead} from "../../../../ReusableComponents/typeahead/typeahead";

@Component({
    templateUrl: 'app/Datahub/routes/schematic/execution/schematicExecution.html',
    styleUrls: ['resources/Datahub/assets/default.css',],
    directives: [SchematicPreview, TypeAhead],
    providers:[SchematicApiService,signalr]
})
export class SchematicExecution implements OnInit{
    selectedSchematic: any;
    schematicId: number;
    allSchematics: Array<any>;
    allSchematicsVM: Array<any>;
    autocompleteInput: any;

    processApi:SchematicApiService;
    @ViewChild(SchematicPreview)
    private schematicPreview: SchematicPreview;
    public ItemName = "";

    constructor(private processService: SchematicApiService) {
        this.processApi=processService;
    }

    ngOnInit() {
        this.getallSchematics();
        this.autocompleteInput = new Object();
        this.autocompleteInput.searchSchematics = this.searchSchematics();
    }
    getallSchematics() {
        let subscription =  this.processApi.getallSchematics().subscribe(
            res => {
                this.allSchematics = res;
                this.allSchematicsVM = this.buildSchematicsVM();
                subscription.unsubscribe();
            }
            , error => { },
            () => { }
        );
    }
/// this method provide seeds input for typeahead component
// and it will be passed via autocompleteInput object
    searchSchematics(){
        return (filter: string): Promise<Array<{ id: string, text: string }>> => {
            return new Promise<Array<{ id: string, text: string }>>((resolve, reject) => {
                let subscription = this.processApi.getallSchematics().subscribe(
                    res => {    this.allSchematics = res;
                        let outputList = new Array<any>();
                        this.allSchematics.forEach(function (x) {
                            if (x.LookupKey.toUpperCase().indexOf(filter.toUpperCase()) > -1 || x.SchematicId == filter || filter.trim() === ''  )
                                outputList.push({
                                    'id': x.SchematicId,
                                    'text': x.LookupKey,
                                })
                        });
                        resolve(outputList);
                        subscription.unsubscribe();

                    },
                    err => console.log("Error in search schematics", err)
                );
            });
        };
    }

    buildSchematicsVM() {
        var newVM = new Array<any>();
        this.allSchematics.forEach(function (x) {
            newVM.push({
                schematicId: x.SchematicId,
                description: x.LookupKey
            })
        });
        return newVM;
    }

    SchematicSelected(schematicID: string) {
        this.schematicId = parseInt(schematicID);
        this.populateSchematicPreviewPage();
    }

    populateSchematicPreviewPage() {
        this.schematicPreview.populateWithSchematicDetails(this.schematicId, true);
    }


    public onSchematicSelected(schematic: { id:string, text: string }) {
        this.SchematicSelected(schematic.id);
    }


}
