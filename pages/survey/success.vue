<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card
          width="100%"
          height="85vh"
          class="d-flex flex-column justify-center align-center"
        >
          <v-img
            width="300px"
            height="300px"
            max-width="300px"
            max-height="300px"
            src="/images/branding/Main_logo.svg"
            id="main_logo"
            class="mb-4"
          ></v-img>
          <div class="text-h4 font-weight-bold">Thank you!</div>
          <div>
            Thank you for taking the time to complete the survey, your answers
            are greatly appreciated
          </div>
          <v-btn class="error mt-4" @click="userLogOut">Log out</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'success',
  methods: {
    ...mapMutations({
      logOut: 'user/LOG_OUT',
    }),
    async userLogOut() {
      try {
        await this.$fire.auth.signOut()
        this.logOut()
        await this.$router.push('/')
      } catch (e) {
        alert(e)
      }
    },
  },
}
</script>
