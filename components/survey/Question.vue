<template>
  <v-row align="center" class="question"
    ><v-col :cols="this.$vuetify.breakpoint.xs ? 12 : 5">{{ question }}</v-col>
    <v-col :cols="this.$vuetify.breakpoint.xs ? 12 : 7">
      <v-radio-group v-model="radioGroup" row mandatory>
        <v-radio
          v-for="selection in fetchPossibleSelections"
          :key="selection.value"
          :value="selection"
          :color="color"
          @change="
            captureResponse({
              ...selection,
              questionId,
              question,
              categoryId,
              goalId,
            })
          "
        >
          <template v-slot:label>
            <div class="text-caption">
              {{ selection.value }}. {{ selection.text }}
            </div>
          </template>
        </v-radio>
      </v-radio-group>
    </v-col></v-row
  >
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Question',
  props: {
    goalId: { type: String, required: true, default: '' },
    categoryId: { type: String, required: true, default: '' },
    question: { type: String, required: true, default: '' },
    questionId: { type: String, required: true, default: '' },
    color: { type: String, required: false, default: 'primary' },
  },
  data() {
    return {
      radioGroup: '',
      selectedOption: '',
    }
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
      fetchPossibleSelections: 'survey/fetchPossibleSelections',
    }),
  },
  created() {
    this.captureResponse({
      ...this.fetchPossibleSelections[this.getRandomInt(0, 5)],
      questionId: this.questionId,
      question: this.question,
      categoryId: this.categoryId,
      goalId: this.goalId,
    })
  },
  methods: {
    ...mapActions({
      captureResponse: 'survey/captureResponse',
    }),
    getRandomInt(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min)) + min
    },
  },
}
</script>

<style scoped lang="scss">
.question {
  border-bottom: 1px solid #ccc;
}
</style>
