<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <LoginRegister></LoginRegister>
    </v-col>
  </v-row>
</template>

<script>
import LoginRegister from '~/components/auth/Login_Register'
export default {
  components: {
    LoginRegister,
  },
}
</script>
