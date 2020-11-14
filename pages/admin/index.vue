<template>
  <div class="row">
    <div class="col-sm-4 off-set">
      <v-form>
        <div class="form-group">
          <v-text-field
            v-model="email"
            label="Email Address"
            placeholder="Email"
            type="email"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            placeholder="Password"
            type="password"
            required
          ></v-text-field>
        </div>
        <div class="form-group"></div>
        <v-btn type="submit" class="success" @click="onSubmit"
          >Register Admin</v-btn
        >
      </v-form>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'
export default {
  name: 'RegisterAdmin',
  data() {
    return {
      name: '',
      phone: '',
      email: '',
      password: '',
      user: null,
    }
  },
  methods: {
    async createUser() {
      try {
        await this.$fire.auth
          .createUserWithEmailAndPassword(
            this.formData.email,
            this.formData.password
          )
          .then((r) => {
            console.log(r)
          })
      } catch (e) {
        alert(e)
      }
    },
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
        .catch((error) => {
          // Handle Errors here.
          console.log('🤡', error.message)
        })
    },
  },
}
</script>
