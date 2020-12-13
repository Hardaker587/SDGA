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
import Header from '@/components/ui/header'
import Alerts from '~/components/ui/alerts'
export default {
  components: { Alerts, Header },
  data() {
    return {
      fixed: false,
    }
  },
}
</script>
