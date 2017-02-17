//import {FORM_DIRECTIVES} from "angular2/common";
import {Component, Output, EventEmitter} from "angular2/core";
import {Input} from "angular2/core";
import {InterFormsService} from "../../ReusableServices/interFormsService";
import {FormBuilder} from "../formBuilder/formBuilder";



@Component({
    templateUrl: "app/ReusableComponents/FormBuilderInlineChildren/FormBuilderInlineChildren.html",
    selector: 'formBuilderInlineChildren',
    directives: [FormBuilderInlineChildren,FormBuilder],
})

export class FormBuilderInlineChildren {

    @Output() formBuilderNotifier = new EventEmitter();
    @Input() title: string="Form";
    @Input() pluginInput: any;
    @Input() gridSettings: any;
    editViewRowDataTable: Array<any>;
    interFormService:InterFormsService;
    @Input('children') children: any;
    elementList: any;
    indentLevel: any;
    @Input('NodeClass') nodeClass: string;

    constructor(private intFormSer:InterFormsService) {
        this.interFormService=intFormSer;
    }

    ngOnInit() {
        this.elementList = [];
        if(this.children && this.children.elementList)
        {
            this.elementList=this.children.elementList;
        }
        else {
            this.editViewRowDataTable = this.pluginInput;
        }
        this.indentLevel = new Array(this.children.indent);
    }


}