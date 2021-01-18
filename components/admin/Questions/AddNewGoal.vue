<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
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
          New Goal
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Add New Goal</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container>
          <v-row>
            <v-row>
              <v-col cols="12"><div class="text-h5">Add new goal</div></v-col>
              <v-col cols="5"
                ><v-select
                  v-model="sortOrder"
                  :items="goalCount"
                  label="Goal Number"
                  outlined
                  dense
                ></v-select
              ></v-col>
              <v-col cols="5"
                ><v-text-field
                  v-model="title"
                  outlined
                  label="Goal Title"
                  dense
                ></v-text-field
              ></v-col>
              <v-col cols="2"
                ><v-btn
                  @click="addNewGoal({ sortOrder, title })"
                  block
                  color="success"
                  dark
                  >Add Goal</v-btn
                ></v-col
              >
            </v-row>
            <v-col cols="12"><div class="text-h5">Current goals</div></v-col>
            <v-col
              cols="6"
              v-for="existingGoal in getGoals"
              :key="existingGoal.index"
            >
              <v-text-field
                v-model="existingGoal.title"
                append-icon="mdi-pencil"
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
      editing: false,
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
  methods: {
    ...mapActions({
      addNewGoal: 'questions/newGoal',
    }),
  },
}
</script>
