<template>
  <v-app>
    <v-main>
      <Header></Header>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Header from '@/components/ui/header'
export default {
  components: { Header },
  data() {
    return {
      fixed: false,
    }
  },
}
</script>
