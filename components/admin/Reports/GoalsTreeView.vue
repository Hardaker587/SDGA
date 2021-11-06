<template>
  <v-container class="pa-0" fluid>
    <v-treeview
      v-model="selections"
      return-object
      selectable
      :items="returnTreeView"
      item-text="title"
      item-key="key"
      @input="$emit('updateSelections', $event)"
    ></v-treeview>
  </v-container>
</template>

<script>
export default {
  name: 'GoalsTreeView',
  props: {
    goals: { type: [Object, Array], required: true },
    goalCategories: { type: [Object, Array], required: true },
    displayGoalCategories: { type: Boolean, required: false, default: false },
    questions: { type: [Object, Array], required: true },
    displayQuestions: { type: Boolean, required: false, default: false },
  },
  data: () => ({
    selections: [],
    selectedGoals: null,
    selectedGoalCategories: null,
    selectedQuestions: null,
  }),
  computed: {
    returnTreeView() {
      const output = []
      // vuex crap
      const goals = [...this.goals]
      goals.forEach((goal) => {
        const goalObject = { ...goal }
        if (this.displayGoalCategories) {
          const goalChildren = []
          // populate categories
          this.goalCategories.filter((category) => {
            const outputCategory = { ...category }
            if (goal.key === category.goal) {
              outputCategory.title = category.title
              goalChildren.push(outputCategory)
            }
          })
          if (this.displayQuestions) {
            // populate questions
            goalChildren.forEach((goalChild) => {
              const outputQuestions = []
              goalChild.children = this.questions.filter((question) => {
                const outputQuestion = { ...question }
                if (question.goalCategory === goalChild.key) {
                  outputQuestion.title = question.question
                  outputQuestions.push(outputQuestion)
                }
              })
              goalChild.children = outputQuestions
            })
          }
          goalObject.children = goalChildren
        }
        output.push(goalObject)
      })
      return output
    },
  },
}
</script>
