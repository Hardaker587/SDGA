<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="text-h5 font-weight-bold">Quick stats</v-col>

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
    </v-row>
    <v-row>
      <v-col cols="12" class="text-h5 font-weight-bold">Quick links</v-col>
      <v-col cols="4">
        <v-card
          class="d-flex flex-column justify-center align-center font-weight-bold"
          color="#D3A029"
          width="100%"
          height="300px"
          dark
          to="/admin/manageQuestions"
          ><v-icon x-large>mdi-head-question</v-icon>
          <span class="text-h5">Manage Questions</span></v-card
        >
      </v-col>
      <v-col cols="4">
        <v-card
          class="d-flex flex-column justify-center align-center font-weight-bold"
          width="100%"
          height="300px"
          color="#00AED9"
          dark
          to="/admin/reports"
          ><v-icon x-large>mdi-chart-pie</v-icon>
          <span class="text-h5">View Reports</span></v-card
        >
      </v-col>
      <v-col cols="4">
        <v-card
          class="d-flex flex-column justify-center align-center font-weight-bold"
          width="100%"
          height="300px"
          color="#E11484"
          dark
          to="/admin/manageUsers"
          ><v-icon x-large>mdi-account</v-icon>
          <span class="text-h5">Manage Users</span></v-card
        >
      </v-col>
    </v-row>
  </v-container>
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
