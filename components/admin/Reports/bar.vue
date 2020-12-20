<template>
  <section class="container">
    <bar-chart
      id="bar"
      :data="countries"
      xkey="countryiso3code"
      ykeys='["value"]'
      :labels="labels"
      resize="true"
      bar-colors='[ "#36A2EB" ]'
      grid="true"
      grid-text-weight="bold"
    >
    </bar-chart>
  </section>
</template>

<script>
import { BarChart } from 'vue-morris'
export default {
  components: {
    BarChart,
  },
  props: {
    data: { type: [Object, Array], required: false, default: () => [] },
    horizontalKey: { type: String, default: '' },
    verticalKey: { type: String, default: '' },
    labels: { type: [Object, Array], default: () => [] },
  },
  data() {
    return {
      countries: [],
    }
  },
}
</script>
