<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="user in users" :key="user.uid">
      <v-expansion-panel-header
        ><span class="admin" v-if="user.admin">Admin</span>
        {{ user.firstName }} {{ user.lastName }} ({{ user.email }})
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row>
          <v-col cols="12" class="d-flex">
            <v-icon class="mr-2">mdi-account</v-icon>
            Personal Details
            <v-spacer></v-spacer>
            <!--            <v-icon>mdi-pencil</v-icon>-->
          </v-col>
          <v-col cols="6"
            >First name:
            <span class="font-weight-bold">{{ user.firstName }}</span></v-col
          >
          <v-col cols="6"
            >Last name:
            <span class="font-weight-bold">{{ user.lastName }}</span></v-col
          >
          <v-col cols="6"
            >Email Address:
            <span class="font-weight-bold">{{ user.email }}</span></v-col
          >
          <v-col cols="6"
            >Date of birth:
            <span class="font-weight-bold">{{ user.dateOfBirth }}</span>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="12" class="d-flex">
            <v-icon class="mr-2">mdi-map</v-icon>
            Regional details:
          </v-col>
          <v-col cols="6"
            >City: <span class="font-weight-bold">{{ user.city }}</span></v-col
          >
          <v-col cols="6"
            >Province:
            <span class="font-weight-bold">{{ user.province }}</span></v-col
          >
          <v-col cols="6"
            >University:
            <span class="font-weight-bold">{{ user.university }}</span></v-col
          >
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: 'users',
  props: {
    users: { type: [Object, Array], required: true, default: () => [] },
  },
}
</script>
<style scoped lang="scss">
.admin {
  background: #00a826;
  color: #fff;
  font-size: 0.6rem;
  padding: 3px;
  border-radius: 8px;
  margin-right: 4px;
  max-width: 50px;
  text-align: center;
}
</style>
