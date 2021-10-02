<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="text-h5 font-weight-bold">Reports</v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-col cols="12" class="text-h5 font-weight-bold">Test methods</v-col>
      </v-col>
      <v-col cols="4">
        <v-btn @click="GroupResponses">Group all responses</v-btn>
      </v-col>
      <v-col cols="12">
        <canvas id="tryChart"></canvas>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { dataMixin } from '../../../mixins/data.mixin'
import { ChartService } from '../../../services/chart.service'
import chartType from '../../../enums/chartType.enum'
export default {
  name: 'index',
  mixins: [dataMixin],
  data: () => ({
    SelectionGroups: [],
  }),
  methods: {
    GroupResponses() {
      this.SelectionGroups = this.$data_service.SelectionGroup(
        this.fetchMappedResponses,
        'selection.text',
        true
      )
      const chart = new ChartService()
      chart.generateChart(
        this.SelectionGroups,
        chartType.BAR,
        { parsing: { xAxisKey: 'key', yAxisKey: 'total' } },
        '#tryChart'
      )
    },
  },
}
</script>
