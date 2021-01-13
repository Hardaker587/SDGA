<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-form>
          <v-text-field
            v-model="adminEmail"
            label="Email Address"
            type="email"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="adminPassword"
            label="Password"
            type="password"
            outlined
          ></v-text-field>
          <v-btn @click="addAdmin(adminEmail, adminPassword)" color="success"
            >Add new admin user</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AddAdmin',
  data() {
    return {
      adminEmail: '',
      adminPassword: '',
      user: null,
    }
  },
  methods: {
    async addAdmin(email, password) {
      const admin = {
        role: {
          admin: true,
        },
      }
      await this.$fire.auth
        .createUserWithEmailAndPassword(
          email.toString().trim(),
          password.toString().trim()
        )
        .then((response) => {
          if (response) {
            const setAdmin = this.$fire.functions.httpsCallable('setAdmin')
            const data = { uid: response.user.uid, role: admin.role }
            setAdmin(data)
          }
        })
    },
  },
}
</script>
