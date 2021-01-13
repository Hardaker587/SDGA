<template>
  <div class="row">
    <v-col cols="3">
      <v-card @click="$router.push('/admin/reports')">
        <v-card-title>Total Surveys Completed</v-card-title>
        <v-card-text class="text-h4 text-right font-weight-bold">{{
          totalSubmissions
        }}</v-card-text>
      </v-card>
    </v-col>
    <v-col cols="3">
      <v-card>
        <v-card-title>Total Surveys Completed Today</v-card-title>
        <v-card-text class="text-h4 text-right font-weight-bold">{{
          todaysSubmissions
        }}</v-card-text>
      </v-card>
    </v-col>
    <v-col cols="3">
      <v-card @click="$router.push('/admin/questiondashboard')">
        <v-card-title>Total Questions</v-card-title>
        <v-card-text class="text-h4 text-right font-weight-bold">{{
          totalQuestions
        }}</v-card-text>
      </v-card>
    </v-col>
    <v-col cols="3">
      <v-card @click="$router.push('/admin/questiondashboard')">
        <v-card-title>Total Goals</v-card-title>
        <v-card-text class="text-h4 text-right font-weight-bold">{{
          totalGoals
        }}</v-card-text>
      </v-card>
    </v-col>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Index',
  data() {
    return {
      totalSubmissions: '',
      todaysSubmissions: '',
      totalQuestions: '',
      totalGoals: '',
    }
  },
  computed: {
    ...mapGetters({
      fetchResponses: 'survey/fetchResponsesFromDB',
      getQuestions: 'questions/getQuestions',
      getGoals: 'questions/getGoals',
    }),
  },
  mounted() {
    this.returnSubmissions()
  },
  methods: {
    ...mapActions({
      fetchSurveyResponses: 'survey/fetchSurveyResponses',
      fetchQuestions: 'questions/fetchQuestions',
      fetchGoals: 'questions/fetchGoals',
    }),
    async returnSubmissions() {
      // eslint-disable-next-line no-unused-vars
      const date = new Date().toLocaleDateString()
      await this.fetchSurveyResponses().then(() => {
        this.fetchQuestions().then(() => {
          this.fetchGoals()
        })
      })
      this.totalSubmissions = this.fetchResponses.length
      this.todaysSubmissions = this.fetchResponses.filter(
        (r) => r.date.date === date
      ).length
      this.totalQuestions = this.getQuestions.length
      this.totalGoals = this.getGoals.length
    },
  },
}
</script>
