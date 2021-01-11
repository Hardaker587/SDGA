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
            <v-select
              label="University"
              v-model="university"
              outlined
              :items="universities"
            ></v-select
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

        <v-btn @click="onSubmit(email, password)" color="success" block
          >Register</v-btn
        >
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Register',
  data: () => ({
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
    universities: [
      'University of Cape Town',
      'University of Fort Hare',
      'University of the Free State',
      'University of KwaZulu-Natal',
      'University of Limpopo',
      'North-West University',
      'University of Pretoria',
      'Rhodes University',
      'Sefako Makgatho Health Sciences University',
      'University of Stellenbosch',
      'University of the Western Cape',
      'University of the Witwatersrand',
      'UNISA',
    ],
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
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
  },
  methods: {
    async onSubmit(email, password) {
      try {
        await this.$fire.auth
          .createUserWithEmailAndPassword(
            email.toString().trim(),
            password.toString().trim()
          )
          .then(() => {
            const currentUser = this.$fire.auth.currentUser
            const messageRef = this.$fire.database.ref(
              'users/' + currentUser.uid
            )
            try {
              messageRef
                .set({
                  firstName: this.firstName,
                  lastName: this.lastName,
                  dateOfBirth: this.dob,
                  university: this.university,
                  city: this.city,
                  province: this.province,
                })
                .then(
                  this.$alerts.showMessage({
                    content: 'You have successfully registered',
                    color: 'success',
                  })
                )
            } catch (e) {
              alert(e)
              return false
            }
          })
      } catch (error) {
        // eslint-disable-next-line
        console.warn(error.message)
      }
    },
    save(date) {
      this.$refs.menu.save(date)
    },
  },
}
</script>
