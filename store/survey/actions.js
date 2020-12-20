export default {
  async fetchSurveyResponses(state) {
    const data = this.$fire.database.ref('surveyResponses')
    try {
      await data.once('value', (r) => {
        const responses = []

        r.forEach((response) => {
          responses.push({
            key: response.key,
            user: response.val()[0],
            responses: response.val()[1],
          })
          state.commit('MAP_RESPONSES', response.val()[1])
          return false
        })
        state.commit('SURVEY_RESPONSES', responses)
        return r.val()
      })
    } catch (e) {
      alert(e)
    }
  },
  captureResponse(state, response) {
    state.commit('ADD_TO_RESPONSE', response)
  },
  async sendResponse(state, [user, responses]) {
    const messageRef = this.$fire.database.ref(
      'surveyResponses/' + this.$utilities.guid()
    )
    console.log([user, responses])
    try {
      await messageRef.set([user, responses]).then(
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
