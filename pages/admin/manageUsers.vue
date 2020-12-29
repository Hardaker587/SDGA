<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <div>Add admin user</div>
        <add-admin />
      </v-col>
      <v-col cols="6">
        <div>Add normal user</div>
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
