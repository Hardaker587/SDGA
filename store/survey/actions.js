export default {
  async fetchSurveyResponses(state) {
    const data = this.$fire.database.ref('surveyResponses')
    try {
      await data.once('value', (r) => {
        const responses = []

        r.forEach((response) => {
          responses.push({
            key: response.key,
            user: response.val().user,
            date: response.val().submission,
            responses: response.val().responses,
          })
          state.commit('MAP_RESPONSES', response.val().responses)
          return false
        })
        state.commit('SURVEY_RESPONSES', responses)
      })
    } catch (e) {
      alert(e)
    }
  },
  clearResponses(state) {
    state.commit('CLEAR_RESPONSES')
  },
  captureResponse(state, response) {
    state.commit('ADD_TO_RESPONSE', response)
  },
  async sendResponse(state, [user, responses]) {
    const messageRef = this.$fire.database.ref(
      'surveyResponses/' + this.$utilities.guid()
    )
    const date = new Date().toLocaleDateString()
    const time = new Date().toLocaleTimeString()
    const submission = { date, time }
    console.log({ user, submission, responses })
    try {
      await messageRef.set({ user, submission, responses }).then(
        this.$alerts.showMessage({
          content: 'You have successfully completed the survey',
          color: 'success',
        })
      )
    } catch (e) {
      alert(e)
      console.log(e, responses)
      return false
    }
  },
}
