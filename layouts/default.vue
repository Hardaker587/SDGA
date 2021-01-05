<template>
  <v-app>
    <v-main>
      <Header></Header>
      <v-container fluid>
        <nuxt />
        <alerts></alerts>
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex'
import Header from '@/components/ui/header'
import Alerts from '~/components/ui/alerts'

export default {
  components: { Alerts, Header },
  data() {
    return {
      fixed: false,
    }
  },
  async created() {
    await this.$fire.auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        this.$fire.auth.currentUser
          .getIdTokenResult()
          .then((tokenResult) => {
            if (tokenResult.claims.admin) {
              this.$router.push('/admin/questiondashboard')
              this.setAdmin(true)
            } else if (tokenResult.claims.surveyor) {
              this.$router.push('/survey')
              this.setAdmin(false)
            } else {
              this.$router.push('/')
              this.setAdmin(false)
            }
          })
          .then(console.log(this.$fire.auth.currentUser))
          .then(this.setAuth(this.$fire.auth.currentUser))
      }
    })
  },
  methods: {
    ...mapMutations({
      setAuth: 'user/SET_AUTH_USER',
      setAdmin: 'user/SET_ADMIN',
    }),
  },
}
</script>
