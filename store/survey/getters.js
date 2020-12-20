export default {
  getSurveyResponses(state) {
    return state.surveyResponses
  },
  fetchResponsesFromDB(state) {
    return state.fetchResponses
  },
  fetchMappedResponses(state) {
    return state.mapResponses
  },
  fetchPossibleSelections(state) {
    return state.possibleResponses
  },
}
