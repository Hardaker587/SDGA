<template>
  <v-container>
    <v-row>
      <v-form>
        <v-text-field
          label="Email Address"
          type="email"
          :v-model="email"
          outlined
        ></v-text-field>
        <v-text-field
          label="Password"
          type="password"
          :v-model="password"
          outlined
        ></v-text-field>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
  import { mapMutations } from 'vuex'
export default {
  name: 'login',
  data: () => ({
    email: '',
    password: '',
  }),
  created() {
    this.$fire.auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        this.$fire.auth.currentUser.getIdTokenResult().then((tokenResult) => {
          console.log('🍎 ', tokenResult.claims)
        })
      }
    })
  },

  methods: {
    ...mapMutations({
      setAuth: 'user/SET_AUTH_USER'
    }),
    async onSubmit() {
      try {
        const { user } = await this.$fire.auth.signInWithEmailAndPassword(
          this.email,
          this.password
        ).then((r) => {
          this.setAuth(r)
        })
      } catch (error) {
        console.log('🤡', error)
      }
    },
  },
}
</script>
