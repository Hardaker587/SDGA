<template>
  <v-container>
    <v-row>
      <v-form>
        <v-text-field
          v-model="addUser.email"
          placeholder="Email"
          type="email"
          autocomplete="username"
          label="Email Address"
          outlined
        />
        <v-text-field
          v-model="addUser.password"
          placeholder="Password"
          type="password"
          autocomplete="current-password"
          label="Password"
          outlined
        />
        <v-btn @click="onSubmit">Add User</v-btn>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AddUser',
  data: () => ({
    addUser: {
      email: '',
      password: '',
    },
  }),
  methods: {
    async onSubmit() {
      try {
        await this.$fire.auth.createUserWithEmailAndPassword(
          this.addUser.email,
          this.addUser.password
        )
      } catch (error) {
        // eslint-disable-next-line
        console.warn(error.message)
      }
    },
  },
}
</script>
