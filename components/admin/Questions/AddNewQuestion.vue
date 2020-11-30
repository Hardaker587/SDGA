<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
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
                :items="mapArray()"
                item-text="title"
              ></v-select>
              <v-select
                v-model="sortOrder"
                label="Sort Order"
                :items="questionCount"
                outlined
              ></v-select>
              <v-btn @click="newQuestion({ question, goal, sortOrder })"
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
      sortOrder: '',
    }
  },
  computed: {
    ...mapGetters({
      getGoals: 'questions/getGoals',
    }),
    questionCount(max) {
      max = 20
      return Array.from({ length: max }, (_, i) => i + 1)
    },
  },
  mounted() {
    this.mapArray()
  },
  methods: {
    ...mapActions({
      newQuestion: 'questions/writeNewQuestions',
    }),
    mapArray() {
      return this.$utilities.convertArray(this.getGoals)
    },
    async newMethod() {
      const data = this.$fire.database.ref('survey')
      try {
        await data
          .once('value', (r) => (this.questions = r.val()))
          .then(function (snapshot) {
            // eslint-disable-next-line
            console.log(snapshot.val())
          })
      } catch (e) {
        alert(e)
      }
    },
  },
}
</script>
