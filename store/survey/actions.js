export default {
  captureResponse(state, response, questionId) {
    state.commit('ADD_TO_RESPONSE', { response, questionId })
  },
}
