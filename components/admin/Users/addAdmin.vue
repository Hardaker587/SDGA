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
        <v-btn @click="onSubmit">Add new admin user</v-btn>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'addAdmin',
  data() {
    return {
      email: '',
      password: '',
      user: null,
    }
  },
  methods: {
    async onSubmit() {
      const admin = {
        role: {
          admin: true,
        },
      }
      await this.$fire.auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((response) => {
          if (response) {
            const setAdmin = this.$fire.functions.httpsCallable('setAdmin')
            const data = { uid: response.user.uid, role: admin.role }
            setAdmin(data).then((result) => {
              console.log(`index.js - 183 - "🎉"`, result)
            })
          }
        })
        .catch((error) => {
          // Handle Errors here.
          console.log('🤡', error.message)
        })
    },
  },
}
</script>
