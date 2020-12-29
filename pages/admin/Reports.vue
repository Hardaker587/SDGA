<template>
  <div>
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
    </v-container>
    This is the reports page, There are currently
    {{ fetchResponses.length }} captured surveys
    <span v-for="response in fetchResponses" :key="response">
      {{ response.user.displayName }}
    </span>
    <bar
      v-if="filters.question !== ''"
      :labels="returnLabels()"
      :data="filterResults(filters.question)"
    />
  </div>
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
      console.log(result)
      const mappedResult = result.map((s) => s.selection)
      console.log(mappedResult)
      const calculatedResult = this.$_.countBy(mappedResult, 'text')
      console.log(calculatedResult)
      const exportedResult = []

      exportedResult.push(Object.keys(calculatedResult))
      exportedResult.push(Object.values(calculatedResult))
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
