<template>
  <v-container fluid>
    <v-row>
      <v-item-group v-model="window" class="shrink mr-6" mandatory tag="v-flex">
        <v-item
          v-for="goal in goals"
          :key="goal.key"
          v-slot="{ active, toggle }"
        >
          <div>
            <v-btn :input-value="active" icon @click="toggle">
              <v-img
                height="35px"
                max-width="35px"
                :src="
                  parseImageSource(
                    'Goal_' + goal.sortOrder,
                    '/images/goals/',
                    'svg'
                  )
                "
              ></v-img>
            </v-btn>
          </div>
        </v-item>
      </v-item-group>

      <v-col class="pa-0">
        <v-window v-model="window" class="elevation-1" vertical>
          <v-window-item v-for="goal in goals" :key="goal.key">
            <v-card flat class="pa-4">
              <v-card-text>
                <v-row align="center">
                  <v-img
                    height="40px"
                    max-width="40px"
                    class="mr-4"
                    :src="
                      parseImageSource(
                        'Goal_' + goal.sortOrder,
                        '/images/goals/',
                        'svg'
                      )
                    "
                  ></v-img>
                  <strong class="title"
                    >{{ goal.sortOrder }}. {{ goal.title }}</strong
                  >
                  <v-spacer></v-spacer>
                  <v-btn
                    v-if="window !== 0"
                    @click="window--"
                    class="mr-2"
                    dark
                    :color="goal.color"
                    ><v-icon>mdi-chevron-left</v-icon></v-btn
                  >
                  <v-btn
                    @click="window === 16 ? window-- : window++"
                    dark
                    :color="goal.color"
                    ><v-icon>
                      {{
                        window === 16 ? 'mdi-chevron-left' : 'mdi-chevron-right'
                      }}
                    </v-icon></v-btn
                  >
                </v-row>
                <v-row
                  v-if="getCategoriesForGoal(goal.key).length > 0"
                  class="d-flex flex-column"
                >
                  <v-row dense align="center">
                    <v-col cols="5" class="font-weight-bold">Question</v-col>
                    <v-col cols="7" class="font-weight-bold">Indicators</v-col>
                  </v-row>
                  <div
                    class="mb-2"
                    v-for="(goalCategory, index) in getCategoriesForGoal(
                      goal.key
                    )"
                    :key="index"
                  >
                    <div class="font-weight-bold">
                      {{ goalCategory.title }}
                    </div>
                    <Question
                      v-for="question in getQuestionsForCategory(
                        goalCategory.key
                      )"
                      :key="question.key"
                      :question="question.question"
                      :question-id="question.key"
                      :color="goal.color"
                    ></Question>
                  </div>
                </v-row>
                <v-row v-else>There are no questions for this goal</v-row>
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import Question from '~/components/survey/Question'
export default {
  name: 'Goal',
  components: { Question },
  props: {
    goals: { type: Array, required: true, default: () => [] },
    goalCategories: { Array, required: true, default: () => [] },
    questions: { type: Array, required: true, default: () => [] },
  },
  data() {
    return {
      length: 3,
      window: 0,
    }
  },
  methods: {
    ...mapActions({
      captureResponse: 'survey/captureResponse',
    }),
    getCategoriesForGoal(goal) {
      return this.goalCategories.filter((c) => c.goal === goal)
    },
    getQuestionsForCategory(goalCategory) {
      return this.questions.filter((c) => c.goalCategory === goalCategory)
    },
    parseImageSource(image, path, type) {
      return path + image + '.' + type
    },
    sendResponse(selection, questionId) {
      alert(selection + ' ' + questionId)
    },
  },
}
</script>
