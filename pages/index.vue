<template>
  <v-row justify="center" align="center">
    <v-col cols="6" class="pa-4 d-flex justify-center">
      <v-img
        width="500px"
        height="500px"
        max-width="500px"
        max-height="500px"
        src="/images/branding/Main_logo.svg"
        id="main_logo"
      ></v-img>
    </v-col>
    <v-col cols="6" class="flex-column">
      <h3>Please register</h3>
      <v-card flat class="pa-2 mb-2 mt-2">
        <register></register>
      </v-card>
      <h3>or if you have an account, log in</h3>
      <v-card flat class="pa-2 mb-2 mt-2">
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

<style scoped lang="scss">
#main_logo {
  -webkit-animation-name: rotate;
  -webkit-animation-duration: 15s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  -moz-animation-name: rotate;
  -moz-animation-duration: 15s;
  -moz-animation-iteration-count: infinite;
  -moz-animation-timing-function: linear;
}

@-webkit-keyframes rotate {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}

@-moz-keyframes rotate {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(360deg);
  }
}
</style>
