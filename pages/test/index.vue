<template>
  <v-container>
    <v-row>
      <h1>This page is highly experimental right now, this is a test site</h1>
    </v-row>
    <v-row>
      <v-col col="6"><register></register></v-col>
      <v-col col="6"><add-admin></add-admin></v-col>
    </v-row>
    <v-row>
      <v-col cols="6"><add-user></add-user></v-col>
      <v-col cols="6"><login></login></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Login from '@/components/auth/login'
import AddUser from '@/components/admin/Users/addUser'
import Register from '~/components/auth/register'
import AddAdmin from '~/components/admin/Users/addAdmin'
export default {
  name: 'index',
  components: { Login, AddUser, AddAdmin, Register },
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
    }),
  },
}
</script>
