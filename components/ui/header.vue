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
    <v-app-bar fixed app dark>
      <v-app-bar-nav-icon
        :v-if="isAdmin"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-if="isLoggedIn">
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
          icon: 'mdi-head-question',
          title: 'Manage Questions',
          to: '/admin/questiondashboard',
        },
        {
          icon: 'mdi-test-tube',
          title: 'Experimental',
          to: '/test',
        },
      ],
      title: 'SDGA For Universities',
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
      isAdmin: 'user/isAdmin',
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
