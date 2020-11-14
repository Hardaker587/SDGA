<template>
  <v-container>
    <v-form>
      <v-text-field outlined label="Question" v-model="question"></v-text-field>
      <v-btn @click="writeToRealtimeDb">Add Question</v-btn>
      <v-btn @click="newMethod">Get Question</v-btn>
    </v-form>
    <v-list dense>
      <v-subheader>Questions</v-subheader>
      <v-text-field
        outlined
        :label="question.question"
        v-for="(question, index) in questions"
        :key="index"
        v-model="question.question"
        append-outer-icon="mdi-send"
        @click:append-outer="updatequestion(index, question.question)"
      ></v-text-field>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: 'Questions',
  data() {
    return {
      question: '',
      questions: [],
    }
  },
  mounted() {
    this.newMethod()
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
