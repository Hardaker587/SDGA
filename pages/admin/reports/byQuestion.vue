<template>
  <v-container fluid>
    <v-row>
      <v-col
        ><span class="text-overline text-weight-bold"
          >Reports Filter</span
        ></v-col
      >
      <v-spacer></v-spacer>
      <v-col align-self="end">
        <v-btn
          v-if="filters.goal !== ''"
          class="text-overline float-right"
          color="error"
          dark
          @click="resetFilters"
          ><v-icon> mdi-refresh </v-icon>Reset Filters</v-btn
        >
      </v-col></v-row
    >
    <v-row>
      <v-col cols="4" class="goal"
        ><v-select
          v-model="filters.goal"
          :items="getGoals"
          item-text="title"
          item-value="key"
          label="Goal"
          outlined
          append-outer-icon="mdi-menu-right"
        ></v-select
      ></v-col>
      <v-col cols="4" class="goalCategory"
        ><v-select
          v-model="filters.goalCategory"
          :items="filterCategories(filters.goal)"
          item-text="title"
          item-value="key"
          label="Goal Category"
          outlined
          :disabled="filters.goal === ''"
          append-outer-icon="mdi-menu-right"
        ></v-select
      ></v-col>
      <v-col cols="4" class="question"
        ><v-select
          v-model="filters.question"
          :items="filterQuestions(filters.goalCategory)"
          item-text="question"
          item-value="key"
          label="Question"
          outlined
          :disabled="filters.goalCategory === ''"
        ></v-select
      ></v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        There are currently
        {{ fetchResponses.length }} captured surveys
        <v-card class="mt-3">
          <bar
            v-if="filters.question !== ''"
            :labels="returnLabels()"
            :data="filterResults(filters.question)"
            :chartColor="returnColor(filters.goal)"
          />
          <v-card-text v-else>
            Please use the filters to view your reports by question
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Bar from '~/components/admin/Reports/bar'
export default {
  name: 'Reports',
  components: { Bar },
  data() {
    return {
      filters: {
        goal: '',
        goalCategory: '',
        question: '',
      },
    }
  },
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
