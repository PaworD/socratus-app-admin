export enum Weekdays {
  Mon = 'Mon',
  Tue = 'Tue',
  Wed = 'Wed',
  Thu = 'Thu',
  Fri = 'Fri',
  Sat = 'Sat',
  Sun = 'Sun'
}

export interface WeekdaysMap {
  [Weekdays.Mon]: boolean,
  [Weekdays.Tue]: boolean,
  [Weekdays.Wed]: boolean,
  [Weekdays.Thu]: boolean,
  [Weekdays.Fri]: boolean,
  [Weekdays.Sat]: boolean
  [Weekdays.Sun]: boolean
}