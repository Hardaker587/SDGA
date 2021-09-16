<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :v-if="isAdmin"
      temporary
      absolute
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app flat color="white" class="px-4">
      <v-app-bar-nav-icon
        v-if="isAdmin"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-img
        :height="this.$vuetify.breakpoint.xs ? '20px' : '30px'"
        max-width="235px"
        src="/images/branding/Sustainable_Dev.svg"
        @click="isLoggedIn ? $router.push('/survey') : $router.push('/')"
      ></v-img>
      <v-spacer></v-spacer>
      <div v-if="isLoggedIn">
        <span v-if="$vuetify.breakpoint.mdAndUp"
          >Welcome back!
          <span class="font-weight-bold">{{ getUser.email }}</span></span
        >
        <v-btn class="error" @click="userLogOut">Log out</v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Header',
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/admin',
        },
        {
          icon: 'mdi-clipboard',
          title: 'Survey',
          to: '/survey',
        },
        {
          icon: 'mdi-head-question',
          title: 'Manage Questions',
          to: '/admin/manageQuestions',
        },
        {
          icon: 'mdi-poll',
          title: 'Single Question Report',
          to: '/admin/reports/byQuestion',
        },
        {
          icon: 'mdi-spider-web',
          title: 'Radar Graph Report',
          to: '/admin/reports/multipleQuestions',
        },
        {
          icon: 'mdi-compare',
          title: 'Compare questions Report',
          to: '/admin/reports/compareQuestions',
        },
        {
          icon: 'mdi-account',
          title: 'Manage Users',
          to: '/admin/manageUsers',
        },
      ],
      title: 'SDGA For Universities',
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
      isAdmin: 'user/isAdmin',
      getUser: 'user/getUser',
    }),
  },
  methods: {
    ...mapMutations({
      logOut: 'user/LOG_OUT',
    }),
    async userLogOut() {
      try {
        await this.$fire.auth.signOut()
        this.logOut()
        await this.$router.push('/')
      } catch (e) {
        alert(e)
      }
    },
  },
}
</script>
