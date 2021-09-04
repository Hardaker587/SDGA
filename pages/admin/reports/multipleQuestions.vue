<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <v-treeview
          v-model="selection"
          class="text-caption"
          dense
          selectable
          :items="items"
          item-text="title"
          item-key="key"
          return-object
        ></v-treeview>
      </v-col>
      <v-col cols="8">
        <line-chart v-if="dataSets" :labels="labels" :datasets="dataSets" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import lineChart from '~/components/admin/Reports/line'
export default {
  name: 'multipleQuestions',
  components: { lineChart },
  data: () => ({
    labels: [],
    items: [],
    selection: [],
    dataSets: [],
  }),
  computed: {
    ...mapGetters({
      fetchResponses: 'survey/fetchResponsesFromDB',
      fetchMappedResponses: 'survey/fetchMappedResponses',
      fetchPossibleSelections: 'survey/fetchPossibleSelections',
      getQuestions: 'questions/getQuestions',
      getGoals: 'questions/getGoals',
      getGoalCategories: 'questions/getGoalCategories',
    }),
  },
  watch: {
    selection(selections) {
      this.createDatasets(selections)
    },
  },
  mounted() {
    this.getInformation()
  },
  methods: {
    ...mapActions({
      fetchQuestions: 'questions/fetchQuestions',
      fetchGoals: 'questions/fetchGoals',
      fetchCategories: 'questions/fetchGoalCategories',
      fetchSurveyResponses: 'survey/fetchSurveyResponses',
    }),
    getInformation() {
      this.fetchQuestions()
        .then(this.fetchGoals())
        .then(this.fetchCategories())
        .then(this.fetchSurveyResponses)
        .finally(() => {
          this.generateList()
        })
    },
    generateList() {
      const output = []
      this.getGoals.forEach((goal) => {
        const goalObject = { ...goal }
        const goalChildren = []
        this.getQuestions.filter((question) => {
          if (goal.key === question.goal) {
            question.title = question.question
            goalChildren.push(question)
          }
        })
        goalObject.children = goalChildren
        output.push(goalObject)
        this.items = output
      })
    },
    createDatasets(selectedQuestions) {
      try {
        const datasets = []
        selectedQuestions.forEach((selectedQuestion) => {
          const color = this.randomColor()
          const out = {
            label: selectedQuestion.question,
            fill: true,
            backgroundColor: `rgba(${color.r},${color.g}, ${color.b}, 0.2)`,
            borderColor: `rgb(${color.r},${color.g}, ${color.b})`,
            pointBackgroundColor: `rgb(${color.r},${color.g}, ${color.b})`,
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: `rgb(${color.r},${color.g}, ${color.b})`,
          }
          const selections = [...this.fetchPossibleSelections]
          const result = this.fetchMappedResponses.filter(
            (r) => r.questionId === selectedQuestion.key
          )
          const grouped = this.$_.groupBy(result, (res) => {
            return res.selection.value
          })
          console.log(grouped)
          selections.map((selection) => {
            console.log(selection.value)
            selection.count = grouped[selection.value]
              ? grouped[selection.value].length || 0
              : 0
          })
          out.data = selections.map((select) => select.count)
          datasets.push(out)
        })
        this.dataSets = datasets
      } catch (e) {
        console.error(e)
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
