<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text color="primary" dark v-bind="attrs" v-on="on">
        Forgot password?
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline grey lighten-2">
        Password reset
      </v-card-title>
      <v-card-text>
        Please enter the email address belonging to your account, if the account
        exists you will receive an email with instructions on how to reset your
        password
        <v-text-field
          v-model="email"
          label="Email address"
          type="email"
          outlined
          class="mt-2"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="reset" :disabled="email === ''">
          Reset password
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'resetPassword',
  data() {
    return {
      email: '',
    }
  },
  methods: {
    async reset() {
      try {
        await this.$fire.auth.sendPasswordResetEmail(this.email).then(
          this.$alerts.showMessage({
            content: 'Please check your emails for a message',
            color: 'success',
          })
        )
      } catch (error) {
        // eslint-disable-next-line
        console.log(error)
      }
    },
  },
}
</script>
