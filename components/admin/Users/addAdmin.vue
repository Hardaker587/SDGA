<template>
  <v-container fluid>
    <v-row>
      <v-form>
        <v-row>
          <v-col cols="6">
            <v-text-field
              label="First Name"
              type="text"
              v-model="firstName"
              outlined
            ></v-text-field
          ></v-col>
          <v-col cols="6">
            <v-text-field
              label="Last Name"
              type="text"
              v-model="lastName"
              outlined
            ></v-text-field
          ></v-col>
          <v-col cols="6">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dob"
                  label="Date of Birth"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="dob"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="save"
              ></v-date-picker> </v-menu
          ></v-col>
          <v-col cols="6">
            <v-text-field
              label="City"
              type="text"
              v-model="city"
              outlined
            ></v-text-field
          ></v-col>
          <v-col cols="6">
            <v-select
              label="Province"
              v-model="province"
              outlined
              :items="provinces"
            ></v-select
          ></v-col>
          <v-col cols="6">
            <v-text-field
              label="Email Address"
              type="email"
              v-model="email"
              outlined
            ></v-text-field
          ></v-col>
          <v-col cols="6">
            <v-text-field
              label="Password"
              type="password"
              v-model="password"
              outlined
            ></v-text-field
          ></v-col>
        </v-row>
        <v-btn @click="addAdmin" block color="success"
          >Add new admin user</v-btn
        >
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AddAdmin',
  data() {
    return {
      user: null,
      date: null,
      menu: false,
      firstName: '',
      lastName: '',
      dob: '',
      university: '',
      city: '',
      province: '',
      email: '',
      password: '',
      provinces: [
        'Gauteng',
        'Western Cape',
        'Eastern Cape',
        'Northern Cape',
        'Mpumalanga',
        'Limpopo',
        'Free State',
        'North West',
        'Kwa-Zulu Natal',
      ],
    }
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date)
    },
    async addAdmin() {
      const admin = {
        role: {
          admin: true,
        },
      }
      await this.$fire.auth
        .createUserWithEmailAndPassword(
          this.email.toString().trim(),
          this.password.toString().trim()
        )
        .then((response) => {
          if (response) {
            const setAdmin = this.$fire.functions.httpsCallable('setAdmin')
            const data = { uid: response.user.uid, role: admin.role }
            setAdmin(data)
          }
        })
        .then(() => {
          const currentUser = this.$fire.auth.currentUser
          const messageRef = this.$fire.database.ref('users/' + currentUser.uid)
          try {
            messageRef
              .set({
                admin: true,
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                dateOfBirth: this.dob,
                university: this.university,
                city: this.city,
                province: this.province,
              })
              .then(
                this.$alerts.showMessage({
                  content: 'You have successfully added a new admin user',
                  color: 'success',
                })
              )
          } catch (e) {
            alert(e)
            return false
          }
        })
    },
  },
}
</script>
