
export const Days = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun'
]

export enum CalendarActions {
    'Edit' = 'edit'
}

export interface DayAndMonth {
    day: string | number
    month: string | number
}

export interface Event {
    id: string | number
    title: string
    date: string
}

export interface Calendar {
    controllers: boolean
    events: any[]
    preview: boolean
}

export enum VisibilityFilter {
    VISIBILITY_FOR_DATE = 'forDate',
    VISIBILITY_ALL = 'all'
}

export const filters = {
    forDate: (eventList: Event[], selectedDate: string) => {
        return eventList.filter(function(event) {
            return event.date === selectedDate;
        });
    },
    all: (eventList: Event[]) => {
        return eventList;
    },
};