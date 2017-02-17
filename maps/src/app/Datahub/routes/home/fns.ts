export class fns {

    static MILLISECONDS_IN_HOUR = 3600000;
    static MILLISECONDS_IN_MINUTE = 60000;
    static MILLISECONDS_IN_DAY = 86400000;
    static MILLISECONDS_IN_WEEK = 604800000;
    static parseTokenDateTimeDelimeter = /[T ];/
    static parseTokenPlainTime = /:/;

    static parseTokenYYYY = /^(\d{4})-?/;
    static parseTokenYYYYY = /^([+-]\d{4,6})-/;
    static parseTokenMM = /^-(\d{2})$/;
    static parseTokenDDD = /^-?(\d{3})$/;
    static parseTokenMMDD = /^-?(\d{2})-?(\d{2})$/;
    static parseTokenWww = /^-?W(\d{2})$/;
    static parseTokenWwwD = /^-?W(\d{2})-?(\d{1})$/;

    static parseTokenHH = /^(\d{2}([.,]\d*)?)$/;
    static parseTokenHHMM = /^(\d{2}):?(\d{2}([.,]\d*)?)$/;
    static parseTokenHHMMSS = /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/;


    static parseTokenTimezone = /([Z+-].*)$/;
    static parseTokenTimezoneZ = /^(Z)$/;
    static parseTokenTimezoneHH = /^([+-])(\d{2})$/;
    static parseTokenTimezoneHHMM = /^([+-])(\d{2}):?(\d{2})$/;
    static currentDate:Date;

    public static setCurrentDate(date:Date){
     fns.currentDate=date;
    }

    public static getCurrentDate():Date{
        return fns.currentDate;
    }


    public static addDays(dirtyDate, amount) {
        var date = fns.parse(dirtyDate)
        date.setDate(date.getDate() + amount)
        return date
    }

    public static removeDays(dirtyDate, amount) {
        var date = fns.parse(dirtyDate)
        date.setDate(date.getDate() - amount)
        return date
    }

    public static isDate(argument) {
        return argument instanceof Date
    }

    static parse(dateString) {
        if (this.isDate(dateString)) {
            // Prevent the date to lose the milliseconds when passed to new Date() in IE10
            return new Date(dateString.getTime())
        } else if (typeof dateString !== 'string') {
            return new Date(dateString)
        }

        var dateStrings: any = fns.splitDateString(dateString)

        var date = fns.parseDate(dateStrings.date)

        if (date) {
            var timestamp = date.getTime()
            var time = 0
            var offset

            if (dateStrings.time) {
                time = fns.parseTime(dateStrings.time)
            }

            if (dateStrings.timezone) {
                offset = fns.parseTimezone(dateStrings.timezone)
            } else {
                // get offset accurate to hour in timezones that change offset
                offset = new Date(timestamp + time).getTimezoneOffset()
                offset = new Date(timestamp + time + offset * fns.MILLISECONDS_IN_MINUTE).getTimezoneOffset()
            }

            return new Date(timestamp + time + offset * fns.MILLISECONDS_IN_MINUTE)
        } else {
            return new Date(dateString)
        }
    }

    static splitDateString(dateString) {
        var dateStrings: any = {}
        var array = dateString.split(fns.parseTokenDateTimeDelimeter)
        var timeString

        if (fns.parseTokenPlainTime.test(array[0])) {
            dateStrings.date = null
            timeString = array[0]
        } else {
            dateStrings.date = array[0]
            timeString = array[1]
        }

        if (timeString) {
            var token = fns.parseTokenTimezone.exec(timeString)
            if (token) {
                dateStrings.time = timeString.replace(token[1], '')
                dateStrings.timezone = token[1]
            } else {
                dateStrings.time = timeString
            }
        }

        return dateStrings
    }

    static parseDate(dateString) {
        var year
        var yearToken

        // YYYY or ±YYYYY
        yearToken = fns.parseTokenYYYY.exec(dateString) ||
            fns.parseTokenYYYYY.exec(dateString)
        if (yearToken) {
            var yearString = yearToken[1]
            year = parseInt(yearString, 10)
            dateString = dateString.slice(yearString.length)

            // Invalid ISO-formatted year
        } else {
            return null
        }

        var token
        var date
        var month
        var week

        // YYYY
        if (dateString.length === 0) {
            date = new Date(0)
            date.setUTCFullYear(year)
            return date
        }

        // YYYY-MM
        token = fns.parseTokenMM.exec(dateString)
        if (token) {
            date = new Date(0)
            month = parseInt(token[1], 10) - 1
            date.setUTCFullYear(year, month)
            return date
        }

        // YYYY-DDD or YYYYDDD
        token = fns.parseTokenDDD.exec(dateString)
        if (token) {
            date = new Date(0)
            var dayOfYear = parseInt(token[1], 10)
            date.setUTCFullYear(year, 0, dayOfYear)
            return date
        }

        // YYYY-MM-DD or YYYYMMDD
        token = fns.parseTokenMMDD.exec(dateString)
        if (token) {
            let date = new Date(0);
            month = parseInt(token[1], 10) - 1;
            var day = parseInt(token[2], 10);
            date.setUTCFullYear(year, month, day);
            return date;
        }

        // YYYY-Www or YYYYWww
        token = fns.parseTokenWww.exec(dateString)
        if (token) {
            let week = parseInt(token[1], 10) - 1;
            return fns.dayOfISOYear(year, week, null);
        }

        // YYYY-Www-D or YYYYWwwD
        token = fns.parseTokenWwwD.exec(dateString)
        if (token) {
            week = parseInt(token[1], 10) - 1
            var dayOfWeek = parseInt(token[2], 10) - 1
            return fns.dayOfISOYear(year, week, dayOfWeek)
        }

        // Invalid ISO-formatted date
        return null
    }

    static parseTime(timeString) {
        var token
        var hours
        var minutes

        // hh
        token = fns.parseTokenHH.exec(timeString)
        if (token) {
            hours = parseFloat(token[1].replace(',', '.'));
            return (hours % 24) * fns.MILLISECONDS_IN_HOUR;
        }

        // hh:mm or hhmm
        token = fns.parseTokenHHMM.exec(timeString)
        if (token) {
            hours = parseInt(token[1], 10)
            minutes = parseFloat(token[2].replace(',', '.'))
            return (hours % 24) * fns.MILLISECONDS_IN_HOUR +
                minutes * fns.MILLISECONDS_IN_MINUTE
        }

        // hh:mm:ss or hhmmss
        token = fns.parseTokenHHMMSS.exec(timeString)
        if (token) {
            hours = parseInt(token[1], 10)
            minutes = parseInt(token[2], 10)
            var seconds = parseFloat(token[3].replace(',', '.'))
            return (hours % 24) * fns.MILLISECONDS_IN_HOUR +
                minutes * fns.MILLISECONDS_IN_MINUTE +
                seconds * 1000
        }

        // Invalid ISO-formatted time
        return null
    }

    static parseTimezone(timezoneString) {
        var token
        var absoluteOffset

        // Z
        token = fns.parseTokenTimezoneZ.exec(timezoneString)
        if (token) {
            return 0
        }

        // ±hh
        token = fns.parseTokenTimezoneHH.exec(timezoneString)
        if (token) {
            absoluteOffset = parseInt(token[2], 10) * 60
            return (token[1] === '+') ? -absoluteOffset : absoluteOffset
        }

        // ±hh:mm or ±hhmm
        token = fns.parseTokenTimezoneHHMM.exec(timezoneString)
        if (token) {
            absoluteOffset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10)
            return (token[1] === '+') ? -absoluteOffset : absoluteOffset
        }

        return 0
    }

    static dayOfISOYear(isoYear, week, day) {
        week = week || 0
        day = day || 0
        var date = new Date(0)
        date.setUTCFullYear(isoYear, 0, 4)
        var diff = week * 7 + day + 1 - date.getUTCDay()
        date.setUTCDate(date.getUTCDate() + diff)
        return date
    }

    public static  getISOWeek(dirtyDate) {
        var date = fns.parse(dirtyDate)
        var diff = fns.startOfISOWeek(date).getTime() - fns.startOfISOYear(date).getTime()

        // Round the number of days to the nearest integer
        // because the number of milliseconds in a week is not constant
        // (e.g. it's different in the week of the daylight saving time clock shift)
        return Math.round(diff / fns.MILLISECONDS_IN_WEEK) + 1
    }

    public static isSameDay(dirtyDateLeft, dirtyDateRight) {
        var dateLeftStartOfDay = fns.startOfDay(dirtyDateLeft)
        var dateRightStartOfDay = fns.startOfDay(dirtyDateRight)
        return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime()
    }

    public static getISOWeeksInYear(dirtyDate) {
        var thisYear = fns.startOfISOYear(dirtyDate)
        var nextYear = fns.startOfISOYear(fns.addWeeks(thisYear, 60))
        var diff = nextYear.valueOf() - thisYear.valueOf()
        // Round the number of weeks to the nearest integer
        // because the number of milliseconds in a week is not constant
        // (e.g. it's different in the week of the daylight saving time clock shift)
        return Math.round(diff / fns.MILLISECONDS_IN_WEEK)
    }

    public static startOfISOYear(dirtyDate) {
        var year = fns.getISOYear(dirtyDate)
        var date = fns.startOfISOWeek(new Date(year, 0, 4))
        return date
    }

    public static getISOYear(dirtyDate) {
        var date = fns.parse(dirtyDate)
        var year = date.getFullYear()
        var startOfNextYear = fns.startOfISOWeek(new Date(year + 1, 0, 4))
        var startOfThisYear = fns.startOfISOWeek(new Date(year, 0, 4))

        if (date.getTime() >= startOfNextYear.getTime()) {
            return year + 1
        } else if (date.getTime() >= startOfThisYear.getTime()) {
            return year
        } else {
            return year - 1
        }
    }

    public static startOfISOWeek(dirtyDate) {
        return fns.startOfWeek(dirtyDate, {weekStartsOn: 1})
    }


    public static startOfWeek(dirtyDate, options) {
        var weekStartsOn = options ? (options.weekStartsOn || 0) : 0

        var date = fns.parse(dirtyDate)
        var day = date.getDay()
        var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn

        date.setDate(date.getDate() - diff)
        date.setHours(0, 0, 0, 0)
        return date
    }

    public static startOfDay(dirtyDate) {
        let date = fns.parse(dirtyDate)
        date.setHours(0, 0, 0, 0);
        return date;
    }

    public static addWeeks(dirtyDate, amount) {
        var days = amount * 7
        return fns.addDays(dirtyDate, days)
    }

    public static removeWeeks(dirtyDate, amount) {
        var days = amount * 7
        return fns.removeDays(dirtyDate, days)
    }

    static addMonths (dirtyDate, amount) {
        var date = fns.parse(dirtyDate)
        var desiredMonth = date.getMonth() + amount
        var daysInMonth = fns.getDaysInMonth(new Date(date.getFullYear(), desiredMonth, 1))
        // Set the last day of the new month
        // if the original date was the last day of the longer month
        date.setMonth(desiredMonth, Math.min(daysInMonth, date.getDate()))
        return date
    }

    static getDaysInMonth (dirtyDate) {
        var date = fns.parse(dirtyDate)
        var year = date.getFullYear()
        var monthIndex = date.getMonth()
        return new Date(year, monthIndex + 1, 0).getDate()
    }

    public static setMinutes(dirtyDate, minutes) {
        var date = fns.parse(dirtyDate);
        date.setMinutes(minutes);
        return date;
    }

    public static setHours(dirtyDate, hours) {
        var date = fns.parse(dirtyDate);
        date.setHours(hours);
        return date;
    }

    public static differenceInMinutes(dirtyDateLeft, dirtyDateRight) {
        var diff = fns.differenceInMilliseconds(dirtyDateLeft, dirtyDateRight) / fns.MILLISECONDS_IN_MINUTE
        return diff >= 1 ? Math.floor(diff) : Math.ceil(diff);
    }

    static differenceInMilliseconds(dirtyDateLeft, dirtyDateRight) {
        var dateLeft = fns.parse(dirtyDateLeft);
        var dateRight = fns.parse(dirtyDateRight);
        return dateLeft.getTime() - dateRight.getTime();
    }

    public static addMinutes(dirtyDate, amount) {
        var date = fns.parse(dirtyDate);
        date.setMinutes(date.getMinutes() + amount);
        return date;
    }

    public static addHours(dirtyDate, amount) {
        var date = fns.parse(dirtyDate);
        date.setHours(date.getHours() + amount);
        return date;
    }

    public static endOfDay(dirtyDate) {
        var date = fns.parse(dirtyDate);
        date.setHours(23, 59, 59, 999);
        return date;
    }

    public static startOfMinute(dirtyDate) {
        var date = fns.parse(dirtyDate);
        date.setSeconds(0, 0);
        return date;
    }

    public static differenceInSeconds(dirtyDateLeft, dirtyDateRight) {
        var diff = fns.differenceInMilliseconds(dirtyDateLeft, dirtyDateRight) / 1000;
        return diff > 0 ? Math.floor(diff) : Math.ceil(diff);
    }

    public static endOfMonth(dirtyDate) {
        var date = fns.parse(dirtyDate);
        var month = date.getMonth();
        date.setFullYear(date.getFullYear(), month + 1, 0);
        date.setHours(23, 59, 59, 999);
        return date;
    }

    public static endOfWeek(dirtyDate, options) {
        var weekStartsOn = options ? (options.weekStartsOn || 0) : 0;
        var date = fns.parse(dirtyDate);
        var day = date.getDay();
        var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
        date.setDate(date.getDate() + diff);
        date.setHours(23, 59, 59, 999);
        return date;
    }

    public static isSameMonth(dirtyDateLeft, dirtyDateRight) {
        var dateLeft = fns.parse(dirtyDateLeft);
        var dateRight = fns.parse(dirtyDateRight);
        return dateLeft.getFullYear() === dateRight.getFullYear() &&
            dateLeft.getMonth() === dateRight.getMonth();
    }

    public static getDay(dirtyDate) {
        var date = fns.parse(dirtyDate);
        var day = date.getDay();
        return day;
    }

    public static isSameSecond(dirtyDateLeft, dirtyDateRight) {
        var dateLeftStartOfSecond = fns.startOfSecond(dirtyDateLeft);
        var dateRightStartOfSecond = fns.startOfSecond(dirtyDateRight);

        return dateLeftStartOfSecond.getTime() === dateRightStartOfSecond.getTime();
    }

    public static startOfMonth(dirtyDate) {
        var date = fns.parse(dirtyDate);
        date.setDate(1);
        date.setHours(0, 0, 0, 0);
        return date;
    }

    static startOfSecond(dirtyDate) {
        var date = fns.parse(dirtyDate);
        date.setMilliseconds(0);
        return date;
    }

    public static differenceInDays(dirtyDateLeft, dirtyDateRight) {
        var dateLeft = fns.parse(dirtyDateLeft);
        var dateRight = fns.parse(dirtyDateRight);

        var sign = fns.compareAsc(dateLeft, dateRight);
        var difference = Math.abs(fns.differenceInCalendarDays(dateLeft, dateRight));
        dateLeft.setDate(dateLeft.getDate() - sign * difference);

        // Math.abs(diff in full days - diff in calendar days) === 1 if last calendar day is not full
        // If so, result must be decreased by 1 in absolute value
        var isLastDayNotFull: any = fns.compareAsc(dateLeft, dateRight) === -sign;
        return sign * (difference - isLastDayNotFull);
    }

    static differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
        var startOfDayLeft = fns.startOfDay(dirtyDateLeft);
        var startOfDayRight = fns.startOfDay(dirtyDateRight);

        var timestampLeft = startOfDayLeft.getTime() -
            startOfDayLeft.getTimezoneOffset() * fns.MILLISECONDS_IN_MINUTE;
        var timestampRight = startOfDayRight.getTime() -
            startOfDayRight.getTimezoneOffset() * fns.MILLISECONDS_IN_MINUTE;

        // Round the number of days to the nearest integer
        // because the number of milliseconds in a day is not constant
        // (e.g. it's different in the day of the daylight saving time clock shift)
        return Math.round((timestampLeft - timestampRight) / fns.MILLISECONDS_IN_DAY);
    }

    static compareAsc(dirtyDateLeft, dirtyDateRight) {
        var dateLeft = fns.parse(dirtyDateLeft);
        var timeLeft = dateLeft.getTime();
        var dateRight = fns.parse(dirtyDateRight);
        var timeRight = dateRight.getTime();

        if (timeLeft < timeRight) {
            return -1;
        } else if (timeLeft > timeRight) {
            return 1;
        } else {
            return 0;
        }
    }

    static subDays(dirtyDate, amount) {
        return fns.addDays(dirtyDate, -amount)
    }

    static subHours(dirtyDate, amount) {
        return fns.addHours(dirtyDate, -amount)
    }

    static subWeeks(dirtyDate, amount) {
        return fns.addWeeks(dirtyDate, -amount)
    }

    static subMonths(dirtyDate, amount) {
        return fns.addMonths(dirtyDate, -amount)
    }

}
