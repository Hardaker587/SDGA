<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on"> New Goal </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Add New Goal</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false"> Save </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
          <v-row>
            <v-col cols="6">
              <div class="text-h5">Add new goal</div>
              <v-select
                v-model="sortOrder"
                :items="goalCount"
                label="Goal Number"
                outlined
              ></v-select>
              <v-text-field
                v-model="title"
                outlined
                label="Goal Title"
              ></v-text-field>
              <v-btn @click="addNewGoal({ sortOrder, title })">Add Goal</v-btn>
            </v-col>
            <v-col cols="6">
              <div class="text-h5">Current goals</div>
              <v-text-field
                v-for="existingGoal in getGoals"
                :key="existingGoal.index"
                v-model="existingGoal.title"
                disabled
                outlined
                :label="'Goal ' + existingGoal.sortOrder"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'AddNewGoal',
  data() {
    return {
      dialog: false,
      sortOrder: '',
      title: '',
    }
  },
  computed: {
    goalCount(max) {
      max = 17
      return Array.from({ length: max }, (_, i) => i + 1)
    },
    ...mapGetters({
      getGoals: 'questions/getGoals',
    }),
  },
  mounted() {
    this.$store.dispatch('questions/fetchGoals')
  },
  methods: {
    ...mapActions({
      addNewGoal: 'questions/newGoal',
    }),
  },
}
</script>
