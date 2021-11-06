export class DataService {
  constructor(store) {
    this.store = store
  }

  // Note: need to create group services i.e return totals by goal, totals by category etc

  /**
   * Groups data based on key provided
   * @param {array} ObjectArray - Array of objects that needs to be grouped.
   * @param {string} Property - Property to group array on.
   * @returns {object} - Returns an object containing the filtered results of the above params
   */
  GroupBy(ObjectArray, Property) {
    return ObjectArray.reduce(function (accumulator, currentObject) {
      const key = currentObject[Property]
      if (!accumulator[key]) {
        accumulator[key] = []
      }
      accumulator[key].push(currentObject)
      return accumulator
    }, {})
  }

  /**
   * Groups data based on nested key provided
   * @param {array} ObjectArray - Array of objects that needs to be grouped.
   * @param {string} Property - Nested Property to group array on.
   * @returns {object} - Returns an object containing the filtered results of the above params
   */
  NestedGroupBy(ObjectArray, Property) {
    const hash = {}
    const props = Property.split('.')
    for (let i = 0; i < ObjectArray.length; i++) {
      const key = props.reduce(function (acc, prop) {
        return acc && acc[prop]
      }, ObjectArray[i])
      if (!hash[key]) hash[key] = []
      hash[key].push(ObjectArray[i])
    }
    return hash
  }

  /**
   * Generates counts based on object of arrays passed in
   * @param {object} ObjectArray Object of arrays
   * @returns {array} Array of objects with key and totals
   */
  ObjectArrayTotals(ObjectArray) {
    const output = []
    Object.entries(ObjectArray).forEach(([key, value]) => {
      output.push({ key, total: value.length })
    })
    return output
  }

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
    /* Filter out the goal */
    const goal = goals.find((goal) => goal.key === goalId)
    /* Filter out the goal categories */
    const goalCategories = categories.filter(
      (category) => category.goal === goalId
    )
    /* Add questions to categories */
    goalCategories.forEach((gc) => {
      gc.questions = questions.filter((q) => q.goalCategory === gc.key)
    })
    /* Add responses to questions in categories, as well as their grouped types */
    goalCategories.forEach((gc) => {
      gc.responses = []
      gc.questions.forEach((gcq) => {
        gcq.responses = responses.filter((r) => r.questionId === gcq.key)
        gc.responses.push(...responses.filter((r) => r.questionId === gcq.key))
        gcq.responseTypeTotals = this.NestedGroupBy(
          gcq.responses,
          'selection.value'
        )
      })
      gc.responseTypeTotals = this.NestedGroupBy(
        gc.responses,
        'selection.value'
      )
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
    /* Generate group totals for response types */
    let responseTypeTotals = this.NestedGroupBy(
      goalResponses,
      'selection.value'
    )
    responseTypeTotals = Object.entries(responseTypeTotals).map(
      ([key, response]) => response.length
    )
    return {
      goalId,
      goal,
      categories: goalCategories,
      questions: goalQuestions,
      responses: goalResponses,
      responseTypeTotals,
    }
  }

  CategoryData(categoryId, categories, questions, responses) {
    const category = categories.find((category) => category.key === categoryId)
    const categoryQuestions = questions.filter(
      (question) => question.goalCategory === categoryId
    )
    const categoryResponses = []
    categoryQuestions.forEach((cq) => {
      const cqResponses = responses.filter((r) => {
        return r.questionId === cq.key
      })
      categoryResponses.push(...cqResponses)
    })

    let responseTypeTotals = this.NestedGroupBy(
      categoryResponses,
      'selection.value'
    )
    responseTypeTotals = Object.entries(responseTypeTotals).map(
      ([key, response]) => response.length
    )

    return {
      category,
      categoryQuestions,
      categoryResponses,
      responseTypeTotals,
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
    const questionResponses = responses.filter(
      (r) => r.questionId === questionId
    )

    let responseTypeTotals = this.NestedGroupBy(
      questionResponses,
      'selection.value'
    )
    responseTypeTotals = Object.entries(responseTypeTotals).map(
      ([key, response]) => response.length
    )

    return {
      questionId,
      question,
      responses: questionResponses,
      responseTypeTotals,
    }
  }

  /**
   * Generates object of arrays of selection groups
   * @param {array} Responses
   * @param {string} GroupingProperty
   * @param {boolean} [returnTotals] - Determines whether or not the total counts should be returned or not
   * @returns {object} Object of arrays containing total counts by common denominator
   */
  SelectionGroup(Responses, GroupingProperty, returnTotals) {
    return returnTotals
      ? this.ObjectArrayTotals(this.NestedGroupBy(Responses, GroupingProperty))
      : this.NestedGroupBy(Responses, GroupingProperty)
  }
}
