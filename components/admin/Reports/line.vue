<template>
  <div style="height: 90vh; position: relative">
    <canvas id="lineChart" />
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
    datasets() {
      if (this.datasets.length) this.generateChart()
      if (!this.datasets.length) this.chart.destroy()
    },
  },
  methods: {
    generateChart() {
      const data = {
        labels: [
          'Dont know',
          'None',
          'A little',
          'Adequate',
          'Substantial',
          'A great deal',
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
