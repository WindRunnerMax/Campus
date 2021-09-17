export interface CalendarItem {
    day: string;
    type: {
        today: boolean;
        today: boolean;
        flag: boolean;
        work: boolean;
        weekend: boolean;
        vacation: boolean;
        currentMonth: boolean;
        termStart: boolean;
        vacationStart: boolean;
    };
}

export type Calendar = Array<Array<CalendarItem>>;
