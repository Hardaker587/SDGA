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
        <v-btn @click="onSubmit">Register</v-btn>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'register',
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    async onSubmit() {
      try {
        await this.$fire.auth.createUserWithEmailAndPassword(
          this.email,
          this.password
        )
      } catch (error) {
        console.log('🤡', error.message)
      }
    },
  },
}
</script>
