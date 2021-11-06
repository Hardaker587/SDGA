<template>
  <pivot :report="fetchMappedResponses" toolbar />
</template>

<script>
import { Pivot } from 'vue-webdatarocks'
import { dataMixin } from '../../../mixins/data.mixin'
export default {
  name: 'pivot-view',
  components: { Pivot },
  mixins: [dataMixin],
}
</script>
