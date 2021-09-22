<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <v-radio-group v-model="selection" row>
          <v-radio
            v-for="selection in fetchPossibleSelections"
            :key="selection.value"
            :label="selection.text"
            :value="selection.value"
          ></v-radio>
        </v-radio-group>
        <v-treeview
          v-model="goals"
          class="text-caption"
          dense
          selectable
          :items="getGoals"
          item-text="title"
          item-key="key"
          return-object
        ></v-treeview>
      </v-col>
      <v-btn @click="generateData"> do it</v-btn>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'byGoal',
  data: () => ({
    labels: [],
    items: [],
    goals: [],
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
  mounted() {
    this.getInformation()
  },
  beforeDestroy() {
    this.clearResponses()
  },
  methods: {
    ...mapActions({
      fetchQuestions: 'questions/fetchQuestions',
      fetchGoals: 'questions/fetchGoals',
      fetchCategories: 'questions/fetchGoalCategories',
      fetchSurveyResponses: 'survey/fetchSurveyResponses',
      clearResponses: 'survey/clearResponses',
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
    generateData() {
      const dataset = []
      this.goals.forEach((goal) => {
        const output = this.$data_service.GoalData(
          goal.key,
          this.getGoals,
          this.getGoalCategories,
          this.getQuestions,
          this.fetchMappedResponses
        )
        dataset.push(output)
      })
      this.dataSets = dataset
    },
  },
}
</script>
