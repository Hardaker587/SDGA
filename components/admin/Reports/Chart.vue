<template>
  <canvas :id="`generic-chart_${id}`" />
</template>

<script>
import Chart from 'chart.js/auto'
export default {
  name: 'Chart',
  props: {
    chartType: { type: String, required: false, default: 'line' },
    dataset: { type: [Object, Array], required: true, default: () => {} },
    xAxisKey: { type: String, required: true },
    yAxisKey: { type: String, required: true },
    options: { type: Object, required: false, default: () => {} },
  },
  data: () => ({
    id: '',
    chart: null,
  }),
  computed: {
    generateLabels() {
      return this.dataset.map((data) => data[this.xAxisKey])
    },
  },
  watch: {
    dataset(original_data, new_data) {
      if (new_data !== original_data && this.chart) {
        this.chart.destroy()
        this.generateChart()
      }
      if (this.dataset || this.dataset.length) this.generateChart()
      if ((!this.dataset || !this.dataset.length) && this.chart)
        this.chart.destroy()
    },
  },
  created() {
    this.id = this.$utilities.guid()
  },
  methods: {
    generateChart() {
      /* Generate colors */
      const backgroundColor = []
      const borderColor = []
      for (let i = 0; i < this.dataset.length; i++) {
        const color = this.randomColor()
        backgroundColor.push(`rgba(${color.r},${color.g}, ${color.b}, 0.2)`)
        borderColor.push(`rgb(${color.r},${color.g}, ${color.b})`)
      }
      const config = {
        type: this.chartType,
        data: {
          labels: [...this.generateLabels],
          datasets: [
            {
              data: this.dataset,
              backgroundColor,
              borderColor,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          parsing: {
            xAxisKey: this.xAxisKey,
            yAxisKey: this.yAxisKey,
          },
          ...this.options,
        },
      }
      // eslint-disable-next-line no-new
      try {
        this.chart = new Chart(
          document.getElementById(`generic-chart_${this.id}`),
          config
        )
        console.log(config)
      } catch (e) {
        console.error({ error: e })
      }
    },
    random(number) {
      return Math.floor(Math.random() * number)
    },
    randomColor() {
      return { r: this.random(255), g: this.random(255), b: this.random(255) }
    },
  },
}
</script>

<style scoped></style>
