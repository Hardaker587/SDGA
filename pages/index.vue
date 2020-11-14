<template>
  <v-row justify="center" align="center">
    <v-col cols="6">
      <v-img :src="require('../assets/Images/sdga.jpg')"></v-img>
    </v-col>
    <v-col cols="6" class="flex-column">
      <h3>Please register to proceed</h3>
      <v-card class="pa-4 mb-2 mt-2">
        <register></register>
      </v-card>
      <h3>or please log in to proceed</h3>
      <v-card class="pa-4 mb-2 mt-2">
        <login></login>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Register from '@/components/auth/register'
import Login from '@/components/auth/login'
export default {
  components: { Login, Register },
}
</script>
