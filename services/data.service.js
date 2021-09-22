export class DataService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {}
  /**
   * Generates an object output based on data provided
   * @param {string} goalId - GUID of goal being referenced.
   * @param {array} goals - Pass all goals in and filter.
   * @param {array} categories - Pass all categories in and filter.
   * @param {array} questions - Pass in all questions and filter.
   * @param {array} responses - Pass in all responses and filter.
   * @returns {object} - Returns an object containing the filtered results of the above params
   */
  GoalData(goalId, goals, categories, questions, responses) {
    const goal = goals.find((goal) => goal.key === goalId)
    const goalCategories = categories.filter(
      (category) => category.goal === goalId
    )
    /* Add questions to categories */
    goalCategories.forEach((gc) => {
      gc.questions = questions.filter((q) => q.goalCategory === gc.key)
    })
    /* Add responses to questions in categories */
    goalCategories.forEach((gc) => {
      gc.questions.forEach((gcq) => {
        gcq.responses = responses.filter((r) => r.questionId === gcq.key)
      })
    })
    /* Get questions for goal */
    const goalQuestions = questions.filter(
      (question) => question.goal === goalId
    )
    /* Add responses to questions */
    goalQuestions.forEach((gq) => {
      gq.responses = responses.filter((r) => r.questionId === gq.key)
    })
    /* Get responses for goal */
    const goalResponses = []
    goalQuestions.forEach((question) => {
      const questionResponses = responses.filter(
        (response) => response.questionId === question.key
      )
      goalResponses.push(...questionResponses)
    })

    return {
      goalId,
      goal,
      categories: goalCategories,
      questions: goalQuestions,
      responses: goalResponses,
    }
  }

  /**
   * Generates an object output based on data provided
   * @param {string} questionId - GUID of question being referenced.
   * @param {array} questions - Pass in all questions and filter.
   * @param {array} responses - Pass in all responses and filter.
   * @returns {object} - Returns an object containing the filtered results of the above params
   */
  QuestionData(questionId, questions, responses) {
    const question = questions.find((q) => q.key === questionId)
    const questionResponses = responses.filter((r) => r.question === questionId)

    return {
      questionId,
      question,
      responses: questionResponses,
    }
  }
}
