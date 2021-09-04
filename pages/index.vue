<template>
  <v-row justify="center" align="center" class="loginContainer">
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
      <v-row dense>
        <v-col cols="12" class="mb-4" v-if="buttonDisplay">
          <div class="text-h5 font-weight-bold">
            Sustainable Development Goals Assessment Tool (SDGs AT)
          </div>
          The 2030 Agenda for Sustainable Development Goals (SDGs), adopted by
          all United Nations Member States in 2015, provides a shared blueprint
          for peace, prosperity and partnerships for people and the planet, now
          and into the future. At its heart are the 17 SDGs, which are an urgent
          call for action by all countries - developed and developing - in a
          global partnership. It is recognised that ending poverty and other
          deprivations must go hand-in-hand with strategies that improve health
          and education, reduce inequality, and spur economic growth – all while
          tackling climate change and working to preserve our oceans and
          forests. The 2030 Agenda has expanded the role of universities,
          colleges, and higher education institutions from teaching, research,
          organisational governance, and community outreach to catalyse the
          implementation of the SDGs. SDG4: Quality Education, puts universities
          at the core of SDGs implementation. The SDGs Assessment Tool will
          assist in collecting data for benchmarking, decision-making and
          reporting on how far they are from achieving SDGs. A Manual on the
          SDGs AT will assist to navigate the assessment tool.
        </v-col>
        <v-col cols="12" v-if="buttonDisplay">
          <h3>Please select an option</h3></v-col
        >
        <v-col cols="6" v-if="buttonDisplay"
          ><v-card
            @click="
              register = true
              buttonDisplay = false
            "
            class="text-h5 font-weight-bold text-center pa-2"
            color="success"
            dark
            >Register</v-card
          ></v-col
        >
        <v-col cols="6" v-if="buttonDisplay"
          ><v-card
            @click="
              login = true
              buttonDisplay = false
            "
            class="text-h5 font-weight-bold text-center pa-2"
            color="primary"
            dark
            >Log in</v-card
          ></v-col
        >
      </v-row>
      <v-card flat class="pa-2" v-if="register" width="100%">
        <v-card-title>
          <v-btn
            color="dark-grey"
            fab
            small
            dark
            class="mr-4"
            @click="
              register = !register
              buttonDisplay = !buttonDisplay
            "
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <div class="font-weight-bold">Register an account</div></v-card-title
        >
        <register></register>
      </v-card>
      <v-card flat class="pa-2" v-if="login" width="100%">
        <v-card-title>
          <v-btn
            color="dark-grey"
            fab
            small
            dark
            class="mr-4"
            @click="
              login = !login
              buttonDisplay = !buttonDisplay
            "
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <div class="font-weight-bold">
            Log in to your account
          </div></v-card-title
        >
        <login></login>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Register from '@/components/auth/register'
import Login from '@/components/auth/login'
export default {
  data() {
    return {
      login: false,
      register: false,
      buttonDisplay: true,
    }
  },
  components: { Login, Register },
}
</script>

<style scoped lang="scss">
.loginContainer {
  height: 90vh;
}
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
