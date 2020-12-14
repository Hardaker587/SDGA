export default {
  ADD_TO_RESPONSE(state, responseItem) {
    if (
      state.surveyResponses.some(
        (item) => item.questionId === responseItem.questionId
      )
    ) {
      state.surveyResponses.splice(
        state.surveyResponses.indexOf(responseItem),
        1
      )
      state.surveyResponses.push(responseItem)
    } else {
      state.surveyResponses.push(responseItem)
    }
  },
}
