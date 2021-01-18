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
          New Goal Category
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Add New Goal Category</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container>
          <v-row>
            <v-col cols="12">
              <div class="text-h5">Add new goal category</div>
              <v-text-field
                v-model="title"
                outlined
                label="Category title"
              ></v-text-field>
              <v-select
                v-model="goal"
                label="Goals"
                outlined
                :items="getGoals"
                item-value="key"
              >
                <template slot="selection" slot-scope="data">
                  <!-- HTML that describe how select should render selected items -->
                  {{ data.item.sortOrder }}. {{ data.item.title }}
                </template>
                <template slot="item" slot-scope="data">
                  <!-- HTML that describe how select should render items when the select is open -->
                  {{ data.item.sortOrder }}. {{ data.item.title }}
                </template>
              </v-select>
              <v-select
                outlined
                :items="categorySortOrder"
                v-model="sortOrder"
                label="Sort Order"
              ></v-select>
              <v-btn
                color="success"
                @click="addNewGoalCategory({ sortOrder, title, goal })"
                >Add Goal Category</v-btn
              >
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
  name: 'AddNewGoalCategory',
  data() {
    return {
      dialog: false,
      title: '',
      goal: '',
      sortOrder: '',
    }
  },
  computed: {
    categorySortOrder(max) {
      max = 17
      return Array.from({ length: max }, (_, i) => i + 1)
    },
    ...mapGetters({
      getGoals: 'questions/getGoals',
      getGoalCategories: 'questions/getGoalCategories',
    }),
  },
  methods: {
    ...mapActions({
      addNewGoalCategory: 'questions/newGoalCategory',
    }),
  },
}
</script>

<style scoped></style>
