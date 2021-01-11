<template>
  <div class="row">
    <v-col cols="3" v-for="(card, index) in cards" :key="index">
      <v-card>
        <v-card-title>{{ card.name }}</v-card-title>
        <v-card-text class="text-h4 text-right font-weight-bold">{{
          card.value
        }}</v-card-text>
      </v-card>
    </v-col>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Index',
  data() {
    return {
      cards: [
        { name: 'Total Surveys Completed', value: '0' },
        { name: 'Surveys completed today', value: '0' },
        { name: 'Total Questions', value: '0' },
        { name: 'Total goals', value: '0' },
      ],
    }
  },
  computed: {
    ...mapGetters({
      fetchResponses: 'survey/fetchResponsesFromDB',
    }),
  },
  mounted() {
    this.fetchSurveyResponses()
  },
  methods: {
    ...mapActions({
      fetchSurveyResponses: 'survey/fetchSurveyResponses',
    }),
  },
}
</script>
