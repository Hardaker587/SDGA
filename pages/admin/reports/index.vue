<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" class="text-h5 font-weight-bold mb-0"
        >Select report type</v-col
      >
      <v-col cols="12">Select a report type to proceed to data selection</v-col>
    </v-row>
    <v-row>
      <v-col v-for="chart in chartTypes" :key="chart.type" cols="4">
        <v-card
          height="300"
          class="d-flex flex-column items-center justify-center"
          @click="NavigateToDataSelection(chart.type)"
        >
          <v-icon x-large>{{ chart.icon }}</v-icon>
          <div class="font-weight-black text-center">
            {{ chart.name }}
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import chartType from '../../../enums/chartType.enum'
import { dataMixin } from '~/mixins/data.mixin'
export default {
  name: 'Index',
  mixins: [dataMixin],
  data: () => ({
    chartTypes: [
      { name: 'Bar Chart', type: chartType.BAR, icon: 'mdi-chart-bar' },
      { name: 'Line Chart', type: chartType.LINE, icon: 'mdi-chart-line' },
      { name: 'Radar Chart', type: chartType.RADAR, icon: 'mdi-spider-web' },
      {
        name: 'Doughnut Chart',
        type: chartType.DOUGHNUT,
        icon: 'mdi-chart-donut',
      },
      { name: 'Pie Chart', type: chartType.PIE, icon: 'mdi-chart-pie' },
      { name: 'Polar Chart', type: chartType.POLAR, icon: 'mdi-chart-arc' },
    ],
    SelectionGroups: [],
    chart: null,
  }),
  methods: {
    GroupResponses() {
      this.SelectionGroups = this.$data_service.SelectionGroup(
        this.fetchMappedResponses,
        'selection.text',
        true
      )
      if (this.chart) this.DestroyChart()
      this.chart = this.$chart_service.generateChart(
        this.SelectionGroups,
        chartType.LINE,
        { parsing: { xAxisKey: 'key', yAxisKey: 'total' } },
        '#tryChart'
      )
    },
    DestroyChart() {
      this.$chart_service.destoryChart(this.chart)
    },
    NavigateToDataSelection(chartType) {
      return this.$router.push(
        '/admin/reports/data-selection/?chart=' + chartType
      )
    },
  },
}
</script>
