<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          class="text-overline"
          width="90%"
        >
          New question
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Add New Question</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false"> Save </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="question"
                label="Question"
                outlined
              ></v-text-field>
              <v-select
                v-model="goal"
                label="Goals"
                outlined
                :items="getGoals"
                item-value="key"
              >
                <template slot="selection" slot-scope="data">
                  <!-- HTML that describe how select should render selected items -->
                  {{ data.item.sortOrder }}. {{ data.item.title }}
                </template>
                <template slot="item" slot-scope="data">
                  <!-- HTML that describe how select should render items when the select is open -->
                  {{ data.item.sortOrder }}. {{ data.item.title }}
                </template>
              </v-select>
              <v-select
                v-model="goalCategory"
                label="Goal Subcategory"
                :items="getCategoriesForGoal(goal)"
                item-value="key"
                item-text="title"
                outlined
              ></v-select>
              <v-select
                v-model="sortOrder"
                label="Sort Order"
                :items="questionCount"
                outlined
              ></v-select>
              <v-btn
                @click="
                  newQuestion({ question, goal, goalCategory, sortOrder })
                "
                >Add Question</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'AddNewQuestion',
  data() {
    return {
      dialog: false,
      question: '',
      goal: '',
      goalCategory: '',
      sortOrder: '',
    }
  },
  computed: {
    ...mapGetters({
      getGoals: 'questions/getGoals',
      getCategories: 'questions/getGoalCategories',
    }),
    questionCount(max) {
      max = 20
      return Array.from({ length: max }, (_, i) => i + 1)
    },
    itemTitle: (item) => {
      return item.sortOrder + '. ' + item.title
    },
  },
  methods: {
    ...mapActions({
      newQuestion: 'questions/writeNewQuestions',
    }),
    getCategoriesForGoal(goal) {
      return this.getCategories.filter((c) => c.goal === goal)
    },
  },
}
</script>
