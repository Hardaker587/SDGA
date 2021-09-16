export class DataService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {}
  generateORM(goalId, goals, categories, questions) {
    console.log('executing')
    const goal = goals.find((goal) => goal.key === goalId)
    const goalCategories = categories.filter(
      (category) => category.goal === goalId
    )
    const goalQuestions = questions.filter(
      (question) => question.goal === goalId
    )

    return {
      goalId,
      goal,
      categories: goalCategories,
      questions: goalQuestions,
    }
  }
}
