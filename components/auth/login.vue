<template>
  <v-container fluid>
    <v-row>
      <v-form style="width: 100%">
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="login.email"
              placeholder="Email"
              type="email"
              autocomplete="username"
              label="Email Address"
              outlined
          /></v-col>
          <v-col cols="6">
            <v-text-field
              v-model="login.password"
              placeholder="Password"
              type="password"
              autocomplete="current-password"
              label="Password"
              outlined
          /></v-col>
        </v-row>
        <ResetPassword />
        <v-btn @click="onSubmit" color="success" block>Login</v-btn>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import ResetPassword from '~/components/auth/resetPassword'
export default {
  name: 'Login',
  components: { ResetPassword },
  data: () => ({
    login: {
      email: '',
      password: '',
    },
  }),
  methods: {
    ...mapMutations({
      setAuth: 'user/SET_AUTH_USER',
      setAdmin: 'user/SET_ADMIN',
    }),
    async onSubmit() {
      try {
        await this.$fire.auth
          .signInWithEmailAndPassword(this.login.email, this.login.password)
          .then((r) => {
            this.setAuth(r)
          })
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    },
  },
}
</script>
