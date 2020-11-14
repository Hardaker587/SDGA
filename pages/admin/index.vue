<template>
  <div class="row">
    <questions></questions>
  </div>
</template>
<script>
// eslint-disable-next-line
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/functions'
import Questions from '@/components/admin/Questions/Questions'
export default {
  name: 'index',
  components: { Questions },
}
</script>
