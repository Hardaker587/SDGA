<template>
  <v-container fluid>
    <v-row class="ma-2" align="center">
      <v-col cols="3"
        ><span class="text-overline text-weight-bold"
          >Manage Survey:
        </span></v-col
      >
      <v-col cols="3" class="pa-1"><add-new-question></add-new-question></v-col>
      <v-col cols="3" class="pa-1"><add-new-goal></add-new-goal></v-col>
      <v-col cols="3" class="pa-1"
        ><add-new-goal-category></add-new-goal-category
      ></v-col>
    </v-row>
    <questions
      :goals="getGoals"
      :goal-categories="getCategories"
      :questions="getQuestions"
    ></questions>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import AddNewQuestion from '@/components/admin/Questions/AddNewQuestion'
import Questions from '@/components/admin/Questions/Questions'
import AddNewGoal from '@/components/admin/Questions/AddNewGoal'
import AddNewGoalCategory from '~/components/admin/Questions/AddNewGoalCategory'
export default {
  name: 'QuestionDashboard',
  components: { AddNewGoalCategory, AddNewGoal, Questions, AddNewQuestion },
  mounted() {
    this.$store.dispatch('questions/fetchGoals')
    this.$store.dispatch('questions/fetchGoalCategories')
    this.$store.dispatch('questions/fetchQuestions')
  },
  computed: {
    ...mapGetters({
      getGoals: 'questions/getGoals',
      getCategories: 'questions/getGoalCategories',
      getQuestions: 'questions/getQuestions',
    }),
  },
}
</script>
