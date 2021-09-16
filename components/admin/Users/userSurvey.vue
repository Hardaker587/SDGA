<template>
  <v-container fluid>
    <v-expansion-panels flat>
      <v-expansion-panel>
        <v-expansion-panel-header> Responses by user </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col cols="8">Question</v-col>
            <v-col cols="4">Answer</v-col>
          </v-row>
          <v-row
            v-for="(userResponse, index) in response.responses"
            :key="index"
          >
            <v-col cols="8">{{
              returnQuestion(userResponse.questionId).question
            }}</v-col>
            <v-col cols="4">
              {{ userResponse.selection.text }}
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'userSurvey',
  props: {
    user: { type: [Object, Array], required: true, default: () => [] },
    response: { type: [Object, Array], required: true, default: () => [] },
  },
  computed: {
    ...mapGetters({
      getQuestions: 'questions/getQuestions',
      getGoals: 'questions/getGoals',
      getGoalCategories: 'questions/getGoalCategories',
    }),
  },
  methods: {
    returnQuestion(questionId) {
      return this.getQuestions.find((question) => question.key === questionId)
    },
  },
}
</script>
