import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {fns} from "../../../../Datahub/routes/home/fns";
import {
    ChangeDetectionStrategy,
    OnChanges,
    OnInit,
    OnDestroy,
    EventEmitter,
    ChangeDetectorRef,
    LOCALE_ID,
    Inject,
    Component,
    Input,
    Output
} from "@angular/core";
import {calendarutils} from "../../../../Datahub/routes/home/calendarutils";

@Component({
    selector: 'mwl-calendar-month-view',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: require("./calendarMonthView.html")
})

export class CalendarMonthViewComponent implements OnChanges, OnInit, OnDestroy {

    /**
     * The current view date
     */
    @Input() viewDate: Date;

    /**
     * An array of events to display on view
     */
    @Input() events: any = [];

    /**
     * Whether the events list for the day of the `viewDate` option is visible or not
     */
    @Input() activeDayIsOpen: boolean = false;

    /**
     * A function that will be called before each cell is rendered. The first argument will contain the calendar cell.
     * If you add the `cssClass` property to the cell it will add that class to the cell in the template
     */
    @Input() dayModifier: Function;

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
    @Input() tooltipPlacement: string = 'top';

    /**
     * The start number of the week
     */
    @Input() weekStartsOn: number;

    /**
     * Called when the day cell is clicked
     */
    @Output() dayClicked: EventEmitter<{day: any}> = new EventEmitter<{day: any}>();

    /**
     * Called when the event title is clicked
     */
    @Output() eventClicked: EventEmitter<{event: any}> = new EventEmitter<{event: any}>();

    columnHeaders: any;
    view: any;
    openRowIndex: number;
    openDay: any;
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

        if (changes.viewDate || changes.events) {
            this.refreshBody();
        }

        if (changes.activeDayIsOpen || changes.viewDate || changes.events) {
            this.checkActiveDayIsOpen();
        }

    }

    ngOnDestroy(): void {
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }

    private refreshHeader(): void {
        this.columnHeaders = calendarutils.getWeekViewHeader({
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn
        });
    }

    private refreshBody(): void {
        this.view = calendarutils.getMonthView({
            events: this.events,
            viewDate: this.viewDate,
            weekStartsOn: this.weekStartsOn
        });
        if (this.dayModifier) {
            this.view.days.forEach(day => this.dayModifier(day));
        }
    }

    private checkActiveDayIsOpen(): void {
        if (this.activeDayIsOpen === true) {
            this.openDay = this.view.days.find(day => fns.isSameDay(day.date, this.viewDate));
            const index: number = this.view.days.indexOf(this.openDay);
            this.openRowIndex = Math.floor(index / 7) * 7;
        } else {
            this.openRowIndex = null;
            this.openDay = null;
        }
    }

    private refreshAll(): void {
        this.refreshHeader();
        this.refreshBody();
        this.checkActiveDayIsOpen();
    }

    private toggleDayHighlight(event: any, isHighlighted: boolean): void {
        this.view.days.forEach(day => {
            if (isHighlighted && day.events.indexOf(event) > -1) {
                day.backgroundColor = event.color.secondary;
            } else {
                delete day.backgroundColor;
            }
        });
    }

}
