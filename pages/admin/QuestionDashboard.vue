<template>
  <v-container>
    <v-row>
      <add-new-question></add-new-question>
      <add-new-goal></add-new-goal>
    </v-row>
    <questions></questions>
  </v-container>
</template>

<script>
import AddNewQuestion from '@/components/admin/Questions/AddNewQuestion'
import Questions from '@/components/admin/Questions/Questions'
import AddNewGoal from '@/components/admin/Questions/AddNewGoal'
export default {
  name: 'QuestionDashboard',
  components: { AddNewGoal, Questions, AddNewQuestion },
  mounted() {
    this.$store.dispatch('questions/fetchGoals')
  },
}
</script>
