<template>
  <div style="height: 90vh; position: relative">
    <canvas v-show="datasets.length" id="lineChart" />
    <div v-if="!datasets.length">
      <v-alert text outlined color="deep-orange" icon="mdi-alert-circle">
        Please select at least 1 (one) question to display chart
      </v-alert>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'
export default {
  name: 'lineChart',
  data: () => ({
    chart: null,
  }),
  props: {
    labels: { type: Array, required: false, default: () => [] },
    datasets: { type: Array, required: false, default: () => [] },
  },
  watch: {
    datasets(oldSet, newSet) {
      if (newSet !== oldSet && this.chart) {
        this.chart.destroy()
        this.generateChart()
      }
      if (this.datasets.length) this.generateChart()
      if (!this.datasets.length && this.chart) this.chart.destroy()
    },
  },
  methods: {
    generateChart() {
      const data = {
        labels: [
          'None',
          'A little',
          'Adequate',
          'Substantial',
          'A great deal',
          'Dont know',
        ],
        datasets: this.datasets,
      }
      const config = {
        type: 'radar',
        data,
        options: {
          maintainAspectRatio: false,
          elements: {
            line: {
              borderWidth: 3,
            },
          },
        },
      }
      // eslint-disable-next-line no-new
      try {
        this.chart = new Chart(document.getElementById('lineChart'), config)
      } catch (e) {
        console.error({ error: e })
      }
    },
  },
}
</script>
