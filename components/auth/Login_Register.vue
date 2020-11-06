<template>
  <div>
    <v-form v-if="!isLoggedIn">
      <div cols="4">
        <v-text-field
          v-model="formData.email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Email"
          type="email"
          autocomplete="username"
          label="Email Address"
          outlined
        />
      </div>
      <div cols="4">
        <v-text-field
          v-model="formData.password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Password"
          type="password"
          autocomplete="current-password"
          label="Password"
          outlined
        />
      </div>
      <v-btn @click="createUser">Register</v-btn>
      <v-btn @click="signInUser">Sign In</v-btn>
    </v-form>
    <div v-else>
      <p>You are logged in with {{ authUser.email }}.</p>
      <v-btn color="primary" outlined @click="logout">Logout</v-btn>
    </div>
    <client-only>
      <Codeblock>
        <pre>
async createUser() {
  try {
    await this.$fire.auth.createUserWithEmailAndPassword('foo@foo.foo', 'test')
  } catch (e) {
    alert(e)
  }
}
        </pre>
      </Codeblock>
    </client-only>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapGetters } from 'vuex'
export default Vue.extend({
  computed: {
    ...mapState({
      authUser: (state) => state.authUser,
    }),
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
    }),
  },
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
  methods: {
    async createUser() {
      try {
        await this.$fire.auth.createUserWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        )
      } catch (e) {
        alert(e)
      }
    },
    async signInUser() {
      try {
        await this.$fire.auth.signInWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        )
      } catch (e) {
        alert(e)
      }
    },
    async logout() {
      try {
        await this.$fire.auth.signOut()
      } catch (e) {
        alert(e)
      }
    },
  },
})
</script>
