<template>
  <v-card flat>
    <v-toolbar flat color="grey" class="mb-2" dark>
      <v-toolbar-title>Questions</v-toolbar-title>
    </v-toolbar>
    <v-tabs dark>
      <v-tab
        v-for="(goal, index) in goals"
        :key="index"
        :style="'background:' + goal.color"
      >
        <v-img
          class="mr-2"
          :src="'/images/goals/Goal_' + goal.sortOrder + '.svg'"
          width="15px"
          height="15px"
        ></v-img>
        Goal {{ goal.sortOrder }}
      </v-tab>

      <v-tab-item v-for="(goal, index) in goals" :key="index" class="mt-2">
        <v-card
          flat
          class="pa-4"
          :style="`background-image: linear-gradient(${goal.color},white)`"
        >
          <v-row class="ma-2" align="center">
            <v-img
              class="mr-2"
              :src="'/images/goals/Goal_' + goal.sortOrder + '.svg'"
              width="75px"
              max-width="75px"
              height="75px"
            ></v-img>
            <div class="text-h6 white--text">
              {{ goal.sortOrder }}. {{ goal.title }}
            </div>
          </v-row>
          <v-row class="pa-4"
            ><v-expansion-panels>
              <v-expansion-panel
                v-for="(category, index) in getCategoriesForGoal(goal.key)"
                :key="index"
              >
                <v-expansion-panel-header
                  >{{ category.title }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-form>
                    <v-text-field
                      v-for="(question, index) in getQuestionsForCategory(
                        category.key
                      )"
                      :key="index"
                      :label="'Question' + question.sortOrder"
                      v-model="question.question"
                      disabled
                    ></v-text-field>
                  </v-form>
                </v-expansion-panel-content>
              </v-expansion-panel> </v-expansion-panels
          ></v-row>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
export default {
  name: 'Questions',
  data() {
    return {}
  },
  props: {
    goals: { type: Array, default: () => [] },
    goalCategories: { type: Array, default: () => [] },
    questions: { type: Array, default: () => [] },
  },
  methods: {
    getCategoriesForGoal(goal) {
      return this.goalCategories.filter((c) => c.goal === goal)
    },
    getQuestionsForCategory(goalCategory) {
      return this.questions.filter((c) => c.goalCategory === goalCategory)
    },
  },
}
</script>
