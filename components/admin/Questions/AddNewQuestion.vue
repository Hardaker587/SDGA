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
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'AddNewQuestion',
  data() {
    return {
      dialog: false,
    }
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
