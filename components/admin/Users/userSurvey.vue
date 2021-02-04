<template>
  <v-container> Responses by user </v-container>
</template>

<script>
export default {
  name: 'userSurvey',
  props: {
    user: { type: [Object, Array], required: true, default: () => [] },
    response: { type: [Object, Array], required: true, default: () => [] },
  },
}
</script>
