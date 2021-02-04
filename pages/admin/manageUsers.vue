<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div class="text-h5 font-weight-bold pb-2">Manage users</div>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <div class="text-h6 font-weight-bold">Add admin user</div>
        <add-admin />
      </v-col>
      <v-col cols="6">
        <div class="text-h6 font-weight-bold">Add normal user</div>
        <add-user />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="text-h5 font-weight-bold pb-2">Users</div>

        <Users :users="getUsers" :responses="getResponses" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AddAdmin from '~/components/admin/Users/addAdmin'
import AddUser from '~/components/admin/Users/addUser'
import Users from '~/components/admin/Users/users'
export default {
  name: 'manageUsers',
  components: { Users, AddUser, AddAdmin },
  computed: {
    ...mapGetters({
      getUsers: 'user/getUsers',
      getResponses: 'survey/fetchResponsesFromDB',
    }),
  },
  mounted() {
    this.fetchUsers()
    this.fetchResponses()
  },
  methods: {
    ...mapActions({
      fetchResponses: 'survey/fetchSurveyResponses',
      fetchUsers: 'user/fetchUsers',
    }),
  },
}
</script>
