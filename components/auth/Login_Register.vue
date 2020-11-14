<template>
  <div>
    <v-form v-if="!isLoggedIn">
      <v-col cols="4">
        <v-text-field
          v-model="formData.email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Email"
          type="email"
          autocomplete="username"
          label="Email Address"
          outlined
        />
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-model="formData.password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Password"
          type="password"
          autocomplete="current-password"
          label="Password"
          outlined
        />
      </v-col>
      <v-btn @click="createUser">Register</v-btn>
      <v-btn @click="signInUser">Sign In</v-btn>
    </v-form>
    <div v-else>
      <p>You are logged in with {{ authUser.email }}.</p>
      <v-btn color="primary" outlined @click="logout">Logout</v-btn>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default Vue.extend({
  // fetch() {
  //   // INFO -> this.$fire.auth user etc. are accessible
  //   // INFO -> this.$store.state.authUser is accessible even on server-side
  // },
  data: () => ({
    formData: {
      email: '',
      password: '',
    },
  }),
  computed: {
    ...mapState({
      authUser: (state) => state.user.authUser,
    }),
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
    }),
  },
  methods: {
    ...mapActions({
      changeAuthState: 'user/onAuthStateChanged',
    }),
    ...mapMutations({
      setAuth: 'user/SET_AUTH_USER',
      logOut: 'user/LOG_OUT',
    }),
    async createUser() {
      const admin = {
        role: {
          admin: true,
        },
      }
      try {
        await this.$fire.auth
          .createUserWithEmailAndPassword(
            this.formData.email,
            this.formData.password
          )
          .then((r) => {
            console.log(r)
            if (r) {
              const setAdmin = this.$fire.functions.httpsCallable('setAdmin')
              const data = { uid: r.user.uid, role: admin.role }
              setAdmin(data)
                .then((result) => {
                  console.log(`index.js - 183 - "🎉"`, result)
                })
                .then(() => {
                  this.$fire.auth.signInWithEmailAndPassword(
                    this.email,
                    this.password
                  )
                })
            }
          })
      } catch (e) {
        alert(e)
      }
    },
    async signInUser() {
      try {
        await this.$fire.auth
          .signInWithEmailAndPassword(
            this.formData.email,
            this.formData.password
          )
          .then((r) => {
            // eslint-disable-next-line
            console.log(r)
            this.setAuth(r)
            this.changeAuthState(r)
          })
      } catch (e) {
        alert(e)
      }
    },
    async logout() {
      try {
        await this.$fire.auth.signOut()
        this.logOut()
      } catch (e) {
        alert(e)
      }
    },
  },
})
</script>
