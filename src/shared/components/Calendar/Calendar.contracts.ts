import { Identifier, Room, Teacher } from '@/shared/models'

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

export interface Event extends Identifier{
    endTime: string
    room: Room
    startTime: string
    teacher: Teacher
}

export interface Calendar {
    controllers: boolean
    events: Event[]
    preview: boolean
}

export enum VisibilityFilter {
    VISIBILITY_FOR_DATE = 'forDate',
    VISIBILITY_ALL = 'all'
}

export const filters = {
    forDate: (eventList: Event[], selectedDate: string) => {
        return eventList.filter(function(event) {
            return event.startTime.split(' ')[0] === selectedDate;
        });
    },
    all: (eventList: Event[]) => {
        return eventList;
    },
};