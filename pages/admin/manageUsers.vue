<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div class="text-h5 font-weight-bold pb-2">Add new users to site</div>
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
  </v-container>
</template>

<script>
import AddAdmin from '~/components/admin/Users/addAdmin'
import AddUser from '~/components/admin/Users/addUser'
export default {
  name: 'manageUsers',
  components: { AddUser, AddAdmin },
}
</script>
