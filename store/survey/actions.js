export default {
  captureResponse(state, response) {
    state.commit('ADD_TO_RESPONSE', response)
  },
  async sendResponse(state, { user, responses }) {
    const messageRef = this.$fire.database.ref(
      'surveyResponses/' + this.$utilities.guid()
    )
    try {
      await messageRef.set({ user, responses }).then(
        this.$alerts.showMessage({
          content: 'You have successfully completed the survey',
          color: 'success',
        })
      )
    } catch (e) {
      alert(e)
      console.log(e, user, responses)
      return false
    }
  },
}
