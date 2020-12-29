<template>
  <section class="container">
    Bar holder <GChart type="ColumnChart" :data="data" />
  </section>
</template>

<script>
import { GChart } from 'vue-google-charts'
export default {
  components: { GChart },
  props: {
    data: { type: [Object, Array], required: false, default: () => [] },
    horizontalKey: { type: String, default: '' },
    verticalKey: { type: String, default: '' },
    labels: { type: [Object, Array], default: () => [] },
  },
}
</script>
