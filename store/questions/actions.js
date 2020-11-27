export default {
  async fetchQuestions(state) {
    const data = this.$fire.database.ref('survey')
    try {
      await data.once('value', (r) => {
        state.commit('SET_QUESTIONS', r.val())
        return r.val()
      })
    } catch (e) {
      alert(e)
    }
  },
  async fetchGoals(state) {
    const data = this.$fire.database.ref('goal').orderByChild('sortOrder')
    try {
      await data.once('value', (r) => {
        state.commit('SET_GOALS', r.val())
        return r.val()
      })
    } catch (e) {
      alert(e)
    }
  },
  async writeNewQuestions(state, question) {
    const messageRef = this.$fire.database.ref(
      'survey/' + this.$utilities.guid()
    )
    try {
      await messageRef
        .set({
          question,
          created: new Date(),
          edited: new Date(),
        })
        .then(this.fetchQuestions)
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
    } catch (e) {
      alert(e)
      return false
    }
  },
}
