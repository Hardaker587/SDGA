<template>
  <v-container>
    <v-row>
      <h1>This page is highly experimental right now, this is a test site</h1>
      <v-col col="6"><register></register></v-col>
      <v-col col="6"><add-admin></add-admin></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Register from '~/components/auth/register'
import AddAdmin from '~/components/admin/Users/addAdmin'
export default {
  name: 'index',
  components: { AddAdmin, Register },
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
    }),
  },
}
</script>
