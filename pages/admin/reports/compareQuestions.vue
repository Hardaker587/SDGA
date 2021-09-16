<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4" class="fixed">
        <v-treeview
          v-model="selections"
          class="text-caption"
          dense
          selectable
          :items="items"
          item-text="title"
          item-key="key"
          return-object
        ></v-treeview>
      </v-col>
      <v-col v-if="selections.length" cols="8">
        <bar
          v-for="(selection, index) in selections"
          :key="index"
          :title="selection.title"
          :labels="returnLabels()"
          :data="filterResults(selection.key)"
          :chartColor="returnColor(selection.goal)"
        />
      </v-col>
      <v-col v-if="!selections.length" cols="8">
        <v-alert text outlined color="deep-orange" icon="mdi-alert-circle">
          Please select at least 1 (one) question to display chart
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Bar from '~/components/admin/Reports/bar'
export default {
  name: 'compareQuestions',
  data: () => ({
    labels: [],
    items: [],
    selections: [],
    dataSets: [],
  }),
  components: { Bar },
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
    returnColor(goal) {
      return this.getGoals.filter((g) => g.key === goal)
    },
    filterCategories(goal) {
      return this.getGoalCategories.filter((g) => g.goal === goal)
    },
    filterQuestions(goalCategory) {
      return this.getQuestions.filter((q) => q.goalCategory === goalCategory)
    },
    filterResults(question) {
      const result = this.fetchMappedResponses.filter(
        (r) => r.questionId === question
      )
      const mappedResult = result.map((s) => s.selection)
      const calculatedResult = this.$_.countBy(mappedResult, 'text')
      const exportedResult = Object.keys(calculatedResult).map((key) => [
        String(key),
        calculatedResult[key],
        this.fetchPossibleSelections.find((r) => String(key) === r.text).color,
      ])
      exportedResult.unshift(['Selection', 'Total', { role: 'style' }])
      return exportedResult
    },
    returnLabels() {
      return this.fetchPossibleSelections.map((r) => r.value)
    },
    resetFilters() {
      this.filters = {
        goal: '',
        goalCategory: '',
        question: '',
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.fixed {
  position: sticky;
  top: 80px;
  align-self: flex-start;
}
</style>
