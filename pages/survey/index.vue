<template>
  <v-container fluid>
    <Goal
      :goals="getGoals"
      :questions="getQuestions"
      :goal-categories="getGoalCategories"
    ></Goal>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Goal from '~/components/survey/Goal'
export default {
  name: 'Index',
  components: { Goal },
  computed: {
    ...mapGetters({
      getGoals: 'questions/getGoals',
      getGoalCategories: 'questions/getGoalCategories',
      getQuestions: 'questions/getQuestions',
      getSurveyResponses: 'survey/getSurveyResponses',
      getUser: 'user/getUser',
    }),
  },
  mounted() {
    this.$store.dispatch('questions/fetchGoals')
    this.$store.dispatch('questions/fetchQuestions')
    this.$store.dispatch('questions/fetchGoalCategories')
  },
  methods: {
    ...mapActions({
      sendResponse: 'survey/sendResponse',
    }),
  },
}
</script>
