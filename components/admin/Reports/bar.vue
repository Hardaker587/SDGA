<template>
  <section class="container">Bar holder</section>
</template>

<script>
export default {
  props: {
    data: { type: [Object, Array], required: false, default: () => [] },
    horizontalKey: { type: String, default: '' },
    verticalKey: { type: String, default: '' },
    labels: { type: [Object, Array], default: () => [] },
  },
  data() {
    return {
      countries: [],
    }
  },
}
</script>
