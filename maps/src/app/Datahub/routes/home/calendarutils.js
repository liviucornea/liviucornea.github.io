"use strict";
var fns_1 = require("./fns");
var calendarService_1 = require("../../../ReusableServices/calendarService");
var calendarutils = (function () {
    function calendarutils() {
    }
    calendarutils.getWeekViewEventSpan = function (event, offset, startOfWeek) {
        var span = 1;
        if (event.end) {
            var begin = event.start < startOfWeek ? startOfWeek : event.start;
            span = fns_1.fns.differenceInDays(fns_1.fns.addMinutes(fns_1.fns.endOfDay(event.end), 1), fns_1.fns.startOfDay(begin));
            if (span > calendarutils.DAYS_IN_WEEK) {
                span = calendarutils.DAYS_IN_WEEK;
            }
        }
        var totalLength = offset + span;
        if (totalLength > calendarutils.DAYS_IN_WEEK) {
            span -= (totalLength - calendarutils.DAYS_IN_WEEK);
        }
        return span;
    };
    calendarutils.getWeekViewEventOffset = function (event, startOfWeek) {
        var offset = 0;
        if (fns_1.fns.startOfDay(event.start) > startOfWeek) {
            offset = fns_1.fns.differenceInDays(fns_1.fns.startOfDay(event.start), startOfWeek);
        }
        return offset;
    };
    calendarutils.isEventIsPeriod = function (_a) {
        var event = _a.event, periodStart = _a.periodStart, periodEnd = _a.periodEnd;
        var eventStart = event.start;
        var eventEnd = event.end || event.start;
        if (eventStart > periodStart && eventStart < periodEnd) {
            return true;
        }
        if (eventEnd > periodStart && eventEnd < periodEnd) {
            return true;
        }
        if (eventStart < periodStart && eventEnd > periodEnd) {
            return true;
        }
        if (fns_1.fns.isSameSecond(eventStart, periodStart) || fns_1.fns.isSameSecond(eventStart, periodEnd)) {
            return true;
        }
        if (fns_1.fns.isSameSecond(eventEnd, periodStart) || fns_1.fns.isSameSecond(eventEnd, periodEnd)) {
            return true;
        }
        return false;
    };
    calendarutils.getEventsInPeriod = function (_a) {
        var events = _a.events, periodStart = _a.periodStart, periodEnd = _a.periodEnd;
        if (events) {
            return events.filter(function (event) {
                return calendarutils.isEventIsPeriod({ event: event, periodStart: periodStart, periodEnd: periodEnd });
            });
        }
        else {
            return [];
        }
    };
    calendarutils.getWeekDay = function (_a) {
        var date = _a.date;
        var today = fns_1.fns.startOfDay(new Date());
        return {
            date: date,
            isPast: date < today,
            isToday: fns_1.fns.isSameDay(date, today),
            isFuture: date > today,
            isWeekend: calendarutils.WEEKEND_DAY_NUMBERS.indexOf(fns_1.fns.getDay(date)) > -1
        };
    };
    calendarutils.getWeekViewHeader = function (_a) {
        var viewDate = _a.viewDate, weekStartsOn = _a.weekStartsOn;
        var start = fns_1.fns.startOfWeek(viewDate, { weekStartsOn: weekStartsOn });
        var days = [];
        for (var i = 0; i < calendarutils.DAYS_IN_WEEK; i++) {
            var date = fns_1.fns.addDays(start, i);
            days.push(calendarutils.getWeekDay({ date: date }));
        }
        return days;
    };
    calendarutils.getWeekView = function (_a) {
        var events = _a.events, viewDate = _a.viewDate, weekStartsOn = _a.weekStartsOn;
        var startOfViewWeek = fns_1.fns.startOfWeek(viewDate, { weekStartsOn: weekStartsOn });
        var endOfViewWeek = fns_1.fns.endOfWeek(viewDate, { weekStartsOn: weekStartsOn });
        var eventsMapped = calendarutils.getEventsInPeriod({ events: events, periodStart: startOfViewWeek, periodEnd: endOfViewWeek }).map(function (event) {
            var offset = calendarutils.getWeekViewEventOffset(event, startOfViewWeek);
            var span = calendarutils.getWeekViewEventSpan(event, offset, startOfViewWeek);
            return {
                event: event,
                offset: offset,
                span: span,
                startsBeforeWeek: event.start < startOfViewWeek,
                endsAfterWeek: (event.end || event.start) > endOfViewWeek
            };
        }).sort(function (itemA, itemB) {
            var startSecondsDiff = fns_1.fns.differenceInSeconds(itemA.event.start, itemB.event.start);
            if (startSecondsDiff === 0) {
                return fns_1.fns.differenceInSeconds(itemB.event.end || itemB.event.start, itemA.event.end || itemA.event.start);
            }
            return startSecondsDiff;
        });
        var eventRows = [];
        var allocatedEvents = [];
        eventsMapped.forEach(function (event, index) {
            if (allocatedEvents.indexOf(event) === -1) {
                allocatedEvents.push(event);
                var rowSpan_1 = event.span + event.offset;
                var otherRowEvents = eventsMapped.slice(index + 1).filter(function (nextEvent) {
                    if (nextEvent.offset >= rowSpan_1 &&
                        rowSpan_1 + nextEvent.span <= calendarutils.DAYS_IN_WEEK &&
                        allocatedEvents.indexOf(nextEvent) === -1) {
                        nextEvent.offset -= rowSpan_1;
                        rowSpan_1 += nextEvent.span + nextEvent.offset;
                        allocatedEvents.push(nextEvent);
                        return true;
                    }
                });
                eventRows.push({
                    row: [
                        event
                    ].concat(otherRowEvents)
                });
            }
        });
        return eventRows;
    };
    calendarutils.getMonthView = function (_a) {
        var type = calendarutils.eventType;
        if (calendarService_1.CalendarService.calEvents[type]) {
            var events = calendarService_1.CalendarService.calEvents[type], viewDate = _a.viewDate, weekStartsOn = _a.weekStartsOn;
        }
        else {
            var events = _a.events, viewDate = _a.viewDate, weekStartsOn = _a.weekStartsOn;
        }
        var originalDate = viewDate;
        var start;
        var end;
        switch (calendarService_1.CalendarService.selectedSalendarMode) {
            case calendarService_1.calendarMode.fourWeeks:
                start = fns_1.fns.startOfWeek(fns_1.fns.removeWeeks(originalDate, 2), { weekStartsOn: weekStartsOn });
                end = fns_1.fns.endOfWeek(fns_1.fns.addWeeks(originalDate, 2), { weekStartsOn: weekStartsOn });
                break;
            case calendarService_1.calendarMode.standard:
                start = fns_1.fns.startOfWeek(fns_1.fns.startOfMonth(viewDate), { weekStartsOn: weekStartsOn });
                end = fns_1.fns.endOfWeek(fns_1.fns.endOfMonth(viewDate), { weekStartsOn: weekStartsOn });
                break;
        }
        var eventsInMonth = calendarutils.getEventsInPeriod({
            events: events,
            periodStart: start,
            periodEnd: end
        });
        var days = [];
        for (var i = 0; i < fns_1.fns.differenceInDays(end, start) + 1; i++) {
            var date = fns_1.fns.addDays(start, i);
            var day = calendarutils.getWeekDay({ date: date });
            var events_1 = calendarutils.getEventsInPeriod({
                events: eventsInMonth,
                periodStart: fns_1.fns.startOfDay(date),
                periodEnd: fns_1.fns.endOfDay(date)
            });
            day.inMonth = fns_1.fns.isSameMonth(date, viewDate);
            day.events = events_1;
            day.badgeTotal = events_1.length;
            days.push(day);
        }
        var rows = Math.floor(days.length / 7);
        var rowOffsets = [];
        for (var i = 0; i < rows; i++) {
            rowOffsets.push(i * 7);
        }
        return {
            rowOffsets: rowOffsets,
            days: days
        };
    };
    calendarutils.getDayView = function (_a) {
        var events = _a.events, viewDate = _a.viewDate, hourSegments = _a.hourSegments, dayStart = _a.dayStart, dayEnd = _a.dayEnd, eventWidth = _a.eventWidth, segmentHeight = _a.segmentHeight;
        var startOfView = fns_1.fns.setMinutes(fns_1.fns.setHours(fns_1.fns.startOfDay(viewDate), dayStart.hour), dayStart.minute);
        var endOfView = fns_1.fns.setMinutes(fns_1.fns.setHours(fns_1.fns.startOfMinute(fns_1.fns.endOfDay(viewDate)), dayEnd.hour), dayEnd.minute);
        var previousDayEvents = [];
        var dayViewEvents = calendarutils.getEventsInPeriod({
            events: events.filter(function (event) { return !event.allDay; }),
            periodStart: startOfView,
            periodEnd: endOfView
        }).sort(function (eventA, eventB) {
            return eventA.start.valueOf() - eventB.start.valueOf();
        }).map(function (event) {
            var eventStart = event.start;
            var eventEnd = event.end || eventStart;
            var startsBeforeDay = eventStart < startOfView;
            var endsAfterDay = eventEnd > endOfView;
            var hourHeightModifier = (hourSegments * segmentHeight) / calendarutils.MINUTES_IN_HOUR;
            var top = 0;
            if (eventStart > startOfView) {
                top += fns_1.fns.differenceInMinutes(eventStart, startOfView);
            }
            top *= hourHeightModifier;
            var startDate = startsBeforeDay ? startOfView : eventStart;
            var endDate = endsAfterDay ? endOfView : eventEnd;
            var height = fns_1.fns.differenceInMinutes(endDate, startDate);
            if (!event.end) {
                height = segmentHeight;
            }
            else {
                height *= hourHeightModifier;
            }
            var bottom = top + height;
            var overlappingPreviousEvents = previousDayEvents.filter(function (previousEvent) {
                var previousEventTop = previousEvent.top;
                var previousEventBottom = previousEvent.top + previousEvent.height;
                if (top < previousEventBottom && previousEventBottom < bottom) {
                    return true;
                }
                else if (previousEventTop <= top && bottom <= previousEventBottom) {
                    return true;
                }
                return false;
            });
            var dayEvent = {
                event: event,
                height: height,
                width: eventWidth,
                top: top,
                left: overlappingPreviousEvents.length * eventWidth,
                startsBeforeDay: startsBeforeDay,
                endsAfterDay: endsAfterDay
            };
            if (height > 0) {
                previousDayEvents.push(dayEvent);
            }
            return dayEvent;
        }).filter(function (dayEvent) { return dayEvent.height > 0; });
        var width = Math.max.apply(Math, dayViewEvents.map(function (event) { return event.left + event.width; }));
        var allDayEvents = calendarutils.getEventsInPeriod({
            events: events.filter(function (event) { return event.allDay; }),
            periodStart: startOfView,
            periodEnd: endOfView
        });
        return {
            events: dayViewEvents,
            width: width,
            allDayEvents: allDayEvents
        };
    };
    calendarutils.getDayViewHourGrid = function (_a) {
        var viewDate = _a.viewDate, hourSegments = _a.hourSegments, dayStart = _a.dayStart, dayEnd = _a.dayEnd;
        var hours = [];
        var startOfView = fns_1.fns.setMinutes(fns_1.fns.setHours(fns_1.fns.startOfDay(viewDate), dayStart.hour), dayStart.minute);
        var endOfView = fns_1.fns.setMinutes(fns_1.fns.setHours(fns_1.fns.startOfMinute(fns_1.fns.endOfDay(viewDate)), dayEnd.hour), dayEnd.minute);
        var segmentDuration = calendarutils.MINUTES_IN_HOUR / hourSegments;
        var startOfViewDay = fns_1.fns.startOfDay(viewDate);
        for (var i = 0; i < calendarutils.HOURS_IN_DAY; i++) {
            var segments = [];
            for (var j = 0; j < hourSegments; j++) {
                var date = fns_1.fns.addMinutes(fns_1.fns.addHours(startOfViewDay, i), j * segmentDuration);
                if (date >= startOfView && date < endOfView) {
                    segments.push({
                        date: date,
                        isStart: j === 0
                    });
                }
            }
            if (segments.length > 0) {
                hours.push({ segments: segments });
            }
        }
        return hours;
    };
    calendarutils.WEEKEND_DAY_NUMBERS = [0, 6];
    calendarutils.DAYS_IN_WEEK = 7;
    calendarutils.HOURS_IN_DAY = 24;
    calendarutils.MINUTES_IN_HOUR = 60;
    calendarutils.eventType = "Äll";
    return calendarutils;
}());
exports.calendarutils = calendarutils;
//# sourceMappingURL=calendarutils.js.map