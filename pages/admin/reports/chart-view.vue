<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="6" class="text-h5 font-weight-bold mb-0">Chart view</v-col>
      <v-col
        cols="6"
        class="mb-0 text-right"
        @click="$router.push('/admin/reports')"
      >
        <v-btn small fab dark><v-icon>mdi-chevron-left</v-icon></v-btn>
        Choose new chart</v-col
      >
      <v-col cols="12"
        >Below is the options required to generate your
        <span class="font-weight-black">{{ chart }}</span> chart while you query
        against {{ chartData }}</v-col
      >
    </v-row>
    <v-row v-if="renderGoals && getGoals && getGoals.length">
      <v-list-item-group v-model="goals" multiple active-class="">
        <v-list-item v-for="goal in getGoals" :key="goal.id" :value="goal">
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ goal.title }}</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
      <v-bottom-navigation
        fixed
        horizontal
        class="justify-space-between align-center px-4"
      >
        <div>
          <div class="font-weight-bold">
            You have {{ goals ? goals.length : 0 }} goals selected
          </div>
          <div class="text-caption">
            Please select a minimum of 2 to proceed
          </div>
        </div>
        <v-btn
          color="green"
          width="300px"
          :disabled="!goals || goals.length < 2"
          @click="generateChart()"
        >
          <v-icon dark color="white" class="mr-0">mdi-chevron-right</v-icon>
          <span class="white--text font-weight-bold">Submit</span>
        </v-btn>
      </v-bottom-navigation>
    </v-row>
    <v-row>
      <canvas
        v-if="chart"
        :id="`chart_${chart}_${chartData}`"
        class="chart"
      ></canvas>
    </v-row>
  </v-container>
</template>

<script>
import { dataMixin } from '../../../mixins/data.mixin'
import chartType from '~/enums/chartType.enum'
import barData from '~/enums/barData.enum'
import lineData from '~/enums/lineData.enum'
import radarData from '~/enums/radarData.enum'
import doughNutData from '~/enums/doughtnutData.enum'
import pieData from '~/enums/pieData.enum'
import polarData from '~/enums/polarData.enum'

export default {
  name: 'ChartView',
  mixins: [dataMixin],
  data: () => ({
    generatedChart: null,
    goals: null,
    categories: null,
    questions: null,
    error: false,
  }),
  computed: {
    returnGetGoals() {
      return this.getGoals
    },
    selectedChart() {
      return this.$route.query.chart
    },
    selectedData() {
      return this.$route.query.data
    },
    chart() {
      return Object.keys(chartType)[this.selectedChart]
    },
    chartData() {
      return Object.keys(this.returnRelevantChartData)[this.selectedData]
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
      return chartData
    },
    renderGoals() {
      return (
        +this.selectedData === radarData.GOALS ||
        +this.selectedData === doughNutData.GOALS ||
        +this.selectedData === pieData.GOALS ||
        +this.selectedData === polarData.GOALS
      )
    },
    renderCategories() {
      return (
        +this.selectedData === radarData.CATEGORIES ||
        +this.selectedData === doughNutData.CATEGORIES ||
        +this.selectedData === pieData.CATEGORIES ||
        +this.selectedData === polarData.CATEGORIES
      )
    },
    renderQuestions() {
      return (
        +this.selectedData === radarData.QUESTIONS ||
        +this.selectedData === doughNutData.QUESTIONS ||
        +this.selectedData === pieData.QUESTIONS ||
        +this.selectedData === polarData.QUESTIONS
      )
    },
  },
  watch: {
    fetchMappedResponses(value) {
      if (value.length) this.generateChart()
    },
  },
  methods: {
    generatedChartData() {
      let output = []
      if (
        +this.selectedData === barData.ALL_RESPONSES ||
        +this.selectedData === lineData.ALL_RESPONSES
      ) {
        output = this.$data_service.SelectionGroup(
          this.fetchMappedResponses,
          'selection.text',
          true
        )
      }
      if (+this.selectedData === radarData.GOALS) {
        if (!this.goals || this.goals.length < 2) return
        if (this.goals && this.goals.length >= 2) {
          console.log('dafuq')
          this.error = false
          this.goals.forEach((goal) => {
            const returnOutput = this.$data_service.GoalData(
              goal.id,
              this.getGoals,
              this.getGoalCategories,
              this.getQuestions,
              this.fetchMappedResponses
            )
            output.push(returnOutput)
          })
        }
      }
      console.log(output)
      return output
    },
    generateChart() {
      if (
        !this.generatedChartData() ||
        typeof this.generatedChartData() === 'undefined'
      )
        return
      this.generatedChart = this.$chart_service.generateChart(
        this.generatedChartData(),
        chartType[this.chart],
        { parsing: { xAxisKey: 'key', yAxisKey: 'total' }, height: 900 },
        `#chart_${this.chart}_${this.chartData}`
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.chart {
  max-height: 75vh;
}
</style>
