<template>
  <v-container>
    <v-row>
      <v-form>
        <v-text-field
          v-model="login.email"
          placeholder="Email"
          type="email"
          autocomplete="username"
          label="Email Address"
          outlined
        />
        <v-text-field
          v-model="login.password"
          placeholder="Password"
          type="password"
          autocomplete="current-password"
          label="Password"
          outlined
        />
        <v-btn @click="onSubmit">Login</v-btn>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data: () => ({
    login: {
      email: '',
      password: '',
    },
  }),
  created() {
    this.$fire.auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        this.$fire.auth.currentUser.getIdTokenResult().then((tokenResult) => {
          if (tokenResult.claims.admin) {
            this.$router.push('/admin')
            this.setAdmin(true)
          } else if (tokenResult.claims.surveyor) {
            this.$router.push('/survey')
            this.setAdmin(false)
          } else {
            this.$router.push('/')
            this.setAdmin(false)
          }
        })
      }
    })
  },

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
