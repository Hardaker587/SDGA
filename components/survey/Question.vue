<template>
  <v-row align="center" class="question"
    ><v-col cols="5">{{ question }}</v-col>
    <v-col cols="7">
      <v-radio-group v-model="radioGroup" row mandatory>
        <v-radio
          v-for="selection in radioSelections"
          :key="selection.value"
          :value="selection.value"
          :color="color"
          @change="captureResponse(selection.value, questionId)"
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
  data() {
    return {
      radioGroup: 'X',
      radioSelections: [
        { value: 'X', text: "Don't know" },
        { value: '0', text: 'None' },
        { value: '1', text: 'A little' },
        { value: '2', text: 'Adequate' },
        { value: '3', text: 'Substantial' },
        { value: '4', text: 'A great deal' },
      ],
      selectedOption: '',
    }
  },
  props: {
    question: { type: String, required: true, default: '' },
    questionId: { type: String, required: true, default: '' },
    color: { type: String, required: false, default: 'primary' },
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
    }),
  },
  methods: {
    ...mapActions({
      captureResponse: 'survey/captureResponse',
    }),
  },
}
</script>

<style scoped lang="scss">
.question {
  border-bottom: 1px solid #ccc;
}
</style>
