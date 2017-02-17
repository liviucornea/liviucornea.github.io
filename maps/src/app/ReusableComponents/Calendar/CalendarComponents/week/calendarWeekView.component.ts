import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    OnChanges,
    OnInit,
    OnDestroy,
    LOCALE_ID,
    Inject
} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {calendarutils} from "../../../../Datahub/routes/home/calendarutils";
/*import {
 WeekDay,
 CalendarEvent,
 WeekViewEventRow,
 getWeekViewHeader,
 getWeekView
 } from 'calendar-utils';*/

@Component({
    selector: 'mwl-calendar-week-view',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: require("./calendarWeekView.html")
})

export class CalendarWeekViewComponent implements OnChanges, OnInit, OnDestroy {

    /**
     * The current view date
     */
    @Input() viewDate: Date;

    /**
     * An array of events to display on view
     */
    @Input() events: any = [];

    /**
     * An observable that when emitted on will re-render the current view
     */
    @Input() refresh: Subject<any>;

    /**
     * The locale used to format dates
     */
    @Input() locale: string;

    /**
     * The placement of the event tooltip
     */
    @Input() tooltipPlacement: string = 'bottom';

    /**
     * The start number of the week
     */
    @Input() weekStartsOn: number;

    /**
     * Called when a header week day is clicked
     */
    @Output() dayClicked: EventEmitter<{date: Date}> = new EventEmitter<{date: Date}>();

    /**
     * Called when the event title is clicked
     */
    @Output() eventClicked: EventEmitter<{event: any}> = new EventEmitter<{event: any}>();

    days: any;
    eventRows: any = [];
    refreshSubscription: Subscription;

    constructor(private cdr: ChangeDetectorRef, @Inject(LOCALE_ID) locale: string) {
        this.locale = locale;
    }

    ngOnInit(): void {
        if (this.refresh) {
            this.refreshSubscription = this.refresh.subscribe(() => {
                this.refreshAll();
                this.cdr.markForCheck();
            });
        }
    }

    ngOnChanges(changes: any): void {

        if (changes.viewDate) {
            this.refreshHeader();
        }

        if (changes.events || changes.viewDate) {
            this.refreshBody();
        }

    }

    ngOnDestroy(): void {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }

    private refreshHeader(): void {
        this.days = calendarutils.getWeekViewHeader({
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn
        });
    }

    private refreshBody(): void {
        this.eventRows = calendarutils.getWeekView({
            events: this.events,
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn
        });
    }

    private refreshAll(): void {
        this.refreshHeader();
        this.refreshBody();
    }

}
