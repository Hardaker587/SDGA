<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" class="text-h5 font-weight-bold mb-0">Chart view</v-col>
      <v-col cols="12"
        >Below is the options required to generate your {{ chart }} chart while
        you query against {{ returnRelevantChartData }}</v-col
      >
    </v-row>
    <v-row>
      <canvas :id="`chart_${chart}_${returnRelevantChartData}`"></canvas>
    </v-row>
  </v-container>
</template>

<script>
import chartType from '~/enums/chartType.enum'
import barData from '~/enums/barData.enum'
import lineData from '~/enums/lineData.enum'
import radarData from '~/enums/radarData.enum'
import doughNutData from '~/enums/doughtnutData.enum'
import pieData from '~/enums/pieData.enum'
import polarData from '~/enums/polarData.enum'

export default {
  name: 'chart-view',
  data: () => ({
    generatedChart: null,
  }),
  computed: {
    selectedChart() {
      return this.$route.query.chart
    },
    selectedData() {
      return this.$route.query.data
    },
    chart() {
      return Object.keys(chartType)[this.selectedChart]
    },
    returnRelevantChartData() {
      let chartData = {}
      switch (this.selectedChart) {
        case String(chartType.BAR):
          chartData = barData
          break
        case String(chartType.LINE):
          chartData = lineData
          break
        case String(chartType.RADAR):
          chartData = radarData
          break
        case String(chartType.DOUGHNUT):
          chartData = doughNutData
          break
        case String(chartType.PIE):
          chartData = pieData
          break
        case String(chartType.POLAR):
          chartData = polarData
          break
      }
      return Object.keys(chartData)[this.selectedData]
    },
  },
  methods: {
    generateChart() {},
  },
}
</script>
