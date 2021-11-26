<template>
  <div class="calendar-date-indicator">{{ selectedDate }}</div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";

@Component({name: 'CalendarDateIndicator'})
export class CalendarDateIndicator extends Vue {
  @Prop({type: Date, required: true})
  private readonly selectedDate!: Date

};
</script>