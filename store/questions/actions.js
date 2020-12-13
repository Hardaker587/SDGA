export default {
  async fetchQuestions(state) {
    const data = this.$fire.database.ref('survey')
    try {
      await data.once('value', (r) => {
        const questions = []

        r.forEach((question) => {
          questions.push({
            key: question.key,
            ...question.val(),
          })
          return false
        })
        state.commit('SET_QUESTIONS', questions)
        return r.val()
      })
    } catch (e) {
      alert(e)
    }
  },
  async fetchGoals(state) {
    const data = this.$fire.database.ref('goal')
    try {
      await data.orderByChild('sortOrder').once('value', (r) => {
        const goals = []

        r.forEach((goal) => {
          goals.push({
            key: goal.key,
            ...goal.val(),
          })
          return false
        })
        state.commit('SET_GOALS', goals)
        return r.val()
      })
    } catch (e) {
      alert(e)
    }
  },
  async fetchGoalCategories(state) {
    const data = this.$fire.database.ref('goalCategory')
    try {
      await data.orderByChild('sortOrder').once('value', (r) => {
        const goalCategories = []

        r.forEach((goalCategory) => {
          goalCategories.push({
            key: goalCategory.key,
            ...goalCategory.val(),
          })
          return false
        })
        state.commit('SET_GOAL_CATEGORIES', goalCategories)
        return r.val()
      })
    } catch (e) {
      alert(e)
    }
  },
  async writeNewQuestions(state, { question, goal, goalCategory, sortOrder }) {
    const messageRef = this.$fire.database.ref(
      'survey/' + this.$utilities.guid()
    )
    try {
      await messageRef
        .set({
          question,
          goal,
          goalCategory,
          sortOrder,
          created: new Date(),
          edited: new Date(),
        })
        .then(this.fetchQuestions)
        .then(
          this.$alerts.showMessage({
            content: 'New question successfully added',
            color: 'success',
          })
        )
    } catch (e) {
      alert(e)
      return false
    }
  },
  async newGoal(state, { sortOrder, title }) {
    const messageRef = this.$fire.database.ref('goal/' + this.$utilities.guid())
    try {
      await messageRef
        .set({
          sortOrder,
          title,
          created: new Date(),
          edited: new Date(),
        })
        .then(this.fetchGoals)
        .then(
          this.$alerts.showMessage({
            content: 'New goal successfully added',
            color: 'success',
          })
        )
    } catch (e) {
      alert(e)
      return false
    }
  },
  async newGoalCategory(state, { sortOrder, title, goal }) {
    const messageRef = this.$fire.database.ref(
      'goalCategory/' + this.$utilities.guid()
    )
    try {
      await messageRef
        .set({
          sortOrder,
          title,
          goal,
        })
        .then(this.fetchGoalCategories)
        .then(
          this.$alerts.showMessage({
            content: 'New goal category successfully added',
            color: 'success',
          })
        )
    } catch (e) {
      alert(e)
      return false
    }
  },
}
