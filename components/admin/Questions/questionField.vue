<template>
  <v-form class="d-flex">
    <v-text-field
      :label="label"
      v-model="questionModel"
      :disabled="disabledField"
      outlined
      rounded
      class="mr-4"
    >
    </v-text-field>
    <v-btn fab color="grey-darken" dark @click="toggleEdit"
      ><v-icon>{{ disabledField ? 'mdi-pencil' : 'mdi-check' }}</v-icon></v-btn
    >
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'questionField',
  data() {
    return {
      questionModel: '',
      disabledField: true,
    }
  },
  props: {
    label: { type: String, required: true, default: 'Question' },
    question: { type: String, required: true, default: 'Question' },
    questionId: { type: String, required: true, default: '' },
  },
  mounted() {
    this.returnQuestion()
  },
  methods: {
    ...mapActions({
      updateQuestion: 'questions/updateQuestion',
    }),
    returnQuestion() {
      this.questionModel = this.question
    },
    toggleEdit() {
      this.disabledField = !this.disabledField
      if (this.questionModel !== this.question) {
        console.log(this.questionId)
        this.updateQuestion({
          questionId: this.questionId,
          question: this.questionModel,
        })
      }
    },
  },
}
</script>
