<template>
  <v-container fluid>
    <div class="text-caption">
      Reports are displayed as totals by question.
      <span class="font-weight-bold"
        >Only options that have been selected will be displayed</span
      >
    </div>
    <GChart type="BarChart" :data="data" :options="options" />
  </v-container>
</template>

<script>
import { GChart } from 'vue-google-charts'
export default {
  components: { GChart },
  props: {
    data: { type: [Object, Array], required: false, default: () => [] },
    horizontalKey: { type: String, default: '' },
    verticalKey: { type: String, default: '' },
    labels: { type: [Object, Array], default: () => [] },
    chartColor: { type: Object, default: () => {} },
  },
}
</script>
