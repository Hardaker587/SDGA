<template>
  <v-container>
    <v-form>
      <v-text-field v-model="question" outlined label="Question"></v-text-field>
      <v-btn @click="writeToRealtimeDb">Add Question</v-btn>
    </v-form>
    <v-list dense>
      <v-subheader>Questions</v-subheader>
      <v-form v-for="(returnedQuestion, index) in getQuestions" :key="index">
        <v-text-field
          v-model="returnedQuestion.question"
          outlined
          :label="returnedQuestion.question"
          append-outer-icon="mdi-send"
          @click:append-outer="updatequestion(index, returnedQuestion.question)"
        ></v-text-field>
      </v-form>
    </v-list>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Questions',
  data() {
    return {
      question: '',
      questions: [],
    }
  },
  computed: {
    ...mapGetters({
      getQuestions: 'questions/getQuestions',
    }),
  },
  mounted() {
    this.$store.dispatch('questions/fetchQuestions')
  },
  methods: {
    async writeToRealtimeDb() {
      const messageRef = this.$fire.database.ref(
        'survey/' + this.$utilities.guid()
      )
      try {
        await messageRef
          .set({
            question: this.question,
            created: new Date(),
            edited: new Date(),
          })
          .then(this.newMethod)
      } catch (e) {
        alert(e)
        return
      }
      alert('Success.')
    },
    async readFromRealtimeDb() {
      const messageRef = this.$fire.firestore.collection('survey').doc('survey')
      try {
        const messageDoc = await messageRef.get()
        alert(messageDoc.data().message)
      } catch (e) {
        alert(e)
      }
    },
    async updatequestion(guid, newQuestion) {
      const messageRef = this.$fire.database.ref('survey/' + guid)
      try {
        await messageRef
          .update({
            question: newQuestion,
          })
          .then(this.newMethod)
      } catch (e) {
        alert(e)
        return
      }
      alert('Success.')
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
    enableField() {
      return (this.disabled = false)
    },
  },
}
</script>
