<template>
  <v-container>
    <v-row>
      <v-form>
        <v-row>
          <v-col cols="6">
            <v-text-field
              label="Email Address"
              type="email"
              :v-model="email"
              outlined
            ></v-text-field
          ></v-col>
          <v-col cols="6">
            <v-text-field
              label="Password"
              type="password"
              :v-model="password"
              outlined
            ></v-text-field
          ></v-col>
        </v-row>

        <v-btn @click="onSubmit">Register</v-btn>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Register',
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
        // eslint-disable-next-line
        console.warn(error.message)
      }
    },
  },
}
</script>
