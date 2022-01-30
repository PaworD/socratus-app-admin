<template>
  <div class="calendar">
    <div v-if="controllers" class="calendar__controllers">
      <SButton flat label="Previous Month" :tooltip="prevMonthAsString" @onClick="subMonth"/>
      {{this.selectedDayAndMonth.month}}
      <SButton flat label="Next Month" :tooltip="nextMonthAsString" @onClick="addMonth"/>
    </div>
<!--    <span v-if="filteredEventListForSelectedDate !== []">-->
<!--      <li v-for="event in filteredEventListForSelectedDate" :key="event.id">-->
<!--        {{event.title}}-->
<!--      </li>-->
<!--    </span>-->
    <div class="calendar__weekdays">
      <div class="weekday" v-for="(day, index) in days" :key="index">
        <strong>{{day}}</strong>
      </div>
    </div>
    <div class="calendar__dates">
      <div class="date" :class="{
            'blank': date.blank,
            'no-border-right': date.key % 7 === 0
        }" v-for="date in dateList" :key="date.key" :data-date="date.date" @click="onDaySelect(date)">
        <span class="day" :class="{'selected': dateIsEqualSelectDate(date), 'today': date.today,}">
          {{date.dayNumber }}
        </span>
        <span v-if="date.events !== 0">
          <div v-for="event in date.events" :key="event.id" class="date__event">
            <span :style="{ 'background-color': event.room.color }">
              {{ event.room.name }}
            </span>
            <SAvatar :source="[event.teacher.firstName + ' ' + event.teacher.lastName]" />
          </div>
        </span>
        <span class="weekday">{{date.weekDay}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import {Days, filters, VisibilityFilter, Event, DayAndMonth} from "./Calendar.contracts";
import moment, { Moment } from "moment";
import { SButton } from "@/shared/components/Button";
import { SAvatar } from '@/shared/components'

@Component({ name: 'SCalendar', components: { SButton, SAvatar } })
export class SCalendar extends Vue {
  @Prop({ type: Boolean, required: false, default: true })
  private readonly controllers!: boolean

  @Prop({ type: Array, required: false })
  private readonly events!: Event[]

  @Prop({ type: Boolean, required: false })
  private readonly preview!: boolean

  public today = moment()
  public dateContext = moment()
  public selectedDate = moment()

  public days = Days

  /**
   * Get current year
   */
  public get year (): string {
    return this.dateContext.format('Y')
  }

  /**
   * Get current month
   */
  public get month (): string {
    return this.dateContext.format('MMMM')
  }

  /**
   * Get days in month
   */
  public get daysInMonth (): number {
    return this.dateContext.daysInMonth()
  }

  /**
   * Get current date
   */
  public get currentData (): number {
    return this.dateContext.get('date')
  }

  /**
   * Get first date in month
   */
  public get firstDayInMonth (): number {
    const firstDay = moment(this.dateContext).subtract(
        this.currentData,
        "days"
    );
    return firstDay.weekday()
  }

  /**
   * Get previous month
   */
  public get previousMonth (): Moment {
    return moment(this.dateContext).subtract(1, "month")
  }

  /**
   * Get previous month as string [display value]
   */
  public get prevMonthAsString (): string {
    return this.previousMonth.format("MMMM")
  }

  /**
   * Get next month
   */
  public get nextMonth (): Moment {
    return moment(this.dateContext).add(1, "month")
  }

  /**
   * Get next month as string [display value]
   */
  public get nextMonthAsString (): string {
    return this.nextMonth.format("MMMM")
  }

  /**
   * Triggered when day is selected
   */
  public onDaySelect (date: any): void {
    this.$emit('onDaySelect', date)
  }

  /**
   * Get number of days in previous month
   */
  public get daysInPrevMonth (): number {
    return this.previousMonth.daysInMonth();
  }

  /**
   * Get number of days from previous month till the first day of current month
   */
  public get daysFromPrevMonth (): number[] {
    let daysList = [];
    let count = this.daysInPrevMonth - this.firstDayInMonth;
    while (count < this.daysInPrevMonth) {
      count++;
      daysList[count] = count;
    }

    return daysList.filter(function() {
      return true;
    });
  }

  /**
   * Get list of dates [display values]
   */
  public get dateList(): any[] {

    let dateList = [];

    let previousMonth = this.previousMonth;
    let nextMonth = this.nextMonth;

    //dates for display
    let formattedCurrentMonth = this.dateContext.format("MM");
    let formattedCurrentYear = this.year;
    let formattedPreviousMonth = previousMonth.format("MM");
    let formattedPreviousYear = previousMonth.format("Y");
    let formattedNextMonth = nextMonth.format("MM");
    let formattedNextYear = nextMonth.format("Y");

    //counters
    let countDayInCurrentMonth = 0;
    let countDayInPreviousMonth = 0;

    //filling in dates from the previous month
    this.daysFromPrevMonth.forEach((dayFromPreviousMonth) => {
      countDayInCurrentMonth++;
      countDayInPreviousMonth++;

      let formattedDay = this.formattingDay(dayFromPreviousMonth);
      let previousMonth =
          this.daysFromPrevMonth.length ===
          countDayInPreviousMonth
              ? this.prevMonthAsString
              : false
      let previousYear =
          formattedCurrentYear !== formattedPreviousYear &&
          this.daysFromPrevMonth.length ===
          countDayInPreviousMonth
              ? formattedPreviousYear
              : false;
      let additional: {month: string | boolean, year: string | boolean} | false = {
        month: previousMonth,
        year: previousYear
      };

      if (!previousMonth && !previousYear) {
        additional = false;
      }

      dateList[countDayInCurrentMonth] = {
        key: countDayInCurrentMonth,
        dayNumber: formattedDay,
        date:
            formattedDay +
            "." +
            formattedPreviousMonth +
            "." +
            formattedPreviousYear,
        blank: true,
        today: false,
        additional: additional,
        weekDay: false,
        moment: moment(
            formattedPreviousYear +
            formattedPreviousMonth +
            formattedDay
        )
      };
    });

    //filling in dates from the current month
    while (
        countDayInCurrentMonth <
        this.firstDayInMonth + this.daysInMonth
        ) {
      countDayInCurrentMonth++;

      let day = countDayInCurrentMonth - countDayInPreviousMonth;
      let weekDay = this.getWeekDay(countDayInCurrentMonth);
      let formattedDay = this.formattingDay(day);

      console.log(this.filteredEventListForSelectedDate(moment(formattedCurrentYear +
          formattedCurrentMonth + formattedDay).format('DD-MM-YYYY')))

      dateList[countDayInCurrentMonth] = {
        key: countDayInCurrentMonth,
        dayNumber: formattedDay,
        date:
            formattedDay +
            "." +
            formattedCurrentMonth +
            "." +
            formattedCurrentYear,
        blank: false,
        today:
            formattedDay === this.todayDate &&
            this.todayInCurrentMonthAndYear,
        additional: false,
        weekDay: weekDay,
        events: this.filteredEventListForSelectedDate(moment(
            formattedCurrentYear +
            formattedCurrentMonth +
            formattedDay
        ).format('DD-MM-YYYY')).length > 0 ? this.filteredEventListForSelectedDate(moment(
            formattedCurrentYear +
            formattedCurrentMonth +
            formattedDay
        ).format('DD-MM-YYYY')) : [],
        moment: moment(
            formattedCurrentYear +
            formattedCurrentMonth +
            formattedDay
        )
      };
    }

    let daysInNextMonth = 7 - (countDayInCurrentMonth % 7);
    let countDayInCurrentMonthSaved = countDayInCurrentMonth;
    let day = 0;

    //filling in dates from the next month
    if (daysInNextMonth < 7) {
      while (
          countDayInCurrentMonth <
          countDayInCurrentMonthSaved + daysInNextMonth
          ) {
        countDayInCurrentMonth++;
        day++;

        let formattedDay = this.formattingDay(day);
        let nextMonth = day === 1 ? this.nextMonthAsString : false;
        let nextYear =
            formattedCurrentYear !== formattedNextYear && day === 1
                ? formattedNextYear
                : false;
        let additional: {month: string | boolean, year: string | boolean} | false = {
          month: nextMonth,
          year: nextYear
        };

        if (!nextMonth && !nextYear) {
          additional = false;
        }

        dateList[countDayInCurrentMonth] = {
          key: countDayInCurrentMonth,
          dayNumber: formattedDay,
          date:
              formattedDay +
              "." +
              formattedNextMonth +
              "." +
              formattedNextYear,
          blank: true,
          today: false,
          additional: additional,
          weekDay: false,
          moment: moment(
              formattedNextYear +
              formattedNextMonth +
              formattedDay
          )
        };
      }
    }

    return dateList.filter(function() {
      return true
    })
  }

  public get todayDate (): string {
    return this.formattingDay(this.today.get("date"))
  }

  public get todayMonth(): string {
    return this.today.format("MMMM")
  }

  public get todayYear(): string {
    return this.today.format("Y")
  }

  public get todayInCurrentMonthAndYear(): boolean {
    return (
        this.month === this.todayMonth && this.year === this.todayYear
    )
  }

  //get selected day and month
  public get selectedDayAndMonth(): DayAndMonth  {
    let dayAndMonth: DayAndMonth

    let _dayAndMonth = this.selectedDate.format("DD MMMM").split(" ")

    dayAndMonth = {
      day: _dayAndMonth[0],
      month: _dayAndMonth[1]
    };

    return dayAndMonth
  }

  public get selectedWeekDay (): string {
    return this.selectedDate.format("dddd")
  }

  //comparison today with selectedDate
  public get todayIsEqualSelectDate(): boolean {
    return (
        this.selectedDate.format("YYYYMMDD") ===
        this.today.format("YYYYMMDD")
    )
  }

  /**
   *  get list events for selected in calendar date
   */
  public eventListForSelectedDate(date: string): Event[] {
    return filters[VisibilityFilter.VISIBILITY_FOR_DATE](
        this.events,
        date
    );
  }

  /**
   *  get filtered list events for selected in calendar date and completed filter
   */
  public filteredEventListForSelectedDate(date: string): Event[] {
    return filters[VisibilityFilter.VISIBILITY_ALL](this.eventListForSelectedDate(date));
  }

  public formattingDay (day: any): string {
    return ("0" + day).slice(-2)
  }

  public getWeekDay (day: number): any {
    let index = day
    if (index > 7) {
      index %= 7
    }
    index = index === 0 ? 6 : index - 1
    return this.days[index]
  }

  public dateIsEqualSelectDate(date: any) {
    return (
        this.selectedDate.format("YYYYMMDD") ===
        date.moment.format("YYYYMMDD")
    )
  }

  public addMonth() {
    this.dateContext = this.nextMonth
  }

  public subMonth() {
    this.dateContext = this.previousMonth
  }

}
export default SCalendar
</script>

<style>

</style>