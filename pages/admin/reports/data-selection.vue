<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="6" class="text-h5 font-weight-bold mb-0"
        >Select data to provision</v-col
      >
      <v-col
        cols="6"
        class="mb-0 text-right"
        @click="$router.push('/admin/reports')"
      >
        <v-btn small fab dark><v-icon>mdi-chevron-left</v-icon></v-btn>
        Choose new chart</v-col
      >
      <v-col cols="12"
        >The data you select here will determine how your
        <span class="font-weight-black">{{ chart }}</span> chart will be
        rendered</v-col
      >
    </v-row>
    <v-row>
      <v-col
        v-for="chartData in returnRelevantChartData"
        :key="chartData.type"
        class="flex-grow"
      >
        <v-card
          height="300"
          class="d-flex flex-column items-center justify-center"
          @click="NavigateToChartView(selectedChart, chartData.type)"
        >
          <div class="font-weight-black text-center">
            {{ chartData.chart }}
          </div>
        </v-card>
      </v-col>
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
  name: 'data-selection',
  computed: {
    selectedChart() {
      return this.$route.query.chart
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
      return Object.entries(chartData).map(([chart, type]) => ({
        chart,
        type,
      }))
    },
  },
  methods: {
    NavigateToChartView(chartType, dataType) {
      return this.$router.push(
        '/admin/reports/chart-view/?chart=' + chartType + '&data=' + dataType
      )
    },
  },
}
</script>
